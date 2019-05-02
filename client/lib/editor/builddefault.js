// module.exports = run

var fs = require('fs')
var convert = require('./convert')
var md = require('markdown-string')

var defaultHtml = md`

# Template:

## Key questions

* What is the main question the study attempts to answer?
* What are the hypotheses?
* What techniques do the researchers adopt to test their hypotheses?
* Why is this study relevant?

## Your perspective

* General comments you might have about the research approach.
* Specific comment you might have about experimental approaches and methods used in the study.
* Specific comment/note about figures in the paper (this could be related to the way data are displayed and your ability to understand the results just by looking at the figures).
* Additional comment you might have (this includes minor concerns such as typos and structure of the manuscript).

`

var defaultDelta = JSON.stringify(convert.fromHtml(defaultHtml), null, 2)

function run () {
  fs.writeFileSync(__dirname + '/templates/default.json', defaultDelta)
}
run()