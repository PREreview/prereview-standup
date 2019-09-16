module.exports = preprintToPdfUrl

var prefixmap = {
  '10.1101': async preprint => {
    var pubdate = new Date(Date.parse(preprint.date_published))
    var pubyear = pubdate.getFullYear()
    var pubmonth = ("0" + (pubdate.getMonth() + 1)).slice(-2)
    var pubday = ("0" + pubdate.getDate()).slice(-2)
    var doipart = preprint.identifier.split('/')[1]
    var site = preprint.publisher.toLowerCase()
    return `https://www.${site}.org/content/${site}/early/${pubyear}/${pubmonth}/${pubday}/${doipart}.full-text.pdf`
  },
  '10.12688': crossrefPdfLinkUrl,
  '10.20944': async preprint => {
    var doipart = preprint.identifier.split('/preprints')[1].replace('.v', '/v')
    return `https://www.preprints.org/manuscript/${doipart}/download`
  },
  '10.26434': crossrefFirstLinkUrl,
  '10.7287': async preprint => {
    var peerjid = preprint.identifier.split('/')[1].split('.')[2]
    return `https://peerj.com/preprints/${peerjid}.pdf`
  }
}

async function preprintToPdfUrl (preprint) {
  if (preprint.identifiertype === 'doi') {
    var doi = preprint.identifier
    var pdffn = doiToPdfMap(doi)
    return await pdffn(preprint)
  } else if (preprint.identifiertype === 'arxiv') {
    return `https://arxiv.org/pdf/${preprint.identifier}`
  }
}

async function crossrefFirstLinkUrl (preprint) {
  var cr = await crossrefData(preprint.identifier)
  return cr.link[0].URL
}

async function crossrefPdfLinkUrl (preprint) {
  var cr = await crossrefData(preprint.identifier)
  return cr.link.find(l => l['content-type'] === 'application/pdf').URL
}

function crossrefData (doi) {
  return fetch(`https://api.crossref.org/works/${doi}`, {
    mode: 'cors'
  }).then(
    res => res.json()
  ).then(
    data => {
      console.log(data)
      return data.message
    }
  ).catch(
    err => {
      console.log('error retrieving crossref data')
      console.error(err)
    }
  )
}

function doiToPdfMap (doi) {
  var parts = doi.split('/')
  var pdffn = prefixmap[parts[0]]
  
  if (typeof pdffn === 'function') return pdffn

  subpref = parts[1].split('.')[0]
  return pdffn[subpref]
}
