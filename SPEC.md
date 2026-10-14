# Kilometrownik — specyfikacja produktu

Aplikacja webowa do analizy własnych treningów biegowych. Biegacz importuje
swoje biegi, a aplikacja pokazuje podsumowania, klasyfikuje treningi, śledzi
objętość tygodniową i przebieg butów.

Jeden użytkownik (ja), bez kont i logowania w pierwszej wersji.

---

## 1. Słownik i reguły ogólne

### Bieg (aktywność)
Pojedynczy trening. Pola:

| Pole | Typ | Wymagane | Uwagi |
|---|---|---|---|
| `id` | string | tak | |
| `startedAt` | data i godzina | tak | czas lokalny startu biegu |
| `distanceMeters` | liczba | tak | > 0 |
| `durationSeconds` | liczba | tak | czas ruchu, > 0 |
| `elevationGainMeters` | liczba | nie | przewyższenie |
| `avgHeartRate` | liczba | nie | uderzenia/min |
| `splits` | lista | nie | odcinki co 1 km (patrz niżej) |
| `type` | typ treningu | tak | wyliczany automatycznie, można nadpisać ręcznie |
| `typeOverridden` | boolean | tak | `true`, jeśli typ ustawiono ręcznie |
| `shoeId` | string | nie | but, w którym biegłem |
| `name` | string | nie | np. „Parkrun Pole Mokotowskie” |

**Split** = odcinek 1 km: numer, dystans (ostatni może być krótszy),
czas, opcjonalnie średnie tętno.

### Jednostki i przechowywanie
- Backend przechowuje i zwraca **wyłącznie metry i sekundy**. Konwersja na
  km / mile i formatowanie dzieje się na froncie.
- **Tempo** = sekundy na kilometr (lub na milę), wyświetlane jako `m:ss /km`,
  np. `5:12 /km`.
- **Średnie tempo zbioru biegów** = łączny czas / łączny dystans.
  **Nie** średnia z temp poszczególnych biegów (krótki szybki bieg nie może
  zawyżać wyniku tak samo jak długi).

### Czas
- **Tydzień** = poniedziałek–niedziela (ISO).
- **Miesiąc** = miesiąc kalendarzowy, w URL zapisywany jako `RRRR-MM`.
- Bieg należy do dnia / tygodnia / miesiąca według **lokalnej daty startu**
  (bieg od 23:30 do 00:30 należy do dnia, w którym się zaczął).

### Co jest biegiem
- Import odrzuca aktywności o dystansie < 500 m lub tempie wolniejszym niż
  `12:00 /km` (spacery, zapomniany zegarek) — z czytelnym komunikatem.
- **Duplikat** = bieg z czasem startu różniącym się o ≤ 60 s od istniejącego.
  Duplikaty są pomijane przy imporcie, a w podsumowaniu importu widać,
  ile pominięto.

### Ustawienia użytkownika
| Ustawienie | Domyślnie | Do czego służy |
|---|---|---|
| Tempo progowe | `4:45 /km` | klasyfikacja typów treningu |
| Próg long runu | 16 km | klasyfikacja typów treningu |
| Jednostki | km | km / mile |
| Język | polski | polski / angielski |

---

## 2. Typy treningu (klasyfikacja)

Każdy bieg dostaje dokładnie jeden typ. Reguły sprawdzane są **w podanej
kolejności**, wygrywa pierwsza pasująca. `T` = tempo progowe z ustawień,
tempo w s/km (mniejsza liczba = szybciej).

| Kolejność | Typ | Reguła |
|---|---|---|
| 1 | **Interwały** | bieg ma splity i: ≥ 3 splity szybsze niż `T − 10 s` **oraz** ≥ 2 splity wolniejsze niż `T + 60 s` |
| 2 | **Long run** | dystans ≥ próg long runu |
| 3 | **Tempo** | dystans ≥ 5 km i średnie tempo ≤ `T + 15 s` |
| 4 | **Regeneracja** | dystans ≤ 8 km i średnie tempo ≥ `T + 90 s` |
| 5 | **Easy** | wszystko pozostałe |

- Typ nadpisany ręcznie (`typeOverridden = true`) **nie jest** przeliczany
  po zmianie ustawień. Pozostałe biegi są przeliczane.
