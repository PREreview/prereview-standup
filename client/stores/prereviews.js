
module.exports = async (state, emitter) => {
  state.prereviews = {
    currentSubmission: null,
    inProgress: {}
  }
  
  emitter.on('DOMContentLoaded', function () {
    emitter.on('prereview:start-submission', startSubmission)
    emitter.on('prereview:confirm-submission', confirmSubmission)
  })

  function startSubmission (submission) {
    var preprint = submission.preprint
    var preprintId = `${preprint.identifier_type}:${preprint.identifier}`

    state.prereviews.inProgress[preprintId] = submission
    state.prereviews.currentSubmission = submission
    submission.author = state.user
    emitter.emit('pushState', '/prereview-submission-check')
  }

  function confirmSubmission () {
    var submission = state.prereviews.currentSubmission
    submission.status = 'submitted'
    submit(submission)
  }

  function submit (submission) {
    fetch('/data/prereviews/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    }).then(
      res => res.json()
    ).then(
      submissionSuccessful
    ).catch(
      submissionFailed
    )
  }

  function submissionSuccessful (response) {
    console.log('prereview submission successful \\o/')
    var submission = state.prereviews.currentSubmission
    submission.status = 'published'
    emitter.emit('user:update-me')
    emitter.emit('pushState', '/prereview-published')
  }

  function submissionFailed (error) {
    throw error
  }
}
