# Croft

Single-user personal dashboard. Four modules (parcels): Finance, Calendar, Wardrobe, Coffee. OS-map / ledger-book aesthetic, dark mode only, no SaaS UI patterns (badges, dots, tooltips).

**Stack:** Next.js (App Router), Supabase (Postgres), Tailwind, Vercel (serverless, Hobby tier).

## Design System

Ordnance Survey map meets ledger book. No SaaS patterns, no badges, status dots, or floating tooltips.

- **Mode:** Dark mode only.
- **Palette:**
  - Charcoal (`#121212` base): primary background/structural canvas
  - Straw Gold: hover, focus, active nav
  - Copper: numerical values, ledger balances, data metrics
- **Typography:**
  - Titles/headers: Roboto Slab
  - Data/UI prose: JetBrains Mono
- **Geometry:** Square corners (`rounded-none`), zero box shadows, borders as clean ink-ruled lines.

## Modules

| Parcel   | Status  | Notes                                                                                                                                                                                                                                 |
| -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Finance  | In spec | Multi-account, budget vs. spend, investment analysis (backtesting, forward projections, buy/sell timing). Investment planner is a separate page, not the parcel view. Manual entry only, no bank sync (Plaid doesn't cover PH banks). |
| Calendar | In spec | Month density strip + today's events, click-through to full calendar.                                                                                                                                                                 |
| Wardrobe | In spec | 2 suggested outfits by default, click-through for inventory/laundry status.                                                                                                                                                           |
| Coffee   | In spec | Last brew logged, ledger-entry style.                                                                                                                                                                                                 |

## Branches

- `main`: production, deploys to Vercel prod
- `dev`: active dev, deploys to Vercel preview

⚠️ Branch protection, Vercel/Supabase settings are admin-only, flag before touching.

## Conventions

- TypeScript, strict
- `async/await` only
- Named exports only
- Custom error classes, no raw `throw new Error()`
- `const`/`let` only
- Prettier-formatted

## Setup

```bash
npm install
npm run dev
```

Env vars in `.env.local`, see `.env.example`.
