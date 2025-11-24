<!-- Copilot / AI agent instructions for Carbiz-App-Frontend -->
# Copilot instructions — Carbiz App Frontend

Purpose: quickly orient an AI coding agent to be productive in this repo — architecture, conventions, workflows and hot files.

- Big picture
  - Tech: Vite + React (TS), Apollo Client (GraphQL), TailwindCSS, Zustand for local state persistence.
  - Runtime: Single-page app using `createBrowserRouter` (see `src/routes/index.ts`). Layouts live in `src/components/_layout` and pages are exported from `src/pages/index.tsx`.
  - Data flow: UI components call GraphQL operations defined under `src/api/*.ts` (GQL documents exported as uppercase constants). `src/main.tsx` wires an `ApolloClient` with an HTTP link and an auth link that reads `sessionStorage.getItem('authToken')` to set `Authorization` headers.

- How to run (developer workflows)
  - Install + dev server: `npm install` then `npm run dev` (runs `vite`).
  - Build: `npm run build` (runs `tsc -b` then `vite build`).
  - Lint: `npm run lint`.
  - Preview production build: `npm run preview`.

- Key project conventions (do not invent alternatives)
  - File alias: `@` is aliased to `./src` in `vite.config.ts`. Use `@/...` imports consistently.
  - GraphQL: All GraphQL documents are in `src/api/*.ts`. Mutations/queries are exported as uppercase constants (e.g. `LOGIN`, `REGISTER_MERCHANT`) and consumed by hooks/containers. Prefer adding new operations in `src/api` grouped by domain.
  - Auth token: Stored under `sessionStorage` key `authToken`. The Apollo auth link in `src/main.tsx` reads this value — update both places if the key changes.
  - Client state: `zustand` stores persist to `sessionStorage` using key `auth-storage` in `src/store/auth.store.ts`. Use that store for current user information and `logout()` clears `authToken` from sessionStorage.
  - Routing: The router uses `Component`-style route objects in `src/routes/index.ts`. Add routes by editing that file and exporting pages from `src/pages/index.tsx`.
  - Layouts & templates: Authentication flows use `components/_layout/auth.layout.tsx`; the main application uses `components/_layout/main.layout.tsx`. Pages under `components/templates/...` compose atoms/molecules/organisms.
  - UI: Tailwind is the primary styling system; Radix UI primitives are used for accessibility patterns. Keep classes and utility usage consistent with existing components.

- Integration & external services
  - GraphQL endpoint: configured in `src/main.tsx` (`https://carbiz-backend-euek.onrender.com/graphql`). Changes to the backend URL should be updated there.
  - Third-party libs: Apollo, React Router (v7), Radix UI, Tanstack Table, DnD Kit, Sonner (toasts). Search `package.json` for full list.

- Typical change patterns and examples
  - Add a page: create a component under `components/templates/app/...`, export it from `src/pages/index.tsx`, then add a route in `src/routes/index.ts` using the `Component` key.
  - Add a GraphQL operation: create a new const in `src/api/<domain>.ts` using `gql` and import it into the consuming component/hook. Example: `src/api/auth.ts` contains `LOGIN` and other mutations.
  - Persisted auth: when logging in components should write `sessionStorage.setItem('authToken', token)` and update `useAuthStore.setUser(...)`.

- Troubleshooting and debugging tips
  - If queries are failing, check `Network` tab for GraphQL requests and the `Authorization` header presence (token comes from `sessionStorage`).
  - For client state issues, inspect `sessionStorage` keys `authToken` and `auth-storage` and the `useAuthStore` state.
  - If imports fail, ensure the `@` alias is used or adjust path imports; `vite.config.ts` contains the alias mapping.

- Files to inspect when editing features
  - GraphQL & API: `src/api/*.ts`
  - Client bootstrap: `src/main.tsx`
  - Routing & pages: `src/routes/index.ts`, `src/pages/index.tsx`
  - Layouts: `src/components/_layout/*.tsx`
  - Global styles / tailwind: `src/index.css`, `vite.config.ts`
  - Auth/state: `src/store/auth.store.ts`

If anything above is unclear or you'd like more examples (e.g., a new page and GraphQL operation scaffold), tell me which area to expand and I'll iterate the file content. 
