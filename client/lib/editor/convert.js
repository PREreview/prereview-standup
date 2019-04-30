const {
  convertHtmlToDelta,
  convertTextToDelta,
  convertDeltaToHtml
} = require('node-quill-converter')

module.exports = {
  fromHtml: htmlString => convertHtmlToDelta(htmlString),
  fromText: textString => convertTextToDelta(textString),
  toHTML: delta => convertDeltaToHtml(delta)
}
