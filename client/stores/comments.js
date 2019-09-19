
module.exports = async (state, emitter) => {
  state.prereviews = {
    currentSubmission: null,
    inProgress: {}
  }
  
  emitter.on('DOMContentLoaded', function () {
    emitter.on('comment:submit', submit)
  })

  function submit (comment) {
    fetch('/data/comments/submit', {
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
    emitter.emit('render')
  }

  function submissionFailed (error) {
    throw error
  }
}
