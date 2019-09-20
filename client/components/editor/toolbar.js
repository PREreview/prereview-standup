var html = require('choo/html')
var css = require('sheetify')

module.exports = toolbar

//       <select class="ql-header"></select>

var btnstyle = css`

:host > button:hover {
  color: white !important;
}

`

function toolbar (morebuttons) {
  return html`
    <div id="toolbar">
      <span>
        <select class="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option selected></option>
        </select>
        <button type="button" class="ql-bold"></button>
        <button type="button" class="ql-italic"></button>
      </span>
      <span class="ql-formats">
        <button type="button" class="ql-indent" value="-1"></button>
        <button type="button" class="ql-indent" value="+1"></button>
        <select class="ql-align">
          <option selected="selected"></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button type="button" class="ql-direction" value="rtl"></button>
        <button type="button" class="ql-list" value="ordered"></button>
        <button type="button" class="ql-list" value="bullet"></button>
      </span>
      <span class="ql-formats">
        <button type="button" class="ql-image"></button>
        <button type="button" class="ql-code-block"></button>
        <button type="button" class="ql-script" value="sub"></button>
        <button type="button" class="ql-script" value="super"></button>
        <button type="button" class="ql-clean"></button>
      </span>
      <span class="bn f5 white outline-0 pa0 pointer br2 b f6 noselect bg-dark-gray white ma0 ${btnstyle}" style="float: right;">
        ${morebuttons}
      </span>
    </div>
  `
}