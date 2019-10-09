module.exports = fixPublisher

function fixPublisher (preprint) {
  var iscshl = preprint.id.startsWith('doi/10.1101')
  if (!iscshl) return Promise.resolve(preprint)

  if (iscshl && preprint.publisher) {
    preprint.publisher = 'biorXiv'
  }
  return Promise.resolve(preprint)
}
