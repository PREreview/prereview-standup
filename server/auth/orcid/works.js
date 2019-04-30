var got = require('got')

module.exports = getWorks

function tokentype (profile) {
  var type = profile.token.token_type
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function token (profile) {
  return profile.token.access_token
}

function addToProfile (profile) {
  return res => {
    var data = res.body

    if (data.group) {
      profile.works = {
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
  return got(opts).then(addToProfile(profile))
}
