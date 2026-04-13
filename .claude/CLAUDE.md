## Purpose

This repository provides a landing-zone capability for AWS data platforms.

The goal is to deliver an opinionated, enterprise-ready foundation for data and AI workloads without collapsing all concerns into one permanently coupled implementation.

This document defines how contributors should think about:
- architecture boundaries
- code quality
- testing
- extensibility
- deployment safety
- long-term maintainability

It is intentionally stricter than a normal contributor guide. When making changes, optimize for clarity of boundaries and ease of future decomposition.

---

## Core architectural stance

We assume this project may continue to evolve as a single deployable product for some time.

However, we do **not** treat that as permission to mix concerns freely.

We design as though the system will eventually separate into clearer layers, even if those layers are not yet separate packages or repositories.

### Boundary rule

Use this decision rule for every new capability:

- **If it would still exist without the data platform, it belongs in the foundation layer**
- **If it exists only because we run a shared data platform, it belongs in the data platform overlay**
- **If it is only needed by one team, domain, or product, it belongs in the workload layer**

If a change does not clearly fit one of those layers, stop and redesign the abstraction before adding more logic.

---

## Target conceptual layers

### 1. Foundation / governance layer

This layer represents the shared AWS estate baseline.

Examples:
- account structure and organizational primitives
- guardrails
- security baselines
- logging and audit baselines
- identity and access baseline patterns
- network primitives shared across the estate
- deployment orchestration primitives that are generic and not data-platform-specific

This layer should remain usable even if the data platform overlay did not exist.

### 2. Data platform overlay

This layer contains shared capabilities that exist specifically because we operate a data platform.

Examples:
- shared data platform accounts and roles
- lakehouse or analytics platform infrastructure
- data ingress/egress controls specific to platform operation
- data platform networking overlays
- platform-wide integrations needed only for data and AI use cases

This layer may depend on foundation primitives, but should not redefine them.

### 3. Workload / domain layer

This layer is for team-specific or product-specific implementation.

Examples:
- domain-specific accounts or account customizations
- team-specific pipelines
- workload-specific IAM roles
- product-specific services, exceptions, and integrations

This layer should be thin. It should compose existing primitives rather than reimplement shared policy or platform behavior.

---

## What we optimize for

When making decisions, prefer the option that improves the following:

1. **Separation of concerns**
2. **Predictable deployments**
3. **Safe upgrades**
4. **Fast feedback in tests**
5. **Small, composable abstractions**
6. **Clear ownership boundaries**
7. **Ability to split later without a rewrite**

Do not optimize for short-term convenience if it deepens coupling across layers.

---

## Non-goals

The following are explicitly out of scope unless the repository direction changes deliberately:

- becoming a monolithic platform control plane for every AWS concern
- embedding team-specific business logic in shared foundation code
- introducing bespoke abstractions where CDK, AWS-native services, or configuration-driven composition are sufficient
- hiding important deployment ordering or side effects behind “magic”
- solving governance, orchestration, and data-platform behavior in the same class unless there is no practical alternative
- public DNS management (different lifecycle and risk profile from private DNS resolution)
- auto-remediation of security findings (detection and notification only; remediation is a separate product decision)
- account closure, suspension, or decommissioning (out of scope; the planned account factory will support create and adopt only)
- SIEM integration or custom log forwarding (when centralized logging is implemented, DLZ will deliver logs to S3; downstream consumption is deployment-specific)
- FinOps dashboards, chargeback models, or optimization recommendations (when CUR is implemented, DLZ will deliver raw cost data; visualization belongs in a separate layer)
- behavioral SCP evaluation simulation at build time (structural validation of syntax and limits is planned; simulating AWS runtime SCP evaluation is not)

---

## Repository design principles

### Prefer module boundaries over giant constructs

Avoid “god constructs” that:
- own governance
- create accounts
- sequence all deployment waves
- configure platform services
- inject workload behavior
- expose dozens of cross-cutting flags

Instead:
- isolate domain logic into focused modules
- expose narrow interfaces
- compose at the edges

### Keep constructs honest

A construct should have one clear responsibility.

Good examples:
- manages a network primitive
- configures a shared bucket policy model
- creates baseline IAM roles for a defined concern
- synthesizes a specific deployment wave from validated input

Bad examples:
- “platform manager”
- “organization engine”
- “global config processor”
- anything that both interprets policy and also provisions a broad mix of unrelated infrastructure

### Configuration should declare intent, not encode program flow

Configuration is for desired state.

Do not push hidden control flow, branching, sequencing, or imperative orchestration into configuration formats.

If a config shape requires readers to understand execution order to use it safely, the abstraction is too implicit.

