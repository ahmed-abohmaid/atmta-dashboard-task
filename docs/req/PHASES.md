# Implementation Phases — ATMTA Modular Admin Dashboard

Companion to `FRD.md`. The phases below follow the **exact sequence of the task PDF specification** (Sections 2.1 through 2.8), ensuring full fidelity to the requirements without gaps.

---

### Phase 0 — Project Setup & Conventions ✅
- Scaffold Next.js (TypeScript) + React project.
- **Fixed Dark Theme**: ATMTA Ventures palette (mint `#6abfa1`, gunmetal `#18282c`, night `#0b1113`) using Cairo font. No theme toggler; dark theme is permanent and uniform.
- **Arabic-Only & Native RTL**: Root `dir="rtl"` and `lang="ar"`. All layouts and components strictly use logical Tailwind properties (`ms-`, `me-`, `ps-`, `pe-`). Pure Arabic interface with no translation overhead or language switchers.
- Base folder structure: Feature-based (`src/features/<feature>/`), strict rule against barrel files (`index.ts`).
- Exit criteria: Layout shell rendered RTL, fixed dark theme, Cairo font, clean build.

---

### Phase 1 — Domain Model & Mock Data Layer ✅
- TypeScript interfaces: `User`, `Role`, `Module`, `Permission`, `Category`, `Vendor`.
- Mock persistence: `useMockStore` (Zustand + `localStorage`) with in-header `resetToSeed()` action.
- Async service layer with artificial `delay()` simulating a real backend.
- Seed data for all 4 required testing accounts:
  1. Super Admin
  2. User with full Vendors access
  3. Read-only user
  4. User without the Vendors module
- Initial seed categories tree and vendors.

---

### Phase 2 — Authentication & Session (PDF §2.1) ✅
- Login / logout flow against mock data (no real backend, no real hashing).
- Persisted session across page refreshes via client storage.
- Protected route redirection when unauthenticated.
- Login screen with Arabic validation and clear feedback.

---

### Phase 3 — Core Permissions Engine (PDF §2.3) ✅
- Reusable CASL ability resolution: `user.roles ∪ user.extraGrants − user.extraRevokes`.
- Single source of truth: `usePermission` hook and `defineAbility` utility.
- UI enforcement primitives:
  - `ModuleRouteGuard`: route-level guard displaying a clear `ForbiddenState` upon direct URL access.
  - `PermissionGate`: element-level gate (hiding or rendering disabled with tooltip).
  - Dynamic sidebar navigation filtering based on active abilities.
- Business rules:
  - Permission inheritance validation helper ("cannot grant what you don't hold").
  - Last Super Admin safeguard logic.

---

### Phase 4 — Dynamic Modules System & Directory (PDF §2.2) ✅
- **Data-Driven Architecture ✅**: Modules stored strictly as data in mock store (`SEED_MODULES`), never hardcoded in navigation or permission checks.
- **Dynamic Navigation ✅**: Sidebar and route guards strictly resolve from `getModules()` query.
- **Declared Actions ✅**: CRUD minimum (`create`, `read`, `update`, `delete`) + custom module actions (`vendors.export`, etc.).
- **Modules Management Page (`/modules`) ✅**:
  - Overview screen displaying all registered modules and their declared actions (standard vs custom).
  - Capability to add a new dynamic module via mock store to prove live that navigation and permissions adapt with zero code changes.
  - Dynamic fallback route `/[moduleKey]` demonstrating immediate zero-code access, route guard, and permission inspection.

---

### Phase 5 — Roles Module & Role CRUD (PDF §2.3) ✅
- **Roles List Page (`/roles`) ✅**:
  - List of system and custom roles with description, user count, and assigned permissions.
  - Responsive search with `nuqs` synced to URL query parameters.
