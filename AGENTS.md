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

## Data Fetching
- **Never use `useQuery` directly.** Always use the `useCustomQuery` hook from `src/hooks/useCustomQuery.ts`.
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

## Styling
- TailwindCSS v4 only. Use logical properties (`ms-`, `me-`, `ps-`, `pe-`) for RTL support — never `ml-`/`mr-`/`pl-`/`pr-`.
- Dark mode uses `.dark` class strategy — always use theme tokens, never hardcode light/dark colors.
- RTL (`dir="rtl"`) is the default. Every component must be RTL-compatible from the start.
- **Responsiveness is mandatory** — every component and layout must work across mobile, tablet, and desktop. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) from the start, not as an afterthought.
