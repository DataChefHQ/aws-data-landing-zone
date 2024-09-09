# TODO

## Features


## Enhancements
1. Improve the readability of email notifications of SecurityHub. Or better yet send a daily report of all findings.
1. For Slack+Email notifications validate that one of the two is passed.
1. Create Logger and Tests. Only two levels, DEFAULT and DEBUG.Add unique Prefix to distinguish from CDK output.

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

## Tests
- VPCs
  - No overlapping VPC CIDRs
- VPC peering role
  - Only 1 gets created for the `source-destination` account ID pair:
    - Between VPCs in the same account, make sure there are 2 network connections
    - Between VPCs in different accounts,  make sure there are 2 network connections, and the role is in the destination account
- Multiple source address and multiple destination address
  - Make sure the correct number of network connections are created and only 1 role.
- VPC Peering Connection Name
  - Length is within bounds
- Bidirectional VPC Peering and Routes
