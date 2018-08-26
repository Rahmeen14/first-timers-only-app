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
  it('returns true for "I want to work on this"', () => {
    const result = isCommentAskingForClaimingTheIssue(
      createCommentBody('I want to work on this')
    )
    expect(result).toBe(true)
  })
  it('returns true for "I wish to work on this"', () => {
    const result = isCommentAskingForClaimingTheIssue(
      createCommentBody('I wish to work on this')
    )
    expect(result).toBe(true)
  })

  it('returns true for "I wanna claim this!"', () => {
    const result = isCommentAskingForClaimingTheIssue(
      createCommentBody('I wanna claim this!')
    )

    expect(result).toBe(true)
  })

  it('returns false for "LGTM"', () => {
    const result = isCommentAskingForClaimingTheIssue(createCommentBody('LGTM'))

    expect(result).toBe(false)
  })

  it('returns false for "Nice suggestion"', () => {
    const result = isCommentAskingForClaimingTheIssue(createCommentBody('Nice suggestion'))

    expect(result).toBe(false)
  })

  it('returns false for "You can work on this"', () => {
    const result = isCommentAskingForClaimingTheIssue(createCommentBody('You can work on this'))

    expect(result).toBe(false)
  })

  it('returns false for "Can you please edit this?"', () => {
    const result = isCommentAskingForClaimingTheIssue(createCommentBody('Can you please edit this?'))

    expect(result).toBe(false)
  })
})

describe('isAFirstTimersOnlyIssue()', () => {
  it('returns true for "first-timers-only"', () => {
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
