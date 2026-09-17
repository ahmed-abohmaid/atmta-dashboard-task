# Implementation Phases — ATMTA Modular Admin Dashboard

Companion to `FRD.md`. Each phase is self-contained enough to pick up in one sitting. No package/library decisions are made here on purpose — those get decided at the start of Phase 1. Deadline is EOD Sat 19 Sep 2026, so phases are sized to be droppable: if time runs out, stop after completing a phase fully and note what's left, per the task's own instructions ("we'd rather see the permissions system and one module done properly").

**Priority order if time gets tight:** Phases 1–4 (auth, permission engine, nav enforcement, one full module) are the non-negotiable core the task explicitly says matters most. Phases 5–6 (second module + third module) are next. Phase 7 (advanced filters/export) and Phase 8 (polish) are the first things to trim, with the trim documented, not silently dropped.

---

### Phase 0 — Project setup & tech decisions
*Discuss at start of this phase: exact package choices (styling, state/data-fetching, forms, tables, date pickers, etc.), folder structure, and repo conventions.*
- Scaffold Next.js + TypeScript project.
- Decide and record: global/client state approach, form handling approach, mock persistence approach (in-memory vs localStorage vs JSON).
- Set up base folder structure (routes, data layer, permission engine, shared UI, types).
- Set up lint/format basics so the rest of the work is fast to review in the video.
- **Tailwind setup, with dark mode wired in from the start** (`class` strategy + a theme toggle mechanism decided now, not bolted on later) — every component built afterward should default to using theme tokens, not hardcoded colors.
- **RTL + AR strategy decided and scaffolded now, not deferred to a polish phase** (FRD §11 requires an Arabic-first UI with working RTL — this is foundational, not cosmetic):
  - Pick the i18n approach (even a lightweight dictionary/context is fine — full translation isn't required per the task, but the *mechanism* needs to exist from component #1).
  - Set `dir="rtl"` and the logical-properties/Tailwind RTL convention (e.g. `ms-`/`me-` over `ml-`/`mr-`) as the default from the first layout component, so nothing needs retrofitting.
  - Decide default locale (Arabic-first per spec) and how a component picks up its strings.
- Exit criteria for Phase 0: a blank page rendered RTL, in dark mode, with Tailwind theme tokens and the i18n mechanism all working together, before any real feature is built on top.

### Phase 1 — Domain model + mock data layer
- Define TypeScript types: User, Role, Module, Permission, Category, Vendor (per FRD §2).
- Build the mock "service layer": async functions per entity (CRUD-shaped), with artificial delay, sitting behind a clean interface the UI calls as if it were a real API.
- Seed data: modules (users, roles, categories, vendors), roles (Super Admin/Manager/Employee/Viewer), the 4 required seed users with resolvable permissions, a small category tree, a handful of vendors.
- Decide + implement persistence behavior (reset-to-seed vs survives reload) and document it.

### Phase 2 — Auth flow
- Login form → validate against mock users → establish session.
- Session persistence across refresh (per chosen storage strategy).
- Logout.
- Route protection: unauthenticated access to protected routes redirects to login.

### Phase 3 — Permission engine (the core of the whole task)
- Single reusable permission-resolution function/hook: given a user + module + action → allowed boolean, combining role permissions ∪ user grants − user revokes.
- One place this logic lives — every other phase only *calls* it, never reimplements it.
- Build the two enforcement primitives used everywhere downstream:
  - A guard for "can this route render, or should it show Forbidden" (for direct-URL access).
  - A guard/helper for "should this button/link render or be disabled" (for in-page UI).
- Build dynamic navigation: modules render in the sidebar only if the user has any permission in that module.
- This phase is done when: a module-less user sees no trace of that module in nav, and typing its URL directly shows a clear forbidden page — not a crash, not a silent redirect.

### Phase 4 — Users module (also proves out the permission model end-to-end)
- Users List Page: table (name, email, phone, roles, status), search by name/email, row → profile.
- User Profile Page: basic info, roles + resolved module/permission breakdown, vendors created by them (wire this up fully once Vendors exists — can stub the list earlier), "edit modules & permissions" entry point gated on the viewer's own manage-users permission.
- Super Admin user-creation/edit flow (multi-step): basic data → module selection → per-module permission selection. Enforce "can't grant what you don't have."
- Enforce: last Super Admin can't be deleted/demoted/deactivated. Deactivate (not delete) as a distinct action.

### Phase 5 — Roles module
- Role CRUD: create/edit roles, assign per-module permission sets (reuses the same permission-picker UI built in Phase 4 if possible — this is a good place to extract it into a shared component).
- Roles list + basic detail view.

### Phase 6 — Categories module
- CRUD with parent selection (or none = root) in the create/edit form.
- Recursive tree rendering (infinite depth).
- Delete guard: block + explain when a category has children or vendors.

### Phase 7 — Vendors module + Vendors List advanced features
- Vendor CRUD: form with category picker, logo upload, validation (cr_number 10-digit unique, mobile Saudi-format normalization).
- Soft delete.
- Vendor Details Page: data + logo, full category breadcrumb, creator/updater linked to profiles, timestamps.
- Vendors List Page: pagination, columns, and the full filter set (text, category incl. subtree, status, date range) all composed together and synced to the URL (shareable/refreshable).
- CSV export of the filtered list, gated on the Export Vendors permission specifically.

### Phase 8 — Cross-cutting states & final verification
*RTL, dark mode, and AR strings are built into every phase as it's implemented (foundation laid in Phase 0) — this phase verifies, it doesn't implement them for the first time.*
- Sweep every screen for loading / empty / validation-error / forbidden states — this was called out explicitly as a requirement, not a nice-to-have.
- Verification pass: RTL layout, dark mode, and theme tokens actually held up consistently across every module built (nav, forms, tables, breadcrumbs, modals) — fix any component that drifted from the Phase 0 foundation instead of building it fresh here.
- Responsive/edge-case pass if time allows.

### Phase 9 — Delivery
- README: run steps, seed account credentials (all 4), persistence behavior note, list of assumptions made (from FRD §13), what was cut and why if anything was.
- Record the two videos (task demo; source-code walkthrough covering the 3 required talking points from the FRD's Meta section).
- Package (Git repo link or .zip; Docker optional) and send to eslam.elsayed@atmta.sa, cc hr@atmta.vc.

---

## How to use this
Work one phase at a time. At the start of each phase, we pin down just that phase's implementation details (specific components, exact package APIs, edge cases) rather than deciding everything up front — the FRD stays the fixed target, this file stays the map.
