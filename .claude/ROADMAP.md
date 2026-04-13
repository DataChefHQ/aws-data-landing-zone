# Product Roadmap — Shaped Work Cycles

This document contains time-bound planning for upcoming DLZ feature cycles. Durable architectural patterns extracted from this planning are captured in [CLAUDE.md](CLAUDE.md).

When a cycle completes, archive its content and extract any new patterns into the governance document.

---

## Cycle 1: Enterprise Security Baseline

**Status:** In progress — 2 of 7 items complete (GuardDuty, CDK+Node.js upgrade). Remaining items (Macie, per-account SCPs, ClickOps, DNS, OIDC expansion) have not started implementation.

### Problem

DLZ covers the basics well: accounts, networking, IAM, SCPs, budgets. But in an enterprise environment with hundreds of accounts across multiple regions, several gaps become blockers.

**No GuardDuty or Macie.** Threat detection and sensitive data discovery are expected in any enterprise security review. Without them, the security team will push back before anything else gets evaluated.

**SCPs are global-only.** Organizations run dev and prod accounts at different maturity levels. They need stricter controls on production without restricting development. A single global SCP list can't do this.

**No DNS management.** Multi-region, cross-account deployments need private DNS resolution. Without it, every deployment requires manual Route53 setup outside DLZ, which breaks the automation promise.

**No GitHub OIDC.** Self-service deployments need CI/CD without long-lived credentials. OIDC is the standard pattern, and enterprise clients expect it to work out of the box.

**No ClickOps detection.** If someone makes a console change across hundreds of accounts, DLZ can't surface it. Guardrails-as-code lose their meaning when manual changes go unnoticed.

**CDK pinned at 2.133.0, Node.js at end-of-life runtime.** Both show up as findings in security reviews and make the dependency posture look neglected.

These are the gaps between a landing zone that demos well and one that holds up in a real enterprise deployment.

### Appetite

Originally scoped as 3 weeks, single engineer, AI-assisted. The first 2 items (GuardDuty, CDK upgrade) are complete. The remaining 5 items may require extending the timeline or descoping some items to a later cycle.

Shaped cycle, not open-ended exploration. Every item here is a known AWS pattern with existing CDK constructs.

### Solution

#### Track 1: security baseline (week 1)

