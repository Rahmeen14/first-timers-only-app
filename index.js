const {
  isAFirstTimersOnlyIssue,
  isCommentAskingForClaimingTheIssue
} = require('./util')

module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('issue_comment', async context => {
    if (isCommentAskingForClaimingTheIssue(context)) {
      context.log(context.payload.issue.labels)

      if (isAFirstTimersOnlyIssue(context)) {
        context.log(context.payload.comment.body)
      }
    }
  })
}
