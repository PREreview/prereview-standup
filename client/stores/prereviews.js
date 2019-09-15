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
    var preprintId = `${preprint.identifierType}:${preprint.identifier}`

    state.prereviews.inProgress[preprintId] = submission
    state.prereviews.currentSubmission = submission
    emitter.emit('pushState', '/prereview-submission-check')
  }

  function confirmSubmission () {
    var submission = state.prereviews.currentSubmission
    submission.status = 'submitted'
    submit(submission)
  }

  function submit () {
    fetch('/data/prereviews/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(
      submissionSuccessful
    ).catch(
      submissionFailed
    )
  }

  function submissionSuccessful (response) {
    var submission = state.prereviews.currentSubmission
    if (submission.preprint.identifier === response.preprint_id) {
      submission.status = 'published'
    } else {
      console.log('conflicting submissions, submitted and published:', submission, response)
      throw new Error('conflicting submissions')
    }

    emitter.emit('pushState', '/prereview-published')
  }

  function submissionFailed (error) {
    throw error
  }
}
