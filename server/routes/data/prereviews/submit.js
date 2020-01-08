var prereviews = require('../../../db/tables/prereviews')
var convertDelta = require('../../../../client/lib/editor/convert')
const fetch = require('node-fetch')

var express = require('express')
var router = express.Router()

const ACCESS_TOKEN =
  'JQeLsGAvpkCc70Du6W2LYuZKp4WK1RYvq5huzpDi8uXp6T16nBM0tBTc7nUE'

const zenodoBaseUrl = (action = '') =>
  `https://sandbox.zenodo.org/api/deposit/depositions${action}?access_token=${ACCESS_TOKEN}`;

const zenodoOptions = (data = {}) => ({
  method: 'POST',
  body: data,
  headers: { 'Content-Type': 'application/json' }
})

const generateDOI = async prereview => {

  const data = {
    metadata: {
      upload_type: "publication",
      publication_type: "other",
      title: 'My first upload',
      description: 'This is my first upload',
      creators: [{
        'name': 'Doe, John',
        'affiliation': 'Zenodo'
      }]
    }
  };

  // Create a deposition
  const depositionRes = await fetch(zenodoBaseUrl(), zenodoOptions(data));
  const depositionData = await depositionRes.json();

  console.log("dap", depositionData);

  // Publish the deposition
  const action = `/${depositionData.id}actions/publish`;
  const publishRes = await fetch(zenodoBaseUrl(action), zenodoOptions());
  const publishData = await publishRes.json();

  console.log("nop", publishData);


  return '0000-0002-0900-3713'
}

// Submits a new PREreview
router.post('/submit', async function (req, res, next) {
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  if (req.user.id !== req.body.author.id) {
    // user must be logged in as the same one claiming to author the PREreview
    return res.status(401, 'You cannot post a PREreview as another user')
  }

  // if (!isdoi({ exact: true }).test(prereview.preprint_doi)) {
  //   // preprint doi must be valid
  //   return res.status(500, 'preprint DOI is not valid')
  // }

  var prereview = {
    preprint_id: req.body.preprint.id,
    author_id: req.body.author.user_id,
    content: convertDelta.toHTML(req.body.prereview).replace('<p><br></p>', '')
  }

  try {
    prereview.doi = await generateDOI(prereview)

    // await prereviews.addPrereview(prereview)

    return next()
  } catch (e) {
    console.error('Error trying to create PREreview with data:', JSON.stringify(prereview))
    console.error(e)
    return res.status(500, 'Something went wrong trying to publish this PREreview')
  }
})

module.exports = router