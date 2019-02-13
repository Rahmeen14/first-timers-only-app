const fetch = require('node-fetch')

const CLAIMING_COMMENTS = [
  'Can I work on this?',
  'I want to work on this',
  'I wanna claim this!',
  'I wish to work on this',
  'May I claim this?',
  'Interesting! Can I work on this',
  'It would be my pleasure if I can work on this'
]

const FIRST_TIMERS_LABELS = ['first-timers-only']
/**
 * @param {string} commenterName
 * @param {string} issueLabel
 * @param {string} issueURL
 * @param {string} repoName
 * @returns {string} of the bot reply
 */
const getBotReply = (commenterName, issueLabel, issueURL, repoName) =>
  `Hi ${commenterName} 🙋‍♀️,

Thank you for your interest in the issue, however this is a ${issueLabel} issue.
Seeing how you've already been assigned to [one such issue](${issueURL}),
the maintainers of ${repoName} would like you to work on
some other issues to give fair chance to beginners to contribute.

---
I'm a bot, please leave [feedback](https://github.com/probot/first-timers-only-app/issues/new) to allow me to improve.
`
/**
 * @param {Context} context probot context
 * @returns {boolean} whether the comment is asking for claiming the issue
 */
const isCommentAskingForClaimingTheIssue = context =>
  CLAIMING_COMMENTS.map(c => c.toLowerCase()).includes(getCommentBody(context))

/**
 * @param {Context} context
 * @return {string}
 */
const getCommentBody = context => context.payload.comment.body.toLowerCase()

/**
 * @param {Context} context probot context
 * @returns {boolean} whether issue is a first timer's issue.
 */
const isAFirstTimersOnlyIssue = context => {
  const labelArray = context.payload.issue.labels.map(l => l.name)
  return labelArray.some(label => FIRST_TIMERS_LABELS.includes(label))
}

/**
 * @param {string} url
 * @param {object} [options] as accepted by `fetch`
 * @returns {Promise<object>} promise resolving into JSON object
 */
const fetchJSON = (url, options = {}) =>
  fetch(url, options).then(res => res.json())

/**
 * @param {Context} context
 * @return {string} owner name
 *
 */
const getOwner = context => context.payload.repository.owner.login

/**
 * @param {Context} context
 * @return {string} repo name
 *
 */
const getRepo = context => context.payload.repository.name

/**
 * @param {Context} context
 * @return {string} userName of the commenter
 *
 */
const getCommenter = context => context.payload.comment.user.login

/**
 * @param {Context} context
 * @return {string|number} id of the issue
 *
 */
const getIssueID = context => context.payload.issue.id

exports.FIRST_TIMERS_LABELS = FIRST_TIMERS_LABELS
exports.isAFirstTimersOnlyIssue = isAFirstTimersOnlyIssue
exports.isCommentAskingForClaimingTheIssue = isCommentAskingForClaimingTheIssue
exports.fetchJSON = fetchJSON
exports.getOwner = getOwner
exports.getCommenter = getCommenter
exports.getRepo = getRepo
exports.getBotReply = getBotReply
exports.getIssueID = getIssueID
