# first-timers-only-app

## Statement:

A bot that ensures exactly one newcomer issue is assigned per person so that it’s fair for all newcomers. Additionally, it encourages the no-more-newcomers to take up challenging issues once they’re comfortable with the workflow after having tackled a newcomer issue.

## How it works:

1. Whenever a user comments on any issue, it will be detected using “issue_comment” event.
2. The label of the issue is returned in the payload response of the said event.
3. We will create a configurable JSON file containing an array of labels( For e.g. `first-timers-only`, `new-comers-issue`) used for tagging newcomer issues.
4. If the issue label matches any of the array entries , then further action will be taken.
5. The comment is tested against a [set of strings](https://github.com/probot/first-timers-only-app/blob/master/util.js). More strings can be suggested to improve the performance [here](https://github.com/probot/first-timers-only-app/issues/19).
6. If a match is found, then using the user details from payload returned on the issue_comment event, we’ll search all the issues of the [repository](https://developer.github.com/v3/issues/#list-issues-for-a-repository), for the detected label to check if the commenter is assigned one.
7. In case a match is found, we will create a comment to inform the user that they cannot claim more than one new-comers issue.

## Future Scope
Using fuzzy logic in natural language processing on some standard phrases we will detect if the commenter is trying to claim the issue. We might use the npm module nlp-toolkit for the same.

## Have a look!
![Our working bot](Snapshots/readmeSS.png)
