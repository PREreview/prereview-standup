module.exports = run

var fs = require('fs')
var convert = require('./convert')
var md = require('markdown-string')

var defaultHtml = md`

# Before you write

Please take the time to read our [community guidelines](https://prereview.org).

If this is your first time here, we recommend you look at our [guide to constructive reviewing](https://prereview.org).

# Summary

Try to summarise your review in a sigle paragraph.

# Vallidity, rigor, correctness and methodology

Some things you might consider:

- Are the claims valid?
- Are the methods appropriate and were they used correctly and documented well?
- Are the results consistent and free from artifacts that might suggest errors?

# Importance and impact

These things are silly.

`

var defaultDelta = JSON.stringify(convert.fromHtml(defaultHtml), null, 2)

function run () {
  fs.writeFileSync(__dirname + '/templates/default.json', defaultDelta)
}