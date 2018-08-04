/* globals describe, it, expect */
const {
  isCommentAskingForClaimingTheIssue,
  isAFirstTimersOnlyIssue
} = require('../util')

describe('isCommentAskingForClaimingTheIssue()', () => {
  it('returns true for "Can I work on this?"', () => {
    const result = isCommentAskingForClaimingTheIssue(
      createCommentBody('Can I work on this?')
    )

    expect(result).toBe(true)
  })

  it('returns false for "LGTM"', () => {
    const result = isCommentAskingForClaimingTheIssue(createCommentBody('LGTM'))

    expect(result).toBe(false)
  })
})

describe('isAFirstTimersOnlyIssue()', () => {
  it('returns true for "first-timers-only"', () => {
    // what is the doubt?
    const result = isAFirstTimersOnlyIssue(
      createIssueLabel('first-timers-only')
    )

    expect(result).toBe(true)
  })
})

/**
 * Creates the context object based on the body passed
 * @param {string} body of the comment
 * @returns {Context} object with comment of same body
 */
const createCommentBody = body => ({
  payload: {
    comment: {
      body: body
    }
  }
})

/**
 * Creates the context object based on the issue label passed
 * @param {string} name of issue label
 * @returns {Context} object with comment of same body
 */
const createIssueLabel = name => ({
  payload: {
    issue: {
      labels: [
        {
          name
        }
      ]
    }
  }
})