- Ręczne nadpisanie można cofnąć („przywróć automatyczny”).

### Grupy typów
| Grupa | Typy |
|---|---|
| **Tlenowe** | Easy, Regeneracja, Long run |
| **Jakościowe** | Tempo, Interwały |

Zasada treningowa, którą aplikacja pomaga pilnować: ok. 80% dystansu
tlenowo, ok. 20% jakościowo.

---

## 3. Filtry

Wspólne dla raportów 2–4. **Cały stan filtrów jest w URL**: odświeżenie
strony, przycisk „wstecz” i wysłany komuś link pokazują dokładnie to samo.

| Filtr | Parametr URL | Wartości | Domyślnie |
|---|---|---|---|
| Zakres miesięcy | `od`, `do` | `RRRR-MM` | ostatnie 3 miesiące |
| Typ treningu | `typ` | wiele z listy typów | wszystkie |
| But | `but` | wiele id butów | wszystkie |
| Minimalny dystans | `minKm` | liczba ≥ 0 | brak |

Reguły:
- Filtry zmienia się w panelu bocznym; **działają dopiero po kliknięciu
  „Zastosuj”**. „Wyczyść” resetuje panel do wartości domyślnych (też
  wymaga „Zastosuj”). Zamknięcie panelu bez zastosowania porzuca zmiany.
- Nieprawidłowe wartości w URL są **po cichu poprawiane** (z podmianą URL,
  bez nowego wpisu w historii):
  - nieznany typ albo nieistniejący but → usunięty z listy,
  - `od` późniejsze niż `do` → zamienione miejscami,
  - zakres dłuższy niż 24 miesiące → przycięty do 24 ostatnich,
  - śmieci (np. `minKm=abc`) → wartość domyślna.
- Przy przechodzeniu między raportami 2 ↔ 3 filtry są zachowywane.

---

## 4. Raporty

### Raport 1: Mój miesiąc *(na start — najprostszy)*

**Cel:** szybko zobaczyć, jak mi poszedł dany miesiąc.

**Widok:**
- Przełącznik miesiąca `← październik 2026 →` (parametr URL `miesiac`,
  domyślnie bieżący). Strzałka „→” nieaktywna dla bieżącego miesiąca.
- 4 kafelki:
  - **Dystans** — suma km,
  - **Biegi** — liczba biegów (z poprawną odmianą: 1 bieg, 2 biegi, 5 biegów),
  - **Średnie tempo** — wg reguły z sekcji 1,
  - **Najdłuższy bieg** — dystans + data.
- Tabela biegów z miesiąca, od najnowszego: data, nazwa, dystans, czas,
  tempo, przewyższenie (puste, jeśli brak).

**Przypadki brzegowe:**
- Miesiąc bez biegów → kafelki z `0` / `—` i komunikat „Brak biegów
  w tym miesiącu”.
- Nieprawidłowy `miesiac` w URL lub miesiąc z przyszłości → bieżący miesiąc.

**Bez filtrów z sekcji 3.**

---

### Raport 2: Typy treningów

**Cel:** zobaczyć, jak rozkłada się mój trening i czy trzymam proporcję
80/20.

**Widok:** tabela, wiersz = typ treningu, pogrupowane w grupy (Tlenowe,
Jakościowe) z wierszem sumy dla grupy. Grupy można zwijać — zwinięta grupa
pokazuje tylko swój wiersz sumy.

| Kolumna | Opis |
|---|---|
| Typ | nazwa typu / grupy |
| Biegi | liczba |
| Dystans | suma km |
| % dystansu | udział w łącznym dystansie z filtrów |
| Średnie tempo | wg reguły z sekcji 1 |
| Średnie tętno | średnia ważona czasem, tylko z biegów z tętnem; `—` jeśli brak |
| Najdłuższy | max dystans |

- Użytkownik wybiera, które kolumny widzi (kolumna „Typ” zawsze widoczna).
  Wybór jest zapamiętany lokalnie w przeglądarce, **nie** w URL.
- Pod tabelą pasek 80/20: udział Tlenowe vs Jakościowe w dystansie,
  z ostrzeżeniem, gdy jakościowe > 25%.
- Klik w typ → lista biegów tego typu (z możliwością ręcznej zmiany typu).

---

### Raport 3: Objętość tygodniowa

