const {
  isAFirstTimersOnlyIssue,
  isCommentAskingForClaimingTheIssue,
  fetchJSON,
  getOwner,
  getCommenter,
  getRepo,
  getIssueID,
  FIRST_TIMERS_LABELS
} = require('./util')

module.exports = app => {
  app.log('Yay, the app was loaded!')

  /** Whenever there's an comment on an issue of the repo where our bot is installed */
  app.on('issue_comment', async context => {
    /** Check whether the user is trying to claim the issue in the comments */
    if (isCommentAskingForClaimingTheIssue(context)) {
      context.log(context.payload.issue.labels)

      /** Check whether the issue is a first-timers-only issue */
      if (isAFirstTimersOnlyIssue(context)) {
        /**
         * Check whether the commenter has ever been assigned to
         * any other first-timers-only issue
         **/

        const owner = getOwner(context)
        const repo = getRepo(context)
        const labels = FIRST_TIMERS_LABELS.join(',')
        const issueId = getIssueID(context)
        const assignee = getCommenter(context)

        // TODO: See if context.github.* supports this API */
        /** @type {ListIssueAPIResponse} */
        const data = await fetchJSON(
          `https://api.github.com/repos/${owner}/${repo}/issues?labels=${labels}&assignee=${assignee}`
        )

        if (data.length === 0) {
          // CASE 1: if there are no issues where this commenter is assigned to, we do nothing
        } else if (data.length === 1 && issueId === data[0].id) {
          // CASE 2: if there is one issue that the commenter is assigned to and it  is same as this issue, then we do nothing
        } else {
          // CASE 3: else post a new comment
          context.log(data)
          const params = context.issue({ body: 'You cannot work on this!' })
          // Post a comment on the issue
          return context.github.issues.createComment(params)
        }
      }
    }
  })
}
