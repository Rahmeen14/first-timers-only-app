const CLAIMING_COMMENTS = [
  'Can I work on this?',
  'I want to work on this.',
  'I wanna claim this!'
]

const FIRST_TIMERS_LABEL = 'first-timers-only'

/**
 *
 * @typedef {{ payload: Payload }} Context
 *
 * @typedef {object} Payload
 * @property {object} payload.issue
 * @property {array} payload.issue.labels
 * @property {object} payload.comment
 * @property {string} payload.comment.body
 *
 */

/**
 * @param {Context} context probot context
 * @returns {boolean} whether the comment is asking for claiming the issue
 */
const isCommentAskingForClaimingTheIssue = context => {
  return CLAIMING_COMMENTS.includes(context.payload.comment.body)
}

/**
 * @param {Context} context probot context
 * @returns {boolean} whether issue is a first timer's issue.
 */
const isAFirstTimersOnlyIssue = context => {
  const labelArray = context.payload.issue.labels.map(l => l.name)
  return labelArray.includes(FIRST_TIMERS_LABEL)
}

exports.isAFirstTimersOnlyIssue = isAFirstTimersOnlyIssue
exports.isCommentAskingForClaimingTheIssue = isCommentAskingForClaimingTheIssue
