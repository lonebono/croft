# Dependencies

Everything Croft depends on, why it's there, and where it runs. Versions are what's installed now (`package-lock.json` is the source of truth).

## Runtime (`dependencies`): ships with the app

6 packages. This is everything that reaches the browser or the server.

| Package                 | Version | Why                                                                                   |
| ----------------------- | ------- | ------------------------------------------------------------------------------------- |
| `next`                  | 16.4.6  | The framework: routing, Server Components, Server Actions, `proxy.ts`. Pinned exactly |
| `react`                 | 19.2.4  | UI library Next renders                                                               |
| `react-dom`             | 19.2.4  | React's browser/server renderer                                                       |
| `@supabase/supabase-js` | 2.110.0 | Supabase client: database queries, auth                                               |
| `@supabase/ssr`         | 0.12.0  | Cookie-based Supabase sessions for Next (split browser/server clients)                |
| `lucide-react`          | 1.23.0  | Icons (thin line set, per the design system)                                          |

## Development (`devDependencies`): never shipped

Used to build, check, and test. None of it reaches production.

### Build

| Package                | Version | Why                                            |
| ---------------------- | ------- | ---------------------------------------------- |
| `typescript`           | 5.9.3   | Type checking (`npm run typecheck`)            |
| `tailwindcss`          | 4.3.2   | CSS framework (tokens live in `globals.css`)   |
| `@tailwindcss/postcss` | 4.3.2   | Plugs Tailwind into Next's CSS pipeline        |
| `@types/node`          | 24.19.2 | Node API types, matched to the Node 24 runtime |
| `@types/react`         | 19.2.17 | React types                                    |
| `@types/react-dom`     | 19.2.3  | React DOM types                                |

### Lint and format

| Package                  | Version | Why                                                                           |
| ------------------------ | ------- | ----------------------------------------------------------------------------- |
| `eslint`                 | 9.39.4  | Linter (`npm run lint`)                                                       |
| `eslint-config-next`     | 16.4.6  | Next's rules (React, hooks, a11y, imports). Pinned to match `next`            |
| `eslint-config-prettier` | 10.1.8  | Turns off ESLint rules that would fight Prettier                              |
| `prettier`               | 3.10.1  | Formatter (`npm run format`). Pinned exactly: output changes between versions |

### Git hooks

| Package                           | Version | Why                                                             |
| --------------------------------- | ------- | --------------------------------------------------------------- |
| `husky`                           | 9.1.7   | Installs the `.husky/` hooks (runs on `npm install`)            |
| `lint-staged`                     | 17.6.2  | Pre-commit: `eslint --fix` + `prettier --write` on staged files |
| `@commitlint/cli`                 | 21.2.4  | Commit-msg: checks `type(scope): subject`                       |
| `@commitlint/config-conventional` | 21.2.4  | The Conventional Commits rule set commitlint extends            |

### Testing

| Package                     | Version | Why                                                     |
| --------------------------- | ------- | ------------------------------------------------------- |
| `vitest`                    | 5.1.1   | Test runner (`npm test`)                                |
| `@vitejs/plugin-react`      | 6.3.0   | JSX in tests                                            |
| `jsdom`                     | 31.0.1  | Fake browser DOM for component tests                    |
| `@testing-library/react`    | 16.3.3  | Render components, query them like a user would         |
| `@testing-library/dom`      | 10.4.2  | Core queries `@testing-library/react` builds on (peer)  |
| `@testing-library/jest-dom` | 8.0.0   | Readable assertions (`toHaveAttribute`, `toBeRequired`) |

## Tools on the machine (not in `package.json`)

| Tool                 | Version | Why                                                                           |
| -------------------- | ------- | ----------------------------------------------------------------------------- |
| Node.js              | 24.15.0 | Runtime (CI uses 24 too)                                                      |
| npm                  | 12.2.2  | Package manager. Blocks dependency install scripts by default                 |
| Git                  | 2.53.0  | Version control. Hooks run through Git's bundled `sh`                         |
| GitHub CLI (`gh`)    | 2.105.0 | PRs, merges, repo settings                                                    |
| PostgreSQL client 17 | 17.12   | `pg_dump` / `pg_restore` for manual backups and restore checks                |
| Supabase CLI         | 3.3.0   | `gen types` only, run via `npx --yes supabase@3.3.0` (not installed: ~100 MB) |
| `age`                | 1.3.2   | Decrypting backups (the backup workflow encrypts to the owner's public key)   |

## Considered and left out

| Package                       | Why not                                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `vite-tsconfig-paths`         | One `resolve.alias` line in `vitest.config.mts` covers `@/`          |
| `prettier-plugin-tailwindcss` | Opinionated class sorting, big first diff                            |
| `supabase` (devDependency)    | ~100 MB binary on every `npm ci`; the pinned `npx` command is enough |
| `happy-dom`                   | Went with `jsdom`, which Next's Vitest guide uses                    |
