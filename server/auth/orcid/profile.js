var got = require('got')
var md = require('markdown-string')

module.exports = updateFromOrcid

function updateFromOrcid (user) {
  return getWorks(user).then(getPerson(user))
}

function tokentype (user) {
  var type = user.token.token_type
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function token (user) {
  return user.token.access_token
}

function addWorksToProfile (user) {
  return res => {
    var data = res.body

    if (data.group) {
      user.profile.works = {
        updated: data['last-modified-date'] ? data['last-modified-date'].value : null,
        list: data.group ? data.group.map(d => {
          return {
            updated: d['last-modified-date'].value,
            externalIds: d['external-ids'],
            workSummary: d['work-summary']
          }
        }) : []
      }
    }

    return user
  }
}

function getWorks (user) {
  var opts = {
    url: `https://pub.orcid.org/v2.1/${user.orcid}/works`,
    headers: { Authorization: `${tokentype(user)} ${token(user)}` },
    json: true
  }
  return got(opts).then(addWorksToProfile(user))
}

function addPersonToProfile (user) {
  return res => {
    var data = res.body

    if (data.biography && data.biography.content) {
      user.profile.biography = md`${data.biography.content}`
    }

    if (data.emails && data.emails.email) {
      var emails = data.emails.email.map(e => e.email)
      user.profile.emails = emails
      user.profile.pic = null
    }

    return user
  }
}

function getPerson (user) {
  var opts = {
    url: `https://pub.orcid.org/v2.1/${user.orcid}/person`,
    headers: { Authorization: `${tokentype(user)} ${token(user)}` },
    json: true
  }
  return got(opts).then(addPersonToProfile(user))
}