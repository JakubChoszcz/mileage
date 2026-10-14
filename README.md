<<<<<<< HEAD
# mileage
# mileage
=======
# Mileage

Personal running dashboard: weekly mileage, training types, run details and
shoe tracking.

> 🚧 Work in progress — a side project built to learn modern React tooling
> in practice.

## Features

- [ ] **My month** — monthly summary: distance, run count, average pace,
      longest run
- [ ] **Training types** — automatic run classification (easy, recovery,
      long run, tempo, intervals) and 80/20 aerobic vs quality balance
- [ ] **Weekly volume** — distance / time / elevation per week with pace
      trend and deviation from the recent average
- [ ] **When I run** — day-of-week × time-of-day heatmap
- [ ] **Run details** — per-kilometer splits, pace and heart rate charts
- [ ] **Shoes** — mileage per pair with replacement alerts
- [ ] **Import** — GPX upload, later Strava sync
- [ ] **i18n** — Polish and English, kilometers and miles

All filters live in the URL, so every report view can be reloaded, shared
and navigated with the browser's back button.

## Tech stack

**Frontend:** React, TypeScript, Vite, TanStack Router, TanStack Query, zod,
react-intl, Tailwind CSS, Recharts, dayjs

**Backend:** Hono, `@hono/zod-openapi`, SQLite

**API contract:** the backend exposes an OpenAPI spec, and
[orval](https://orval.dev) generates typed zod schemas for the frontend

**Tooling:** Vitest, Biome, husky

## Getting started

```bash
npm install
npm run dev            # start the app
npm run generate:api   # regenerate the API contract from the backend's OpenAPI spec
npm test               # run unit tests
npm run check          # lint and format check
```

## Docs

- [SPEC.md](SPEC.md) — product spec: business rules, training-type
  classification, filters and reports (in Polish)
- [PLAN.md](PLAN.md) — architecture decisions and roadmap (in Polish)
>>>>>>> c7caac9 (feat: add readme, plan, spec)