---

## Package and folder guidance

### Current structure

The repository is organized as follows:

- `src/constructs/` — reusable CDK constructs with narrow responsibilities (e.g., `dlz-guardduty/`, `dlz-vpc/`, `organization-policies/`, `iam/`)
- `src/stacks/organization/` — CDK stacks organized by organizational structure:
  - `root/management/` — management account stacks (foundation layer)
  - `security/audit/` — audit account stacks (foundation layer)
  - `security/log/` — log account stacks (foundation layer)
  - `workloads/` — workload account stacks, organized by deployment phase (base, network-connections-phase-1/2/3, data-services-phase-1)
- `src/lib/` — shared utilities (reporting, logging)
- `src/scripts/` — CLI scripts for deployment, diff, synth, bootstrap
- `test/` — test files (unit, snapshot, contract)

### Conceptual layer mapping

The target conceptual layers (foundation, platform, workload) map to the current structure as follows:

- **Foundation layer**: `src/stacks/organization/root/` + `src/stacks/organization/security/` + most constructs in `src/constructs/`
- **Platform layer**: `src/stacks/organization/workloads/data-services-phase-1/` + `src/constructs/dlz-lake-formation/`
- **Workload layer**: `src/stacks/organization/workloads/base/` + network-connections phases

### Future direction

As the project grows, code may migrate toward a more explicit layer-based layout (e.g., `foundation/`, `platform/`, `workloads/` as top-level source directories). For now, use the conceptual layer mapping above when deciding where new code belongs.

---

## Dependency rules

These rules are mandatory.

### Allowed direction

- `foundation` must not depend on `platform` or `workloads`
- `platform` may depend on `foundation`
- `workloads` may depend on `foundation` and `platform`
- `deployment` may depend on typed interfaces from other layers, but should avoid embedding business logic from them
- `validation` should be as pure and dependency-light as possible

### Forbidden direction

- no circular dependencies
- no workload-specific imports inside foundation modules
- no platform-specific behavior hardcoded in generic deployment primitives
- no runtime reach-through where one layer mutates internal state of another layer

### Rule of thumb

If removing the data platform would break the module, it is not foundation code.

---

## Code style expectations

### General

- Prefer clear, boring code over clever code
- Prefer explicit names over abbreviations
- Keep functions and methods small
- Make side effects obvious
- Avoid hidden mutation
- Fail early with useful error messages
- Use types to narrow invalid states before synthesis or deployment

### TypeScript

- Use strict typing
- Avoid `any`
- Prefer discriminated unions and typed interfaces over loose objects
- Keep public interfaces intentionally small
- Export the minimum necessary surface area
- Do not leak internal implementation types unless they are part of the supported API

### CDK-specific

- Keep constructs deterministic
- Avoid context-dependent behavior unless clearly documented
- Minimize custom resources; use them only when AWS-native or CDK-native options do not exist
- Isolate custom-resource logic from business logic
- Do not bury security-sensitive behavior inside helper utilities
- Prefer composition of constructs over inheritance-heavy hierarchies

### Configuration and defaults

- Every default should be explicit and documented
- Defaults should be safe, conservative, and production-aware
- Avoid defaults that silently create expensive or hard-to-reverse infrastructure
- If a default has security, cost, or operational impact, document it next to the type and in user-facing docs

---

## Testing standards

Testing is not optional.

Every meaningful change should improve one or more of:
- correctness confidence
- regression detection
- upgrade safety
- refactorability

### Test pyramid

#### 1. Unit tests
Required for:
- config validation
- synthesis planning
- naming and mapping logic
- boundary rules
- policy generation
- helper utilities
- custom-resource handlers

These tests should be fast and isolated.

#### 2. Snapshot / synthesis tests
Use for:
- CloudFormation template shape
- IAM policy documents
- resource counts
- expected stack boundaries
- deployment-wave planning

Snapshots must be reviewed carefully. Do not approve snapshot churn blindly.

#### 3. Contract tests
Use where a module guarantees a stable interface to another layer.

Examples:
- foundation module output consumed by platform overlay
- config schema compatibility across versions
- deployment planner consuming validated layer definitions

#### 4. Integration tests
Use selectively for:
- multi-stack interactions
- deployment ordering assumptions
- custom-resource behavior
- generated infrastructure contracts that cannot be validated well in unit tests

Keep integration coverage focused and valuable.

---

## What to test for every PR

At minimum, contributors should think through:

- Did this change alter the public config shape?
- Did this change alter synthesized resources?
- Did this change increase cross-layer coupling?
- Did this change increase deployment blast radius?
- Did this change introduce a hidden dependency on deployment ordering?
- Did this change preserve upgrade behavior from previous versions?

