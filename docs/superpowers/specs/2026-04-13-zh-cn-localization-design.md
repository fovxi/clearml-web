# zh-CN Frontend Localization Design for v2.4.0

## Goal

Ship `v2.4.0` as a Chinese-only frontend build for Simplified Chinese users (`zh-CN`).

The target outcome is that frontend-owned UI copy across the application is shown in Simplified Chinese, while preserving existing product behavior and avoiding unrelated refactors.

## Current State

The current frontend is not fully internationalized.

- The Angular workspace exposes an `extract-i18n` target in `angular.json`.
- The application does not currently use a complete i18n implementation for runtime or build-time translations.
- There are no existing translation catalogs in the repository.
- The UI contains extensive hardcoded English strings in templates, shared components, menus, dialogs, tooltips, and TypeScript label mappings.

This means the fastest and lowest-risk path for `v2.4.0` is not to introduce a full i18n system, but to convert the frontend-owned copy directly to Simplified Chinese and align locale-sensitive formatting where needed.

## Scope

The localization pass covers frontend-owned user-visible text across the full frontend, including:

- navigation and global layout
- login and signup flows
- dashboard
- projects
- experiments
- models
- pipelines
- datasets
- reports
- workers and queues
- serving and endpoints
- settings and admin pages
- enterprise and visibility pages included in this build
- shared dialogs, menus, tooltips, empty states, onboarding surfaces, validation messages, and reusable controls
- frontend-defined enum, status, and label mappings

## Out of Scope

The following content should remain unchanged unless the frontend already owns an explicit mapping for it:

- user-generated content such as names, descriptions, comments, and report content
- raw backend-returned free text
- logs, stack traces, and command output
- code snippets and technical payloads shown verbatim
- unrelated cleanup or architectural refactors

## Chosen Approach

### Recommended approach

Use a direct `zh-CN` source rewrite for frontend-owned copy.

This means:

- replace hardcoded English UI copy with Simplified Chinese in place
- update shared constants and label mappers where text is defined in TypeScript
- add only the minimal locale plumbing required for correct formatting and document metadata

### Why this approach

This approach is the best fit for the release requirement:

- the release target is Chinese-only, not multilingual
- it avoids introducing a new translation framework and the migration overhead that comes with it
- it minimizes moving parts and release risk
- it keeps the implementation aligned with the codebase as it exists today

### Rejected alternatives

#### Angular built-in i18n

Angular built-in i18n would be a reasonable foundation for future multilingual support, but it adds extraction, markup, translation catalog, and locale build complexity that is unnecessary for a Chinese-only release.

#### Runtime translation library

A runtime library such as `ngx-translate` would add dictionary management and runtime indirection primarily for language switching, which is not part of the `v2.4.0` goal.

## Implementation Design

### 1. Locale baseline

Establish a consistent `zh-CN` baseline where the frontend controls locale-sensitive behavior.

Work includes:

- set the document language to `zh-CN`
- ensure Angular locale-sensitive formatting uses the expected locale where applicable
- replace explicit English locale imports, such as `date-fns` English locale usage, with `zh-CN` equivalents where user-facing values are formatted

### 2. Shared UI first

Translate the highest-reuse surfaces before feature-specific pages.

Priority targets:

- global header
- side navigation
- shared dialogs
- shared empty states
- reusable form labels and validation messages
- shared menus and table/filter controls

This reduces duplicate work and lowers the chance of mixed-language pages later in the rollout.

### 3. Feature-by-feature conversion

Translate feature modules in place after the shared layer is stable.

Suggested execution order:

1. login and signup
2. dashboard
3. projects
4. experiments
5. models
6. pipelines
7. datasets
8. reports
9. workers and queues
10. serving and endpoints
11. settings and admin
12. enterprise and visibility pages present in the build

For each area, update:

- templates
- component strings and tooltips
- shared menu models used by the feature
- constants and label mappers in TypeScript
- empty states and validation copy

### 4. Final audit and polish

After translation is in place:

- search for leftover English UI strings in `.html` and `.ts`
- verify key routes visually
- fix text wrapping, overflow, truncation, or spacing problems caused by Chinese labels
- correct any locale formatting that still renders in English

## Boundaries

The implementation should follow these rules:

- translate frontend-owned UI strings only
- preserve raw data, user content, and backend free text unless a frontend-owned mapping exists
- avoid introducing a language switcher
- avoid building a general-purpose localization platform in this release
- avoid opportunistic refactors outside the localization work

## Risks

### Mixed-language UI

Some strings are likely defined outside obvious templates, especially in TypeScript constants, menu models, tooltips, and reusable components.

### Incomplete locale formatting

Dates, times, and related formatting may still appear in English if `LOCALE_ID` usage and explicit locale imports are not aligned.

### Layout regressions

Chinese labels can cause wrapping, clipping, or cramped layouts in buttons, tabs, menus, and table headers.

### Hidden low-traffic surfaces

Dialogs, contextual menus, onboarding panels, and less-used pages are easy to miss in a broad text conversion pass.

## Mitigations

- start with shared components and layout surfaces
- use grep-driven audits across both templates and TypeScript
- search for common English UI vocabulary after the initial pass
- perform browser-based verification on representative user journeys
- limit fixes to issues directly caused by the localization work

## Verification Criteria

The work is complete only when all of the following are true:

- the main application builds successfully
- primary navigation and major feature routes present Chinese UI copy where the frontend owns the text
- shared menus, dialogs, empty states, and validation messages are shown in Chinese
- locale-sensitive formatting controlled by the frontend uses `zh-CN`
- no obvious English UI leftovers remain on the main user journeys, excluding backend raw text and user-generated content

## Deliverables

The localization implementation for `v2.4.0` should produce:

- a Chinese-only frontend for `zh-CN`
- consistent Chinese copy across the full frontend surface owned by the repository
- minimal locale configuration changes required for formatting correctness
- no new language-switching or general translation management framework

## Non-Goals

This release does not aim to:

- support multiple frontend languages
- preserve English as a selectable option
- translate arbitrary backend data at runtime
- redesign product terminology beyond what is needed for correct Simplified Chinese UI copy

