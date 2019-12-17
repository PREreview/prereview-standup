var html = require('choo/html')
var css = require('sheetify')

var container = css`
  :host {
    border-radius: 5px;
    background-color: #f7f7f7;
  }

  :host:hover {
    cursor: pointer;
  }
`

var journalTitle = css`
  :host {
    font-size: 14px;
    color: dark-grey;
  }
`

module.exports = function(state, emit) {
  const orcidPreprints = state.user.orcidPreprints
  if (!orcidPreprints || orcidPreprints.length === 0) {
    return html`
      <div class="pa3 lh-copy tc">
        <p>
          We don't know about any preprints authored by you. Let us know about
          preprints you've written by adding them to
          <a href="https://orcid.org/my-orcid" target="_blank"
            >your ORCID profile</a
          >.
        </p>
      </div>
    `
  }

  return orcidPreprints.map(p => {
    var created_date = formatDate(p.created_date)

    var preprintTemplate = html`
      <div class="flex flex-column justify-start items-start pa3 mt4 lh-copy mb2 ${container}">
        <div class="flex flex-row mb2 items-between justify-between w-100">
          <div class="flex flex-row"><span class="black f5 fw7 tl">${p.title}</span></div>
          <div class="flex flex-row nowrap">
            <div class="flex flex-row nowrap items-center">
              <div class="flex flex-row">Created on <span class="b ml2">${created_date}</span></div>
            </div>
          </div>
        </div>
        <div class="${journalTitle}">${p.journal_title}</div>
      </div>
    `

    if (p.url) {
      preprintTemplate.onclick = () => window.open(p.url, '_blank');
    }

    return preprintTemplate
  })
}


// format date from 2019-03-13T03:29:22.099Z to 2019-03-13
const formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;

  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}