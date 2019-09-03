
var passport = require('passport')
var users = require('../../db/tables/users')
var OrcidStrategy = require('passport-orcid').Strategy
var updateFromOrcid = require('./profile')

// these are needed for storing the user in the session
passport.serializeUser(function (user, done) {
  done(null, user.orcid)
})

passport.deserializeUser(function (orcid, done) {
  users.getUser({ orcid }).then(user => done(null, user)).catch(done)
})

// add the ORCID authentication strategy
passport.use(new OrcidStrategy({
  sandbox: false, // remove this to use the production API
  state: true, // remove this if not using sessions
  clientID: process.env.ORCID_CLIENT_ID,
  clientSecret: process.env.ORCID_CLIENT_SECRET,
  callbackURL: `${process.env.APP_ROOT_URI}/orcid-callback`
}, function (accessToken, refreshToken, params, profile, done) {
  // `profile` is empty as ORCID has no generic profile URL,
  // so populate the profile object from the params instead
  profile = {
    orcid: params.orcid,
    name: params.name,
    token: {
      access_token: params.access_token || accessToken,
      token_type: params.token_type,
      expires_in: params.expires_in
    },
    profile: {}
  }
  
  // now we get the list of works for the user from the ORCID api
  // and add it to their profile data
  updateFromOrcid(profile).then(enrichedProfile => {
    return users.getOrAddUser(enrichedProfile).then(userdata => {
      done(null, enrichedProfile)
    })
  }).catch(done)
}))

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // register auth routes
  var routes = [
    'login',
    'orcid-callback',
    'logout',
  ]

  app.use('/', routes.map(route => require(`./routes/${route}`)))

  return passport
}