**Cel:** widzieć, czy objętość rośnie rozsądnie i jak zmienia się tempo.

**Widok:** wykres, oś X = tygodnie z zakresu filtrów.
- **Słupki** = wybrana miara: dystans (domyślnie) / czas / przewyższenie
  (parametr URL `miara`).
- **Linia** = średnie tempo tygodnia.
- **Tooltip** = rozbicie miary tygodnia na typy treningu.
- Tydzień bez biegów = słupek 0, przerwa w linii tempa.
- Bieżący, niezakończony tydzień oznaczony jako „w toku”.

**Odchylenie od średniej** (kafelek nad wykresem):
- bieżący tydzień vs średnia z **poprzednich 4 pełnych tygodni**
  (przełącznik 4 / 12, parametr URL `okno`),
- tygodnie bez biegów liczą się jako 0,
- jeśli historii jest mniej niż okno → średnia z dostępnych tygodni,
- brak historii → `—`,
- wynik w % ze strzałką; wzrost > 10% tydzień do tygodnia oznaczony jako
  ostrzeżenie (zbyt szybki przyrost objętości).

---

### Raport 4: Kiedy biegam

**Cel:** zobaczyć nawyki — w które dni i o jakich porach biegam.

**Widok:** macierz (heatmapa).
- Wiersze: dni tygodnia (pon–nd).
- Kolumny: pory dnia wg godziny startu:
  rano 5–10, południe 10–15, popołudnie 15–19, wieczór 19–23, noc 23–5.
- Wartość komórki: liczba biegów lub suma km (przełącznik).
- Intensywność koloru względem maksimum w macierzy.
- Wiersz i kolumna sum.
- Klik w komórkę → lista biegów z tego przecięcia.

---

### Raport 5: Szczegóły biegu

Adres: `/biegi/:id`. Nieistniejące id → strona „Nie znaleziono biegu”.

- Nagłówek: data, nazwa, typ (z możliwością zmiany), but.
- Kafelki: dystans, czas, tempo, przewyższenie, tętno.
- Tabela splitów: km, czas, tempo, tętno; najszybszy i najwolniejszy split
  wyróżnione; ostatni niepełny split pokazany z rzeczywistym dystansem.
- Wykres tempa i tętna per split.
- Bieg bez splitów → sekcja splitów zastąpiona komunikatem.

---

### Raport 6: Buty

**Cel:** wiedzieć, kiedy wymienić buty.

- Lista par: nazwa, data zakupu, **przebieg**, status.
- **Przebieg** = przebieg początkowy (wpisany przy dodaniu) + suma km biegów
  przypisanych do pary.
- **Status** wg limitu pary (domyślnie 700 km):
  - OK: < 70% limitu,
  - Uwaga: 70–99%,
  - Do wymiany: ≥ 100%.
- Dodawanie, edycja, „odstawienie na emeryturę” (para znika z wyboru przy
  biegach, ale zostaje w historii i filtrach). Usunąć można tylko parę bez
  przypisanych biegów.
- Przypisanie buta do biegu z poziomu listy biegów i szczegółów biegu —
  przebieg aktualizuje się od razu w UI.

---

## 5. Import danych

1. **Wersja 1:** backend startuje z `seed.json` (kilkadziesiąt biegów
   z ostatnich miesięcy, różne typy, część bez tętna i splitów).
2. **Wersja 2:** upload plików GPX (jeden lub wiele). Podsumowanie:
   zaimportowano X, pominięto duplikaty Y, odrzucono Z (z powodem).
3. **Bonus:** synchronizacja ze Stravą (OAuth). Tokeny tylko w backendzie,
   front nigdy nie odpytuje Stravy bezpośrednio.

## 6. Wymagania niefunkcjonalne

- Wszystkie teksty w UI tłumaczalne; domyślnie polski, docelowo także
  angielski. Język zmienia też domyślne jednostki (en → mile).
- Każdy raport obsługuje stany: ładowanie, długie ładowanie (> 8 s,
  dodatkowy komunikat), błąd z przyciskiem „Spróbuj ponownie”, brak danych.
- Dostępność: elementy interaktywne z rolą i nazwą, tabele z `<caption>`.
- Odpowiedzi API walidowane na froncie wg kontraktu.