If the answer to any of these is yes, add or update tests.

---

## Extensibility rules

Extensibility matters, but not all extensibility is good.

### Good extensibility

- narrow extension points
- typed hooks
- explicit interfaces
- composition over override
- adding new modules without editing unrelated modules
- feature flags that are localized and temporary

### Bad extensibility

- global escape hatches
- untyped callback bags
- “misc options” objects
- boolean explosions
- inheritance trees to support one-off behavior
- extension points that allow skipping validation or safety controls

### Preferred model

Design extension points at the layer boundaries.

Examples:
- foundation emits typed outputs
- platform consumes those outputs through stable interfaces
- workloads compose the resulting modules without mutating shared internals

---

## Deployment and orchestration guidance

Deployment logic is architecture.

Treat long deployment times and broad deployment waves as signals worth investigating, not merely operational trivia.

### Rules

- Keep deployment units as small as is practical
- Separate deployment sequencing logic from resource intent where possible
- Avoid rebuilding or redeploying unrelated concerns together
- Make wave boundaries explicit in code and tests
- Track which changes require global coordination versus regional or workload-only rollout

### CI/CD integration

- Prefer OIDC federation over long-lived credentials for all CI/CD integrations
- Currently: GitHub OIDC is configured in the management account only, for DLZ deployment
- Planned (see ROADMAP.md Cycle 1): per-workload-account OIDC providers, role trust policy scoped to specific repos/branches, role ARN exposed via SSM parameter
- OIDC provider is a foundation-layer concern (it exists without the data platform)

### Design smell indicators

Investigate refactoring when:
- unrelated changes trigger the same deployment path
- a small feature change requires touching multiple layers
- tests need large fixture setups to validate simple behavior
- synthesis or deployment time grows faster than system size
- teams need internal knowledge of multiple layers to make a local change

---

## Upgradeability and compatibility

We expect this codebase to evolve.

That means upgrades must be treated as a first-class engineering concern.

### Requirements

- preserve backward compatibility where practical
- version config intentionally
- provide migration notes for breaking changes
- isolate deprecated behavior behind clear boundaries
- add regression tests before large upgrades
- test library and runtime upgrades independently from feature changes when possible

### Upgrade workflow

For major upgrades:
1. add characterization tests for current behavior
2. upgrade one dependency group at a time
3. validate synthesis diffs
4. validate custom-resource behavior
5. document known behavior changes
6. remove temporary compatibility code only after adoption is proven

Do not combine infrastructure behavior changes and dependency upgrades in the same PR unless there is a strong reason.

---

## Security and governance expectations

This project touches foundational AWS infrastructure. Security decisions must be explicit.

### Mandatory principles

- least privilege by default
- secure-by-default configuration
- encryption defaults where applicable
- auditability of privileged actions
- no implicit privilege escalation between layers
- avoid custom IAM wildcards unless justified and documented

### Review expectations

Any PR affecting:
- IAM
- KMS
- Organizations
- Control Tower interactions
- networking
- logging
- cross-account roles
- custom resources

must include a short review note explaining:
- what changed
- why it is safe
- blast radius
- rollback considerations

---

## AWS organization-level security services — reference pattern (from GuardDuty)

The following pattern was extracted from the GuardDuty implementation. When adding the next org-level security service, use the GuardDuty constructs in `src/constructs/dlz-guardduty/` as the reference template.

### Delegated administrator pattern

- **Management account**: only delegates admin, does not run the service itself. Use a custom resource to call the delegation API (e.g., `EnableOrganizationAdminAccount`). Keep the management account minimal.
- **Audit account**: acts as the delegated administrator. Creates the service detector/hub and manages organization-wide configuration. This is where findings aggregate and notifications route from.
- **Deployment ordering**: management stack (wave 1) delegates before audit stack (wave 2) creates the detector. The existing pipeline wave ordering guarantees this.

### Feature configuration hierarchy

Organization-level services should follow a two-tier configuration model:

1. **Org baseline** (`DataLandingZoneProps`): sets the mandatory floor for all accounts. Configured via optional props on the top-level config (e.g., `guardDuty?: DlzGuardDutyProps`).
2. **Per-account additive overrides** (`DLzAccount`): individual accounts can enable additional features on top of the org baseline, but cannot disable org-level features. Merge logic is always OR: `enabled = orgBaseline || accountOverride`.

This eliminates precedence conflicts between org-level auto-enable and per-account settings.

### Defaults

