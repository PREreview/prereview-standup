// finish authenticating with ORCID
module.exports = (app, passport) => app.get('/orcid-callback', passport.authenticate('orcid', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))