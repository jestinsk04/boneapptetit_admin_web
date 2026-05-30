# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Yarn 1** (pinned via `packageManager` field). `postinstall` runs `flowbite-react patch` which is required for Flowbite components to work.

- `yarn dev` — Vite dev server with HMR (default http://localhost:5173)
- `yarn build` — `tsc -b` then `vite build`; type errors fail the build
- `yarn lint` — ESLint over the repo (no `--fix` in script)
- `yarn preview` — serve `dist/` locally
- `yarn deploy` — `firebase deploy --only hosting:gen-lang-client-0359101987` (build first; this is the only configured hosting target)
- `yarn docs` — converts `docs/ManualUsuario.md` → `.docx` via pandoc (requires pandoc installed locally)

No test runner is configured. Do not invent `yarn test` — none exists.

## Environment variables

All client env vars must be prefixed `VITE_`. `.env.example` only lists Firebase keys, but the code also requires:

- `VITE_API_HOST` — base URL used by `src/shared/libs/httpClient.ts` and `src/shared/config/endpoints.ts` (falls back to a hardcoded Cloud Run URL in `endpoints.ts` — note `httpClient.ts` does NOT fall back, so axios baseURL is `undefined` without it). The README mistakenly calls this `VITE_API_BASE_URL`; the code uses `VITE_API_HOST`.
- `VITE_FIREBASE_*` — six keys for Firebase client init (see `.env.example`).

## Architecture

### Layered layout
```
src/
  app/        # cross-cutting: routing, global stores
  features/   # one folder per feature; routes mount these
  shared/     # libs, services, config, types, UI primitives
```

Path aliases (configured in both `vite.config.ts` and `tsconfig.app.json`):
- `@/*` → `src/*` (used everywhere)
- `@app/*`, `@features/*`, `@shared/*` are declared in tsconfig but the codebase consistently uses `@/`. Prefer `@/` to match existing imports.

### Auth-gated app shell
`src/App.tsx` switches the entire tree based on `useAuthStore().isLoggedIn`:
- Logged out → `AuthNavigation` (only `LoginView`).
- Logged in → wraps `RootNavigation` in a single `QueryClientProvider` (`refetchOnWindowFocus: false`) plus the persistent `<Nav />` header.

On login, `App` also kicks off `useBCVTasaStore().checkBCVData()` and refetches the BCV (Venezuelan central bank) USD rate if the cached value is from a different day. The BCV store is persisted in `localStorage`; the auth store is persisted in `sessionStorage`.

### Routes (`src/app/navigation/RootNavigation.tsx`)
- `/` → Home
- `/webhook` → `WebhookView` with nested `config` and `logs`
- `/orders` → `OrdersView` with nested `manual`

Nested routes rely on the parent rendering `<Outlet />`. AG Grid modules are registered globally in `App.tsx` via `ModuleRegistry.registerModules([AllCommunityModule])` — do not re-register per-feature.

### State management
Two patterns coexist:
- **Zustand vanilla stores** (`createStore` + `persist` + `useStore` selector hooks) for cross-cutting state: `src/app/store/auth.ts`, `src/app/store/bcv.ts`. The vanilla store is exported so non-React code (e.g., `httpClient.ts`) can call `AuthStore.getState()` directly.
- **TanStack Query** for server data inside the authed tree (single client created in `App.tsx`).

When adding a global store, follow the existing pattern: export both the vanilla `*Store` (for imperative access) and a `use*Store` hook (for components).

### HTTP layer
All API calls go through `restApiHttpRequest<T>` in `src/shared/libs/httpClient.ts`:
- Single axios instance with `withCredentials: true` (session cookies).
- Centralized error handling: **401 anywhere except `/logout` clears the auth store and hard-redirects to `/`**. 404/500 resolve silently with `undefined`. The function never rejects — it always resolves (often with `undefined` on error), so callers must null-check.
- `isResponseVoid: true` makes it resolve with `{ status }` instead of the body — used by mutations that only care about success.

Endpoints are centralized in `src/shared/config/endpoints.ts`. Services in `src/shared/services/*.service.ts` wrap `restApiHttpRequest` and expose typed methods. Add new endpoints there, then a service method, then consume from the feature.

### Feature module shape
Larger features (see `src/features/orders/Manual/` and `src/features/webhook/Config/`, `LogsDash/`) follow:
```
FeatureView.tsx
components/          # feature-local components
schemas/             # yup schemas for react-hook-form
utils/tableDefinitions.ts   # AG Grid column defs
```
Forms use `react-hook-form` + `@hookform/resolvers/yup`. Tables use AG Grid with column defs colocated in `utils/tableDefinitions.ts` and the shared theme from `src/shared/ui/ag-grid-theme.ts` (Spanish locale via `src/shared/libs/ag-grid-es.ts`).

DTOs live in `src/shared/types/dto/*.dto.ts` — shared between services and feature views.

### Auth flow
`src/shared/config/firebase.ts` owns Firebase init + `loginWithGoogle()` / `logoutEverywhere()`. Google sign-in produces an ID token sent to the backend via `loginService.Login(tokenID)`; the backend response decides `isAdmin`. If the backend rejects (no claim), `signOut(auth)` is called and `undefined` is returned so the UI stays logged out.

`logoutEverywhere` only runs when `isLoggedIn` is true — the store guards this in `removeSessionData`.

## Conventions

- TypeScript strict mode is on plus `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`. Dead vars will fail `yarn build`.
- ESLint has `react-refresh/only-export-components` as a warning — keep non-component exports out of component files where practical.
- Toasts: `react-toastify` is mounted once in `App.tsx`; just call `toast.*` from anywhere.
- UI components: prefer Flowbite React primitives; reusable wrappers live in `src/shared/component/`.
- Branching: per README, PRs target `develop`.
