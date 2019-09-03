var got = require('got')
var md = require('markdown-string')

module.exports = updateFromOrcid

function updateFromOrcid (profile) {
  return getWorks(profile).then(getPerson(profile))
}

function tokentype (profile) {
  var type = profile.token.token_type
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function token (profile) {
  return profile.token.access_token
}

function addWorksToProfile (profile) {
  return res => {
    var data = res.body

    if (data.group) {
      profile.profile.works = {
        updated: data['last-modified-date'].value,
        list: data.group.map(d => {
          return {
            updated: d['last-modified-date'].value,
            externalIds: d['external-ids'],
            workSummary: d['work-summary']
          }
        })
      }
    }

    return profile
  }
}

function getWorks (profile) {
  var opts = {
    url: `https://pub.orcid.org/v2.1/${profile.orcid}/works`,
    headers: { Authorization: `${tokentype(profile)} ${token(profile)}` },
    json: true
  }
  return got(opts).then(addWorksToProfile(profile))
}

function addPersonToProfile (profile) {
  return res => {
    var data = res.body

    if (data.biography && data.biography.content) {
      profile.profile.biography = md`${data.biography.content}`
    }

    if (data.emails && data.emails.email) {
      profile.profile.emails = data.emails.email
    }

    return profile
  }
}

function getPerson (profile) {
  var opts = {
    url: `https://pub.orcid.org/v2.1/${profile.orcid}/person`,
    headers: { Authorization: `${tokentype(profile)} ${token(profile)}` },
    json: true
  }
  return got(opts).then(addPersonToProfile(profile))
}
