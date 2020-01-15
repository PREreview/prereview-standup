module.exports = {
  addDOItoHead: (DOI) => {
    let meta = document.getElementById('plauditDOI')

    if (!meta) {
      meta = document.createElement('meta')
      meta.id = 'plauditDOI'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }

    meta.name = 'DC.Identifier'
    meta.content = DOI
  }
}
