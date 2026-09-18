<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Project Rules

## Session Start
- Always begin each session by reading `caveman` skill, then plan before coding.
- Read `docs/req/FRD.md` and `docs/req/PHASES.md` at session start for context.

## Architecture
- **Feature-based structure**: every feature lives under `src/features/<feature>/` with its own `hooks/`, `components/`, `@types/`, `utils/`, `consts/`.
- Global shared code lives in `src/hooks/`, `src/utils/`, `src/@types/`, `src/consts/`.
- Feature components stay under `src/features/<feature>/components/`. Shared/layout components under `src/components/`.
- **No barrel exports**: Never create or use `index.ts` files to aggregate/re-export sibling files (no `export * from "./..."`). Always import directly from the exact file containing the definition (e.g. `import { User } from "@/@types/user"`).

## Mock Data & Modules System
- **Modules and Entities are dynamic data**: per task requirements, modules, roles, users, categories, and vendors are data stored in the mock backend layer (`useMockStore` / `localStorage`), NEVER static constants.
- **Never create or import static module constants**: adding a new module must only require adding data in the mock store/backend. Navigation, permission resolution, and route guards must strictly consume modules dynamically from queries/service layer.
- **Mock service layer**: keep mock data behind an async service layer with simulated delay. UI must be written as if consuming a real backend API.
- **No direct `useMockStore` in UI or hooks**: `useMockStore` simulates the raw backend database. Only async service files (`src/features/*/services/`) are permitted to read from or mutate `useMockStore`. All UI components and hooks must strictly call async service functions via `useCustomQuery` or mutations.


## Data Fetching
- **Never use `useQuery` directly.** Always use the `useCustomQuery` hook from `src/hooks/useCustomQuery.ts`.
- **No data mapping inside `queryFn`**: `queryFn` must strictly fetch and return raw data from the mock/API service layer. Any data transformations, mappers (e.g. `defineAbilityForUser(user, roles)`), or derived structures must be handled outside `queryFn` using `select` or `useMemo` on the query result.
- Each feature has a `consts/queryKeys.ts` exporting a single `UPPERCASE` const object with all query keys for that feature.
- Global query keys go in `src/consts/queryKeys.ts` following the same pattern.

```ts
// Example: src/features/vendors/consts/queryKeys.ts
export const VENDORS_QUERY_KEYS = {
  all: ["vendors"] as const,
  list: (filters?: unknown) => ["vendors", "list", filters] as const,
  detail: (id: string) => ["vendors", id] as const,
};
```

## TypeScript
- All types/interfaces must be written and properly typed — no `any`, no implicit types.
- Feature-specific types live in `src/features/<feature>/@types/`.
- Global types live in `src/@types/`.

## UI Components
- **Shadcn is always the first choice** for any UI primitive.
- Use TailwindCSS v4 class syntax at all times. No hardcoded colors — use theme tokens (`bg-background`, `text-foreground`, etc.).
- Use `modal` prop on Shadcn components (e.g., `Popover`) when rendered inside `Sheet` or `Dialog`.
- **Icons: always use `lucide-react` first.** Never use inline SVGs or other icon libraries unless a specific icon doesn't exist in Lucide.
- UI style: clean, modern dashboard. Follow `frontend-design` and `taste` skill principles — restraint, hierarchy, good spacing.

## Loading & Error States
- Loading: use `Skeleton` (Shadcn) in a **separate** `<FeatureSkeleton />` component.
- Error: use a **separate** `<FeatureError />` component.
- If a component receives `isLoading` or `error` props, pass them down — don't re-fetch internally.
- Every screen must explicitly handle: loading, empty, error, and forbidden states.

## Components
- Max **~300–350 lines** per component file. Split logically but don't over-split trivial things.
- Extract hooks into separate hook files when they grow or are reusable.
- Follow DRY without over-engineering — check if something already exists before creating it.
- **No trivial comments.** No JSX inline comments describing what the code obviously does. Only add comments when explicitly asked.
- **Naming convention**: Component and layout file names must start with a capital letter (PascalCase, e.g. `AppHeader.tsx`, `AppSidebar.tsx`, `AppShell.tsx`). UI primitive files in `components/ui/` stay as lowercase.
- **No non-working/demo UI**: Never render placeholder or non-functional elements (e.g. fake search bars, fake notification bells). Every element must be real, functional, and purposeful.
- **No `React.` namespace**: Never use `React.` (no `React.useState`, `React.useEffect`, `React.ReactNode`, `React.ComponentProps`). Always import hooks and types directly from `'react'` (e.g. `import { useState, type ReactNode, type ComponentProps } from 'react'`).

## Styling
- TailwindCSS v4 only. Use logical properties (`ms-`, `me-`, `ps-`, `pe-`) for RTL support — never `ml-`/`mr-`/`pl-`/`pr-`.
- Dark mode uses `.dark` class strategy — always use theme tokens, never hardcode light/dark colors.
- RTL (`dir="rtl"`) is the default. Every component must be RTL-compatible from the start.
- **Responsiveness is mandatory** — every component and layout must work across mobile, tablet, and desktop. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) from the start, not as an afterthought.
- **No hover shadows or borders**: Never use `hover:shadow-*` or `hover:border-*`. Keep hover states flat and subtle (use subtle background/text shift only, e.g. `hover:bg-*`).

## Code Quality & Linting
- **Never disable ESLint**: Never use `eslint-disable`, `eslint-disable-next-line`, `/* eslint-disable */`, or `@ts-ignore` to silence linter or compiler warnings. Always fix the underlying root issue properly in code.