- **Role Create & Edit Dialog ✅**:
  - Role name and description fields with Zod validation.
  - Granular dynamic permission-picker matrix (rows = modules from `getModules()`, columns = declared actions).
  - System role safeguards (prevent deleting/modifying core system role flags like `isSystem`).
- **Reusable Dynamic Permission Matrix ✅**:
  - Extracted to `src/features/permissions/components/PermissionMatrix.tsx` for immediate reuse in User creation/edit flow (Phase 8).
  - Enforces hard rule: cannot grant what session user lacks.
  - Popover with `ScrollArea` for `+N` overflow modules preview on cards.

---

### Phase 6 — Categories Module (PDF §2.4)
- Entity: `Category` (`name_ar`, `name_en`, `parent`).
- Infinite nesting depth hierarchy (`category → subcategory → sub-subcategory → ...`).
- Full CRUD operations.
- Parent category selection in create/edit form (or none for root).
- **Delete guard**: Category with children or vendors cannot be deleted — UI clearly explains why.

---

### Phase 7 — Vendors Module & Vendor Details (PDF §2.5)
- Entity: `Vendor` (`name_ar`, `name_en`, `about`, `logo`, `cr_number`, `mobile`, `category`, `status`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`, `deletedAt`).
- Belongs to one category, assignable from UI.
- Full CRUD operations with soft delete (remains in store, disappears from active lists).
- Validation:
  - `cr_number`: exactly 10 digits, unique among non-deleted vendors.
  - `mobile`: Saudi format `05XXXXXXXX` or `+9665XXXXXXXX`, normalized to standard format.
- **Vendor Details Page (`/vendors/[id]`)**:
  - Vendor basic information and logo.
  - Full breadcrumb path from root category.
  - Links to creator and last-updater profiles (`/users/[id]`).
  - Creation and last-updated timestamps.

---

### Phase 8 — Vendors List Page & Advanced Filters (PDF §2.6)
- Paginated vendors table: name (Arabic/English), category, CR number, status.
- Composite filters synced to URL search parameters (shareable/refreshable):
  1. Text search by name or CR number.
  2. Searchable category dropdown (selecting a parent category includes all descendant subcategories).
  3. Status dropdown (Any, Active, Inactive).
  4. Date range pickers (From / To).
- **CSV Export**: Exports filtered list, strictly gated behind the `vendors.export` permission.

---

### Phase 9 — Users Module: List & Profile Pages (PDF §2.7 & §2.8)
- **Users List Page (`/users`)**:
  - Table: name, email, phone, roles, status.
  - Search by name or email.
  - Row click navigates to User Profile Page (`/users/[id]`).
  - Active/Inactive status toggle with last Super Admin safeguard.
- **User Profile Page (`/users/[id]`)**:
  - User basic information, avatar, phone, email, status.
  - Assigned roles and dynamic modules/permissions breakdown.
  - Relational list of vendors created by this user, linking to `/vendors/[id]`.
  - Action to edit user's modules and permissions (gated by manage-users permission).
- **Super Admin User-Creation & Edit Flow** (Guided 2-step modal):
  1. Fill basic user data and assign roles.
  2. Select accessible modules and check specific permissions.
  - Enforce: cannot grant permissions the current user lacks.

---

### Phase 10 — Cross-Cutting States & Polish
- Sweep every screen for loading (`Skeleton`), empty (`EmptyState`), error (`ErrorState`), and forbidden (`ForbiddenState`) states.
- Verify consistent Arabic typography and RTL alignment across all modules.
- Ensure strict compliance with non-functional rules (no console errors, zero ESLint warnings, responsive design).

---

### Phase 11 — Delivery & Documentation
- Comprehensive `README.md` with:
  - Reproduction and run steps.
  - Seed credentials for all 4 test accounts.
  - Architecture explanation and persistence behavior notes.
  - Documented assumptions log.
- Video recordings:
  1. Task demo video.
  2. Source code walkthrough covering the 3 required questions.
- Code packaging and delivery.