- All optional features default to `false` (disabled). Users opt in explicitly.
- Auto-enable for member accounts defaults to `'NONE'`. Users choose `'ALL'` or `'NEW'` explicitly.
- The `Defaults` class provides a static method returning the default feature set (e.g., `Defaults.guardDutyFeatures()`), and `PropsOrDefaults` resolves user config vs defaults.

### Custom resources

Use custom resources only when no native CloudFormation resource exists (e.g., `EnableOrganizationAdminAccount`, `UpdateMemberDetectors`). Follow the established pattern:

- Construct: `CustomResourceProvider.getOrCreateProvider()` with `NODEJS_22_X`
- Lambda handler: in `src/constructs/<service>/lambda/<handler>/index.ts`
- `fetchCodeDirectory()`: use `fs.existsSync` fallback to `assets/` for test compatibility (jsii compiles to `lib/`, but tests run from `src/` via ts-jest)
- Make operations idempotent (check current state before mutating)
- On delete: only reverse the specific action, do not disable shared service access

### Construct organization

- Types in `src/constructs/<service>/<service>-types.ts`, separate from `data-landing-zone-types.ts`
- Shared utilities (feature mapping, merge logic) live in the types file, not duplicated across constructs
- Barrel export via `src/constructs/<service>/index.ts`
- Bundle entry in `.projenrc.ts` for each Lambda handler

### Notification routing

Security service findings flow through existing DLZ notification channels automatically:
- Service findings → Security Hub → EventBridge rule (`aws.securityhub` source) → SNS → Slack/Email
- No additional notification plumbing needed per service — configure `securityHubNotifications` to filter by severity/workflow status

### Adding new org-level services

Each new org-level security service (Macie, Inspector, etc.) should reuse the same pattern:

- Reuse the delegated-admin custom resource pattern, construct organization (`src/constructs/<service>/`), and feature-configuration hierarchy
- Do not invent new patterns — compose from the existing GuardDuty construct template
- All org-level services route findings through Security Hub → EventBridge → SNS. No per-service notification plumbing.

---

## Documentation expectations

Every meaningful architectural change should leave the codebase easier to understand.

### Required when relevant

Update documentation for:
- new extension points
- new config fields
- changed defaults
- changed deployment boundaries
- changed ownership assumptions
- breaking changes
- new operational runbooks

### ADRs

Create an Architecture Decision Record when:
- introducing a new cross-cutting abstraction
- changing layer boundaries
- adding a new deployment orchestration model
- introducing a custom resource for a foundational capability
- making a decision specifically to defer separation for now

ADRs should explain both:
- why the decision was taken
- what signals would trigger revisiting it later

---

## PR review checklist

Before merging, reviewers should ask:

### Boundary clarity
- Does this belong in foundation, platform, or workload?
- Is that boundary obvious from the code?

### Coupling
- Did this increase coupling across governance, deployment, and platform logic?
- Could this change be moved into a narrower module?

### Blast radius
- What deploys because of this?
- Is the blast radius proportional to the change?

### Test quality
- Are there fast tests?
- Are critical synthesis or contract assumptions covered?

### Extensibility
- Does this create a clean extension point or a future maintenance trap?

### Operations
- Will this make deployments, upgrades, or troubleshooting harder?

If the answer is “harder,” the PR should explain why that trade-off is worth it.

---

## Practical decision guide

When under time pressure:

### Accept now
- small, well-contained changes
- local improvements with clear ownership
- tactical additions that preserve layer boundaries
- limited compatibility shims with an exit plan

### Defer or redesign
- broad abstractions with unclear ownership
- shortcuts that mix foundation and data-platform logic
- config additions that encode orchestration complexity
- new global flags to support one-off behavior
- changes that make future decomposition materially harder

---

## What “good” looks like

A healthy contribution usually has these traits:

- one clear responsibility
- explicit layer placement
- typed inputs and outputs
- fast unit tests
- stable synth behavior
- low blast radius
- easy rollback
- clear docs
- obvious future extraction path

---

## What “bad” looks like

Reject or redesign changes that look like:

- “just add it to the main construct”
- layer-violating imports because it is “more convenient”
- hidden orchestration in config parsing
- custom resources doing too much
- helpers that mix validation, defaulting, synthesis, and deployment concerns
- feature work bundled with upgrades and refactors
- PRs that change critical infrastructure behavior without tests

---

## Roadmap context

For current implementation priorities and cycle planning, see `.claude/ROADMAP.md`.

That document contains time-bound planning details (problem statements, appetite, scope boundaries) for upcoming work, including design specs for planned features. Only patterns extracted from **implemented** features are captured in this governance document (currently: the org-level security services pattern from GuardDuty).

When a cycle completes and a feature ships, extract any durable architectural patterns into the relevant sections above. Do not extract patterns for features that have not been implemented yet.