GuardDuty ([#118](https://github.com/DataChefHQ/aws-data-landing-zone/issues/118)) — **DONE**

- Enable at the organization level
- Delegate administrator to the security/audit account
- Aggregate findings into Security Hub (already supported)
- Configure per-account-type enablement (ties into Track 2)
- Route notifications through existing DLZ channels (Slack/Teams/email)

Macie ([#117](https://github.com/DataChefHQ/aws-data-landing-zone/issues/117))

- Same organizational pattern as GuardDuty: org enable, delegate admin
- Auto-discovery of S3 buckets with sensitive data classification
- Findings go to Security Hub for a unified view
- See CLAUDE.md "AWS organization-level security services pattern" for the implementation pattern

CDK + Node.js upgrade ([#123](https://github.com/DataChefHQ/aws-data-landing-zone/issues/123), [#124](https://github.com/DataChefHQ/aws-data-landing-zone/issues/124), [#125](https://github.com/DataChefHQ/aws-data-landing-zone/issues/125)) — **DONE**

- Bump aws-cdk-lib to current supported version
- Upgrade Lambda runtimes to Node.js 22
- Fix breaking changes, update snapshots
- Run the full test suite, validate in test environment

#### Track 2: governance granularity (week 2)

Per-account SCPs ([#68](https://github.com/DataChefHQ/aws-data-landing-zone/issues/68))

- Extend the configuration API to accept SCPs on individual `DLzAccount` entries
- Global SCPs define the mandatory baseline; per-account SCPs are additive only (cannot weaken global policies)
- Include `denyExpensiveActions` as a built-in SCP preset option ([#62](https://github.com/DataChefHQ/aws-data-landing-zone/issues/62))
- See CLAUDE.md "SCP governance model" for the architectural pattern

ClickOps Notifier ([#119](https://github.com/DataChefHQ/aws-data-landing-zone/issues/119))

- CloudTrail management events → EventBridge rule → SNS/Lambda
- Detect console-origin API calls (check `userAgent` for `console.amazonaws.com`)
- Filter out read-only actions to reduce noise
- Route notifications through existing DLZ notification config
- Detection and notification only, no remediation
- See CLAUDE.md "ClickOps detection pattern" for the architectural pattern

#### Track 3: networking and CI/CD (week 3)

DNS support ([#115](https://github.com/DataChefHQ/aws-data-landing-zone/issues/115))

- Route53 private hosted zones per account
- Cross-account DNS resolution via hosted zone associations
- VPC integration with existing DLZ networking constructs
- Private DNS only (see No-gos)

GitHub OIDC ([#116](https://github.com/DataChefHQ/aws-data-landing-zone/issues/116))

- IAM OIDC identity provider per workload account
- IAM role with trust policy scoped to specific repos/branches
- Role ARN exposed via SSM parameter for pipeline consumption
- One OIDC provider per account, multiple role mappings

### Rabbit holes

**DNS complexity.** Route53 has public hosted zones, complex routing policies (weighted, latency, geolocation, failover), health checks, DNSSEC, and cross-account delegation for public domains. None of that is in scope here. We're solving private DNS resolution between VPCs across accounts, the common multi-account pattern for internal service communication. Public DNS is a separate problem for a separate cycle.

**GuardDuty/Macie configuration depth.** Both services have large configuration surfaces: custom threat lists, suppression rules, automated response playbooks, classification jobs with custom identifiers. We enable org-wide with sensible defaults and route findings to Security Hub. Tuning beyond that is per-deployment work, not product scope.

**SCP inheritance.** AWS SCP inheritance across nested OUs is tricky to get right. We scope this to DLZ's existing OU structure (flat), with per-account SCP configuration rather than per-OU nesting. If someone needs deeply nested OU hierarchies with layered SCP inheritance, that's a different conversation.

**ClickOps noise.** Console activity across hundreds of accounts produces a lot of events. The notifier needs good default filters (exclude read-only calls, exclude console logins) or it turns into alert fatigue. Time should go into the filter list, not into building an event processing pipeline.

### No-gos

- Public DNS management. Different lifecycle, different risk profile.
- GuardDuty/Macie auto-remediation. This cycle is detection and notification only. Auto-remediation (quarantine an instance, revoke credentials) is a separate product decision.
- OU restructuring. We work with DLZ's existing OU model.
- Compliance framework mapping. Connecting GuardDuty/Macie findings to specific standards (SOC 2, ISO, GDPR) is outside DLZ's scope.
- Dashboard or UI. DLZ is an IaC construct. Visualization belongs in a separate layer.
- Build-time SCP validation ([#20](https://github.com/DataChefHQ/aws-data-landing-zone/issues/20)). Useful, but it involves CDK synthesis interception and deserves its own cycle.

---

## Cycle 2: Scale Infrastructure

### Problem

After cycle 1, DLZ will have GuardDuty, Macie, scoped SCPs, DNS, OIDC, and up-to-date dependencies. But two things prevent that from working at scale.

**Accounts are created manually.** DLZ configures accounts after they exist, but creating them (or adopting existing ones) is a manual SOP. For an organization onboarding dozens or hundreds of accounts, this is the bottleneck. Every new account needs someone to follow a checklist, then wire it into the DLZ config, then deploy. The value of automated guardrails drops when the account creation step that precedes them is manual and error-prone.

**Logs are scattered.** Cycle 1 adds GuardDuty and Macie, which produce findings. Security Hub aggregates those findings. But the raw logs (CloudTrail events, VPC Flow Logs, DNS query logs) still live in each individual account. When someone needs to investigate an incident, they have to hop between accounts to piece together what happened. The security features from cycle 1 generate signals. Without centralized logging, acting on those signals is slow and fragmented.

**No cost data foundation.** DLZ has budget alerts, but there's no access to the underlying cost data in a queryable form. AWS Cost and Usage Reports (CUR) are the raw data source for any FinOps capability: dashboards, chargeback models, anomaly detection, optimization recommendations. Without CUR enabled and delivered to a central location, none of that is possible. DLZ enforces tagging and sets budgets, but the data those tags generate has nowhere to go.

### Appetite

The account factory has a well-defined boundary: it sits in the Global wave, creates or adopts accounts, and hands off to existing DLZ stacks for configuration. Centralized logging follows established AWS patterns (CloudTrail organization trail, VPC Flow Logs to central S3, cross-account CloudWatch). CUR enablement is a small addition that follows the same central-S3 pattern as logging. None of these require new product design. All three are implementation of known patterns within DLZ's existing deployment model.

### Solution

#### Track 1: account factory construct (weeks 1-2)

The construct handles two paths: creating new accounts and adopting existing ones.

**Create path**

- New account definition in DLZ config: name, email, type (dev/prod), OU, regions
- AWS Organizations `CreateAccount` API call via custom resource
- Poll for completion (account creation is async)
- Bootstrap the account for CDK deployment
- Hand off to existing DLZ regional waves for VPC, SCPs, GuardDuty, Macie, OIDC, DNS, budgets
- See CLAUDE.md "Account lifecycle pattern" for the architectural pattern

**Adopt path**

- Existing account referenced by ID in DLZ config
- Move account to correct OU if needed
- Bootstrap for CDK if not already done
- Same handoff to regional waves

**Placement in DLZ**

- Runs in the Global wave, before any regional stacks
- Account type from the config drives which SCPs, GuardDuty settings, and budget thresholds get applied downstream
- Outputs account ID and bootstrap status via SSM parameters

**Rate limiting and quotas**

- AWS has a default limit of 10 account creations per organization (can be increased via support ticket)
- `CreateAccount` is rate-limited to 5 concurrent requests
- The construct should batch and throttle, not fire all at once
- For large-scale adoption (100+ existing accounts), the adopt path should support bulk import from a list of account IDs

#### Track 2: centralized logging (weeks 2-3)

See CLAUDE.md "Centralized logging pattern" for the architectural pattern.

**Organization CloudTrail**

- Create an organization-level trail in the management account
- Store logs in a central S3 bucket in the log archive account
- Enable log file validation and encryption (KMS)
- This replaces the need for per-account CloudTrail setup

**VPC Flow Logs**

- Enable flow logs on all DLZ-managed VPCs
- Deliver to the central S3 bucket in log archive account
- Use Parquet format for cost-effective querying with Athena
- Partition by account, region, and date

**DNS query logging**

- Enable Route53 Resolver query logging on DLZ-managed VPCs
- Deliver to central S3 in log archive account
- Pairs with the DNS support added in cycle 1

**Cross-account CloudWatch**

- Set up CloudWatch cross-account observability from the management or audit account
- Sharing configuration deployed to each DLZ-managed account
- Allows centralized metric and log queries without switching accounts

**Retention and lifecycle**

- S3 lifecycle policies on the central bucket: Standard for 90 days, Glacier after 90, delete after 365 (configurable in DLZ config)
- CloudWatch log group retention aligned with the same policy

#### Track 3: CUR enablement (week 3)

**Cost and Usage Reports**

- Enable CUR 2.0 (the current AWS version) in the management account
- Deliver reports to a central S3 bucket in the log archive or a dedicated FinOps account (configurable)
- Parquet format for efficient querying
- Hourly granularity with resource-level detail

**Athena integration**

- Create a Glue database and crawler for the CUR data
- Pre-built Athena table definition so cost data is queryable immediately after the first report lands
- Partition by billing period

**What this enables downstream**

- AWS CUDOS dashboards (QuickSight) can point directly at the Athena table
- Third-party FinOps tools (Vantage, Kubecost, custom dashboards) consume the same CUR data from S3
- Chargeback models can be built on top of the tag dimensions DLZ already enforces
- Cost anomaly detection services (AWS Cost Anomaly Detection) can be enabled separately and will use the same underlying data

DLZ's role stops at making the data available. What gets built on top of it (dashboards, chargeback logic, optimization recommendations) is either a separate product or an engagement-specific deliverable.

### Rabbit holes

**Account email management.** Every AWS account needs a unique root email. For organizations creating many accounts, this usually means email aliases (user+account1@company.com). DLZ should accept the email in config but should not try to manage email infrastructure, validate deliverability, or set up root account MFA. Those are operational concerns outside the construct's boundary.

**Account closure and suspension.** The factory creates and adopts accounts. It does not close or suspend them. Account decommissioning has legal, data retention, and billing implications that vary by organization. That's a different feature with its own design work.

**CloudTrail Lake vs. S3.** AWS offers CloudTrail Lake as a managed query layer over CloudTrail data. It's convenient but expensive at scale. The default should be S3 with Athena for querying. CloudTrail Lake can be a future configuration option.

**Log volume at scale.** VPC Flow Logs and DNS query logs across hundreds of accounts produce a lot of data. The Parquet format and date-based partitioning help, but cost estimation for S3 storage and Athena queries should be called out in docs, not solved in the construct.

**Existing CloudTrail trails.** Most accounts already have a default CloudTrail trail. The organization trail replaces the need for per-account trails, but DLZ should not delete existing trails automatically. It should document that per-account trails can be removed after the org trail is verified.

**CUR report delay.** AWS delivers the first CUR report within 24 hours of enablement, then updates it throughout the billing period. The Athena table will be empty until that first delivery. This is normal AWS behavior, not something the construct should try to work around.

**CUR 1.0 vs 2.0.** AWS still supports the legacy CUR format but recommends CUR 2.0. We use 2.0 only. If an organization already has CUR 1.0 enabled, the construct creates a new 2.0 export alongside it. It does not migrate or delete the existing one.

### No-gos

- Account closure, suspension, or decommissioning. Create and adopt only.
- Root account MFA setup or email verification. Operational, not IaC.
- CloudTrail Lake integration. S3 + Athena is the default. Lake can come later.
- Log alerting or anomaly detection on centralized logs. That's an observability product concern, not a logging infrastructure concern.
- SIEM integration. The construct delivers logs to S3. Forwarding to Splunk, Datadog, or a SIEM is deployment-specific.
- Custom CloudWatch dashboards. The construct sets up cross-account access. What people put on dashboards is their business.
- FinOps dashboards, chargeback models, or optimization recommendations. DLZ delivers the raw CUR data. Visualization and business logic belong in a separate product or engagement-specific work.
- AWS Cost Anomaly Detection configuration. It's a one-click enable in the console and doesn't need IaC management. Docs can mention it as a recommended next step.

---

## Cycle 3: Proactive Governance

### Problem

After cycles 1 and 2, DLZ will create accounts, apply scoped SCPs, enable GuardDuty/Macie, set up networking with DNS, configure OIDC, and centralize logs. The enforcement model works, but it only catches problems at deploy time or after the fact.

**SCP errors surface too late.** A malformed SCP or a policy conflict only shows up when the CDK deploy hits AWS. In a pipeline, that means a failed deployment, a rollback, and someone debugging the SCP against the AWS API error. For an organization with per-account SCPs (added in cycle 1), the number of policy combinations grows. Catching mistakes during `cdk synth`, before anything touches AWS, saves time and prevents broken rollouts.

**Data workloads have no specific controls.** DLZ's current SCPs, Config Rules, and Security Hub standards are general-purpose. Organizations running data pipelines, AI/ML workloads, or analytics platforms need controls tuned to those services: S3 bucket policies, Glue job configurations, SageMaker notebook restrictions, Redshift cluster settings. Without data-specific controls, DLZ covers the platform but leaves a gap in the workload layer it was originally designed to support.

**Test coverage has holes.** The IAM account alias custom-resource Lambda has no unit tests ([#126](https://github.com/DataChefHQ/aws-data-landing-zone/issues/126)). As DLZ grows in scope (cycles 1 and 2 add several new constructs), untested components become riskier. This cycle is a good time to close that gap before the surface area grows further.

### Appetite

2 weeks, single engineer, AI-assisted.

This cycle is smaller than the previous two. Build-time SCP validation is a focused piece of CDK synthesis work. Data-oriented controls are additive (new rules in existing patterns). Unit tests are bounded by the Lambda code that exists today.

### Solution

#### Track 1: build-time SCP validation ([#20](https://github.com/DataChefHQ/aws-data-landing-zone/issues/20))

**What it does**

- During `cdk synth`, validate all SCPs before they become CloudFormation resources
- Catch common errors: invalid JSON, unknown actions, conflicting deny/allow across global and per-account-type SCPs, exceeding the 5120 character SCP size limit

**How it works**

- CDK Aspects or a custom validation step that runs during synthesis
- Reads the SCP definitions from DLZ config
- Validates syntax against the IAM policy grammar
- Checks for conflicts between global SCPs and per-account SCPs (e.g., a global allow that a per-account deny contradicts, or vice versa)
- Checks total SCP size per target (AWS enforces a 5 SCP limit per target, each max 5120 characters)
- Fails `cdk synth` with a clear error message pointing to the problem

**What it does not do**

- It does not simulate SCP evaluation logic (what happens when a request hits multiple SCPs). That's AWS's job at runtime.
- It does not validate IAM policies, only SCPs. IAM policy validation is a separate concern.

#### Track 2: data-oriented security controls ([#28](https://github.com/DataChefHQ/aws-data-landing-zone/issues/28))

See CLAUDE.md "Data-oriented security controls" for the architectural pattern.

**SCPs for data services**

- Deny public S3 bucket creation (if not already covered by defaults)
- Deny unencrypted S3 buckets
- Deny Glue jobs without encryption at rest
- Deny SageMaker notebooks with direct internet access
- Deny Redshift clusters without encryption
- Deny EMR clusters without in-transit encryption

**Config Rules for data workloads**

- S3 bucket versioning enabled
- S3 bucket logging enabled
- S3 bucket replication configured (for production account types)
- Glue job bookmark configuration present
- Redshift cluster audit logging enabled
- SageMaker endpoint KMS encryption

**Security Hub standards**

- Enable the AWS Foundational Security Best Practices checks for S3, Glue, SageMaker, Redshift, EMR, Athena
- These checks are part of Security Hub but not all are enabled by default

**Configuration**

- Data controls are opt-in per account in DLZ config
- An account with `data: true` (or similar flag) on its `DLzAccount` entry gets these controls applied
- Accounts without the flag are unaffected

#### Track 3: test coverage ([#126](https://github.com/DataChefHQ/aws-data-landing-zone/issues/126))

- Unit tests for the IAM account alias custom-resource Lambda
- Cover the create, update, and delete handler paths
- Mock the AWS SDK calls (IAM CreateAccountAlias, DeleteAccountAlias)
- Test error handling: alias already exists, alias too long, API failure
- Add to the existing test suite and CI pipeline

### Rabbit holes

**SCP conflict detection depth.** SCPs interact in non-obvious ways when applied across nested OUs. Full conflict detection (will this request be denied or allowed given all SCPs in the path?) is an IAM Access Analyzer problem, not something to reimplement in a synth-time check. Stick to syntactic validation and size/count limits. Flag obvious contradictions (same action in both allow and deny for the same target), but don't try to model the full evaluation chain.

**Data control completeness.** AWS has dozens of data services. Trying to write controls for all of them in one cycle leads to a sprawling, half-tested ruleset. Pick the six services most commonly used in data landing zones (S3, Glue, SageMaker, Redshift, EMR, Athena) and do them well. Others can be added incrementally.

**Config Rule cost.** Each AWS Config Rule has a per-evaluation cost. Enabling many rules across many accounts adds up. The docs should note the cost implications. The construct should not try to optimize this (e.g., by batching evaluations).

### No-gos

- IAM policy validation. Only SCPs are in scope for build-time checks.
- SCP evaluation simulation. Synth-time checks are structural, not behavioral.
- Controls for non-data services. This cycle is specifically for data workload controls. General-purpose controls already exist.
- Custom Config Rules. We use AWS managed rules only. Custom rules require Lambda functions with their own maintenance burden.
- Auto-remediation for Config Rule violations. Detection only. Remediation is a separate product decision (deferred to a future RFC).
