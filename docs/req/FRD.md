# FRD — ATMTA Modular Admin Dashboard (Frontend Technical Task)

Status: source of truth for scope. Every checkbox here maps to a line in the original task PDF. Nothing here is optional unless explicitly marked "assumption" — if unclear, note the assumption and move on (per task rules), don't skip it.

## 0. Meta
- Issued: 17 Sep 2026 · Deadline: EOD Sat 19 Sep 2026
- Submit to: eslam.elsayed@atmta.sa, cc hr@atmta.vc
- Deliverables:
  - [ ] Source code (Git repo link or .zip)
  - [ ] Steps to run the project
  - [ ] Video demo of task output
  - [ ] Video walking through source code, covering:
    - [ ] Modules & permissions model design (types, state, relations)
    - [ ] Where permission checks happen in the UI (pages, nav, actions)
    - [ ] One technical decision made + alternative rejected + why
- Tech stack: Next.js (TypeScript) + React. Styling/state library — free choice. No backend; data layer fully mocked.

## 1. Goal
Small **Modular Admin Dashboard**, frontend-only, demonstrating: Next.js dev, component/state architecture, auth + multi-level roles/permissions, a data-driven modules system, CRUD on mocked data, filtering + URL state + relational data.

## 2. Data Model (entities to define)
- **User**: name, email, password, photo (upload or URL), phone, status (active/inactive), roles[], extra permission grants/revokes on top of role.
- **Role**: name (e.g. Super Admin, Manager, Employee, Viewer), set of module permissions.
- **Module**: id/key, label, declared actions (create, read, update, delete + ≥1 custom action, e.g. `vendors.export`). Modules are **data, not hardcoded** — adding one must not require touching the permission engine or nav code.
- **Permission**: (module, action) grant, resolvable per user from role(s) ∪ user-level grants − user-level revokes.
- **Category**: name_ar, name_en, parent (nullable, infinite depth).
- **Vendor**: name_ar, name_en, about (text), logo (uploaded photo), cr_number, mobile, category (ref), status (active/inactive), createdBy, updatedBy, createdAt, updatedAt, deletedAt (soft delete).

## 3. Auth & Session
- [x] Login / logout against mock data (no real backend, no real hashing).
- [x] Session survives a page refresh (persisted client-side).
- [x] Protected routes redirect to login when there's no session.
- [ ] User deactivation supported without deleting the record (active/inactive state toggle).

## 4. Modules System
- [x] Modules defined as data (config/seed), consumed generically by nav + permission engine.
- [x] Each module declares its supported actions (CRUD minimum + ≥1 custom action).
- [x] Adding a new module = adding data only, no changes to permission logic or navigation rendering code.
- [ ] Modules directory & management page (`/modules`): UI to view registered modules, their declared actions, and demonstrate dynamic addition of new modules without touching code.

## 5. Roles & Permissions
- [x] Permission check logic lives in **one place** (single hook/util/guard `usePermission` / CASL) and is reused everywhere — never re-implemented ad hoc per component.
- [x] Navigation filtering: a module the user lacks must not appear in navigation at all.
- [x] Route-level protection: `ModuleRouteGuard` rendering explicit `ForbiddenState` on direct URL access.
- [x] In-page element gating: `PermissionGate` (hiding or rendering disabled with tooltip).
- [ ] Role CRUD (create/edit/list roles: Super Admin, Manager, Employee, Viewer as examples, not a fixed list) on `/roles` with dynamic permission matrix.
- [ ] Per-module permissions, minimum set: Manage Users (CRUD), Manage Roles (CRUD), Manage Categories (CRUD), Manage Vendors (CRUD), Export Vendors.
- [ ] A user can hold ≥1 roles, plus permissions granted/revoked directly on the user, layered on top of role permissions.
- [ ] **Super Admin user-creation flow** (must be implemented as a guided flow, not just a form):
  1. Fill basic user data.
  2. Select modules this user can access.
  3. Per selected module, choose specific permissions (CRUD + custom actions) — two users can have the same module with different permission sets.
  4. Super Admin can edit a user's modules/permissions later from the same flow.
- [ ] **Hard rules (must hold, testable):**
  - [x] Permissions enforced across the *whole* UI: buttons/links hidden or disabled without access; direct URL access to a forbidden page shows a clear forbidden state (not a silent redirect or crash).
  - [x] A module the user lacks must not appear in navigation at all, and all its routes must be closed to that user.
  - [ ] A user cannot grant a permission they don't themselves hold.
  - [ ] The last remaining Super Admin cannot be deleted, demoted, or deactivated.

