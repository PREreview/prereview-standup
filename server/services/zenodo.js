const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs');

const ENV = process.env.ENVIRONMENT || "dev";

// Test account tokens - These have been created only for testing
// Feel free to create your own at sandbox.zenodo.org and zenodo.org
// dev: 'JQeLsGAvpkCc70Du6W2LYuZKp4WK1RYvq5huzpDi8uXp6T16nBM0tBTc7nUE',
// prod: 'RsHOiW6HZbDzYYfKsRB7nSu79DvRJ5zUmuP3QWsmalrLXOWCzXCn4FC0FV7E',

const ACCESS_TOKEN = {
  dev: 'NYh4NaZUOuhtpLUnDogyVtyDARQpXzTzVyQKCATKlgpmCOV6FF6CPYKrSdWT',
  prod: 'grObDyR4ckMSSvs8RatGAsy7F46vWtJr1pYZbk11E7yGaI94iB9hMjXzMcAf',
}[ENV];

const BASE_URL = {
  dev: 'https://sandbox.zenodo.org',
  prod: 'https://zenodo.org'
}[ENV];

const zenodoBaseUrl = (action = '') =>
  `${BASE_URL}/api/deposit/depositions${action}?access_token=${ACCESS_TOKEN}`

const zenodoPayload = (body = {}, headers = {}) => ({
  method: 'POST', body, headers: { 'content-type': 'application/json', ...headers }
})

const generateDOI = async prereviewData => {
  // Review deposition data
  const data = {
    metadata: {
      upload_type: 'publication',
      publication_type: 'article',
      title: prereviewData.title,
      description: prereviewData.content,
      creators: [{
        name: prereviewData.authorName,
        orcid: prereviewData.authorOrcid
      }]
    }
  }

  // Create a deposition
  const depositionUrl = zenodoBaseUrl()
  const depositionPayload = zenodoPayload(JSON.stringify(data))
  const depositionRes = await fetch(depositionUrl, depositionPayload)
  const depositionData = await depositionRes.json()

  // Check if we have a valid deposition id
  if (!depositionData.id) {
    console.error(depositionData);
    throw new Error("Missing Zenodo deposition id")
    return;
  }

  // Review deposition file
  const formData = new FormData();
  const fileName = prereviewData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const buffer = Buffer.from(prereviewData.content, 'utf8');
  formData.append('file', buffer, {
    contentType: 'text/html',
    name: 'file',
    filename: `${fileName}_${Date.now()}.html`,
  });

  // Upload the deposition file
  const uploadAction = `/${depositionData.id}/files`
  const uploadUrl = zenodoBaseUrl(uploadAction)
  const uploadPayload = zenodoPayload(formData, formData.getHeaders())
  const uploadRes = await fetch(uploadUrl, uploadPayload)
  const uploadData = await uploadRes.json();

  // Publish the deposition
  const publishAction = `/${depositionData.id}/actions/publish`
  const publishUrl = zenodoBaseUrl(publishAction)
  const publishPayload = zenodoPayload()
  const publishRes = await fetch(publishUrl, publishPayload)
  const publishData = await publishRes.json()

  // Check if we have a valid DOI
  if (!publishData.doi) {
    throw new Error("Missing DOI in publish data")
    return;
  }

  // Success
  console.log(`
    [ZENODO] Deposition published successfully!
    > Deposition: ${BASE_URL}/deposit/${depositionData.id}
    > Record: ${BASE_URL}/record/${publishData.doi.split("zenodo.")[1]}
  `)

  return publishData.doi
}
// Testing:
// generateDOI({ title: "test", authorName: "Daniel", authorOrcid: "0000-0001-9596-7596", content: "<h1>test</h1>" })

module.exports = { generateDOI }
