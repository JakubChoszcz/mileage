# Kilometrownik — plan techniczny i etapy

Wymagania biznesowe i opis raportów: [SPEC.md](SPEC.md).

Cel projektu poza samą aplikacją: nauczyć się w praktyce TypeScriptu,
hooków, zarządzania stanem (URL, Context, server state), TanStack Router
i Query, zod, generowania kontraktu API, react-intl i testów jednostkowych.

## Stack

| Obszar | Wybór |
|---|---|
| Build | Vite, TypeScript (strict), alias `@/` → `src/` |
| Lint / format | Biome, husky (pre-commit) |
| Routing | TanStack Router, file-based routes |
| Server state | TanStack Query (React Query) |
| Walidacja | zod |
| Backend | Hono + `@hono/zod-openapi` + SQLite |
| Kontrakt API | backend wystawia `openapi.json` → **orval** generuje schematy zod na froncie |
| i18n | react-intl + `@formatjs/cli` (wyciąganie stringów) |
| UI | Tailwind + shadcn/ui (lub Radix), wykresy: Recharts |
| Daty | dayjs |
| Testy | Vitest |

## Założenia architektoniczne

- **Feature folders:** każdy raport w `src/features/<nazwa>/`
  (komponenty, hooki, czyste funkcje, testy obok). Wspólne rzeczy
  w `src/components`, `src/hooks`, `src/lib`, `src/utils` dopiero wtedy,
  gdy faktycznie używają ich co najmniej dwa feature'y.
- **Routes tylko składają** stronę: walidacja search params, prefetch,
  render komponentu z feature'a. Bez logiki biznesowej.
- **Stan:**
  - wszystko, co zmienia wynik raportu → URL (walidowany zodem),
  - dane z backendu → React Query,
  - szkic filtrów przed „Zastosuj” → Context nad panelem filtrów,
  - drobny stan UI (otwarty panel, zwinięta grupa) → `useState` w komponencie.
- **Generowany kontrakt** (`src/api/contract.gen.ts`) jest tylko do odczytu —
  zmiany robi się w backendzie i regeneruje.
- **Env** czytany w jednym miejscu (`src/config/env.ts`) i walidowany zodem.
- **Logika biznesowa jako czyste funkcje** (klasyfikacja, agregacje, tempo,
  sanityzacja URL) — łatwe do testowania bez Reacta.
- **Formattery `Intl`** tworzone raz jako stałe modułowe. Uwaga: `pl-PL`
  wstawia twarde spacje jako separator tysięcy.

## Etapy

Każdy etap kończy się działającą aplikacją.

- [ ] **1. Setup** — Vite, TS strict, Biome, husky, alias `@/`, `env.ts`
      z zod, Vitest z pierwszym testem.
- [ ] **2. Backend** — Hono + SQLite, seed z `seed.json`, endpointy
      `GET /runs`, `GET /runs/:id`, `GET /settings`; `openapi.json`
      → orval → `contract.gen.ts`.
- [ ] **3. Klient API** — `apiFetch` z obsługą błędów (`ApiError` ze
      statusem), `queryOptions` per endpoint, `QueryClient` w routerze.
- [ ] **4. Raport 1: Mój miesiąc** — route z `?miesiac=`, kafelki, tabela,
      formattery dystansu / czasu / tempa, testy agregacji.
- [ ] **5. Stany raportu** — wspólny hook: ładowanie / długie ładowanie /
      błąd + retry / brak danych.
- [ ] **6. Klasyfikacja** — czysta funkcja typów treningu + pełne testy
      reguł z SPEC (kolejność, progi, brak splitów, nadpisanie ręczne).
- [ ] **7. Raport 2: Typy treningów** — tabela z grupami, wybór kolumn,
      pasek 80/20.
- [ ] **8. Filtry** — schematy search params w zod, sanityzacja
      z przekierowaniem, panel ze szkicem i „Zastosuj”, zachowywanie filtrów
      między raportami.
- [ ] **9. Raport 3: Objętość tygodniowa** — wykres słupki + linia,
      tooltip, odchylenie od średniej.
- [ ] **10. Raport 4: Kiedy biegam** — heatmapa.
- [ ] **11. Raport 5: Szczegóły biegu** — dynamiczny route, prefetch,
      splity, zmiana typu (pierwsza mutacja).
- [ ] **12. Raport 6: Buty** — CRUD, mutacje, invalidacja zapytań,
      optimistic update przy przypisaniu buta.
- [ ] **13. i18n** — wyciągnięcie stringów, tłumaczenie `en`, przełącznik
      języka, mile, liczba mnoga ICU.
- [ ] **14. Import GPX** — upload, parsowanie i walidacja w backendzie,
      duplikaty, podsumowanie importu.
- [ ] **15. Bonus: Strava OAuth + sync.**

## Zasady pisania kodu

- Każdy string w UI przez `intl.formatMessage({ defaultMessage, description })`;
  `description` opisuje kontekst dla tłumacza.
- Teksty tylko dla czytników ekranu (`aria-label`, `caption`) też przez i18n.
- Elementy znajdowane w testach po roli i nazwie, `data-testid` w ostateczności.
- Testy bez prawdziwej sieci — dane wstrzykiwane do `QueryClient`.
- Bez `as any` i `@ts-ignore` do ukrywania problemów z typami.
