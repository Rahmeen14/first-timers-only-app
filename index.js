module.exports = app => {
  app.log('Yay, the app was loaded!')
  app.on('issue_comment', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}

    const comparisonString = 'Can I work on this?'
    const label = 'first-timers-only'
    let check = false
    const labelArray = context.payload.issue.labels

    if (context.payload.comment.body === comparisonString) {
      labelArray.forEach(function (elem) {
        if (elem.name === label) {
          check = true
        }
      })
      if (check) context.log(context.payload.comment.body)
    }
  })
}
