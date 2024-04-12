# TODO

## Features


## Enhancements
1. Improve the readability of email notifications of SecurityHub. Or better yet send a daily report of all findings.
1. For Slack+Email notifications validate that one of the two is passed.

## Chores
1. Move all the types in `data-landing-zone.ts` somewhere else, maybe consider breaking it down into smaller files.
2. Consistent naming. Some constructs/classes/interfaces start with `Dlz` or filenames with `dlz-` and some don't.
The initial reasoning was to not clash with existing constructs that have that name, like `Stack` is from the CDK lib
so to avoid another `Stack` we used `DlzStack`. Things prefixed with DLZ should only stay internal, or that was the 
thought, I think.
3. If the same slack channel is used in different parts of the construct, like for alerting on budgets and for 
SecurityHub findings, then it will reuse the same slack channel if previously defined. At the moment all slack 
bots have the same permissions and that is deny all. If we change this, then we need to emit a warning if the slack
channel is already defined and the permissions are different.
4. Put SOPs in directories or somehow contain their images close to them, also name images properly.