## 6. Categories Module
- [ ] Entity fields: name_ar, name_en, parent (nullable).
- [ ] Infinite nesting depth (category → sub → sub-sub → …).
- [ ] A category can contain vendors.
- [ ] Full CRUD.
- [ ] Create/edit form lets you pick a parent category, or none (root).
- [ ] A category with children OR vendors cannot be deleted — UI must clearly communicate why (not a silent failure).

## 7. Vendors Module
- [ ] Entity fields: name_ar, name_en, about (text), logo (uploaded photo), cr_number, mobile, category (ref), status (active/inactive).
- [ ] A vendor belongs to exactly one category, assignable from the UI.
- [ ] Full CRUD.
- [ ] Validation:
  - [ ] `cr_number`: exactly 10 digits, unique among non-deleted vendors.
  - [ ] `mobile`: Saudi format `05XXXXXXXX` or `+9665XXXXXXXX`, normalized to one stored format regardless of input form.
- [ ] Delete = soft delete (stays in store, disappears from lists).
- [ ] **Vendor Details Page** must show:
  - [ ] Vendor data + logo
  - [ ] Category with full breadcrumb path from root
  - [ ] Creator and last-updater, each linking to that user's profile page
  - [ ] Created + last-updated timestamps

## 8. Vendors List Page
- [ ] Paginated list — columns: name (AR/EN), category, CR number, status.
- [ ] Filters (must compose together, all reflected in URL for shareable/refreshable state):
  - [ ] Text search by vendor name or CR number
  - [ ] Category filter — searchable dropdown (type-to-search); selecting a parent category includes its subcategories' vendors
  - [ ] Status filter — Any / Active / Inactive
  - [ ] Created date range — From/To date pickers
- [ ] CSV export of the *filtered* list — gated behind the `Export Vendors` permission specifically (independent of general vendor CRUD access).

## 9. Users List Page
- [ ] List columns: name, email, phone, roles, status.
- [ ] Text search by name or email.
- [ ] Row click → User Profile Page.

## 10. User Profile Page
- [ ] Basic info: name, email, photo, phone, status.
- [ ] Roles held + resolved modules/permissions per module.
- [ ] Vendors created by this user, each linking to its details page.
- [ ] If viewer has "manage users" permission: action to edit this user's modules/permissions inline from this page.

## 11. Cross-Cutting / Non-Functional
- [ ] Mock data behind a small async data/service layer (simulated latency) — UI written as if hitting a real API.
- [ ] State persistence choice (in-memory / JSON / localStorage) is free — but document in run notes whether data survives a hard reload or resets to seed.
- [ ] Seed data required, exactly:
  - [ ] 1 Super Admin
  - [ ] 1 user with full Vendors access
  - [ ] 1 read-only user
  - [ ] 1 user without the Vendors module
  - [ ] Credentials for all four documented in run steps (these are what ATMTA will test with).
- [ ] Loading, empty, validation-error, and forbidden states handled explicitly in the UI for every screen.
- [x] Arabic-only UI with native RTL layout (no translation or language switcher overhead; purely Arabic interface).
- [x] Fixed dark theme only (no theme toggler / switcher needed).
- [ ] Docker delivery preferred, not mandatory — reproducible run steps are what's mandatory.

## 12. Explicit Non-Goals (per task notes)
- No real backend/database.
- No real password hashing.
- No translation or i18n switcher (purely Arabic-only UI).
- No theme toggling or light mode (permanent dark theme matching ATMTA palette).
- AI tool use is allowed, but every line must be explainable/defensible in the code-walkthrough video.

## 13. Assumptions Log (fill in as you build)
> Task instruction: if something's unclear and it doesn't block you, note your assumption and continue rather than stalling. Track them here so they can be recited in the video.
- [x] **Theme & Identity**: Fixed dark theme matching official ATMTA Ventures palette (mint `#6abfa1`, gunmetal `#18282c`, night `#0b1113`) using Cairo font with WCAG AAA contrast. No theme switcher.
- [x] **Language**: Pure Arabic interface (`dir="rtl"`, `lang="ar"`). No translation toggles.
- [x] **State Persistence**: Mock database state persisted in `localStorage` via Zustand with an in-header "Restore Default Data" action (`resetToSeed()`) for testing ease.
- [x] **Navigation & Layout**: Native RTL layout (`dir="rtl"`) with right-side collapsible sidebar (`side="right"`) using Shadcn UI primitives and Lucide panel indicators.
- [x] **No Placeholder UI**: Excluded unlinked/fake UI controls (search/notification bells) in favor of real, purposeful controls.

