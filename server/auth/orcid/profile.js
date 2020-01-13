var got = require('got')
var md = require('markdown-string')

module.exports = updateFromOrcid

async function updateFromOrcid (user) {
  const works = await fetchWorksFromOrcid(user)
  const personData = await fetchPersonFromOrcid(user)
  const { emails, biography } = personData

  Object.assign(user.profile, {
    works,
    emails,
    biography,
    isReceivingEmails: true,
    isEmailPrivate: true
  })

  return user
}

function tokenType (user) {
  const type = user.token.token_type
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function token (user) {
  return user.token.access_token
}

async function fetchWorksFromOrcid (user) {
  const opts = {
    url: `https://pub.orcid.org/v2.1/${user.orcid}/works`,
    headers: { Authorization: `${tokenType(user)} ${token(user)}` },
    json: true
  }

  const res = await got(opts)

  const data = res.body

  if (data.group) {
    return {
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

  return {}
}

async function fetchPersonFromOrcid (user) {
  const parsedData = {}
  const opts = {
    url: `https://pub.orcid.org/v2.1/${user.orcid}/person`,
    headers: { Authorization: `${tokenType(user)} ${token(user)}` },
    json: true
  }

  const res = await got(opts)
  const data = res.body

  if (data.biography && data.biography.content) {
    Object.assign(parsedData, {
      biography: md`${data.biography.content}`
    })
  }

  if (data.emails && data.emails.email) {
    const emails = data.emails.email.map(e => e.email)
    const [emailAddress] = emails
    Object.assign(parsedData, { email: { address: emailAddress, verified: true } })
  }

  return parsedData
}
