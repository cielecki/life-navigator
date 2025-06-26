
# Dyrektywy w notatkach - Instrukcja obsługi

## ⚠️ FUNDAMENTALNA ZASADA: Szablony vs Notatki

**📝 NIGDY nie wykonuj dyrektyw w szablonach!**
- Szablony (np. `Szablon Dnia.md`) są wzorcami
- Dyrektywy w szablonach to instrukcje dla przyszłych notatek
- Wykonuj dyrektywy TYLKO w konkretnych notatkach utworzonych z szablonu
- Przykład: wykonuj w `2025-06-25 - środa.md`, NIE w `Szablon Dnia.md`

**Szablon musi pozostać niezmieniony z dyrektywami!**

## Czym są dyrektywy?

Dyrektywy to specjalne markery w notatkach otoczone znakami `%%`, które zawierają instrukcje warunkowe do przetwarzania treści. Przykład:

```
%% usuń jeśli nie jest to notatka dla piątku %%
```

## Zasady przetwarzania dyrektyw

### 1. Podstawowa reguła
**Twoim celem jest wykonać zadanie opisane w dyrektywie i usunąć marker `%%`.**

### 2. Typy dyrektyw

#### A) Dyrektywy usuwania całych sekcji
```
# Kończenie tygodnia pracy %% usuń całą tą sekcję jeśli nie jest to notatka dla piątku %%
```
- Sprawdź warunek (czy notatka jest z piątku)
- Jeśli warunek się nie spełnia → usuń całą sekcję wraz z nagłówkiem
- Jeśli warunek się spełnia → usuń tylko dyrektywy, zostaw zawartość

#### B) Dyrektywy usuwania pojedynczych linii
```
- [ ] 🎯 Przeprowadziłem tygodniowy przegląd %% usuń jeśli nie jest to notatka dla niedzieli %%
```
- Sprawdź warunek (czy notatka jest z niedzieli)
- Jeśli warunek się nie spełnia → usuń całą linię wraz z zadaniem
- Jeśli warunek się spełnia → usuń tylko dyrektywy, zostaw zadanie

#### C) Dyrektywy interaktywne (wymagające ustaleń z użytkownikiem)
```
%% dopytaj się mnie o to co jest specyficzne dla dzisiaj i dodaj tutaj wydarzenia specyficzne dla planowanego dnia %%
```
- **WAŻNE:** Nie usuwaj dyrektywy od razu!
- Przeprowadź rozmowę z użytkownikiem
- Zapisz ustalone informacje w odpowiednim miejscu notatki
- **Dopiero po zapisaniu ustaleń** usuń marker dyrektywy

#### D) Dyrektywy warunkowego dodawania (automatyczne)
```
%% usuń jeśli jest już zrobione w tym miesiącu %%
```
- Sprawdź warunek automatycznie
- Wykonaj akcję opisaną w dyrektywie
- Usuń marker po wykonaniu

### 3. Procedura przetwarzania

1. **Przetwarzaj dyrektywy w małych grupach** - nie edytuj całego dokumentu na raz
2. **Używaj narzędzia edycji** - nie używaj specjalistycznych narzędzi do zadań
3. **Sprawdź warunek** - określ czy dotyczy konkretnego dnia/sytuacji
4. **Wykonaj akcję** - usuń treść lub zostaw ją zgodnie z warunkiem
5. **Usuń marker** - zawsze usuń `%% tekst dyrektywy %%` po przetworzeniu

### 4. Przykłady warunków

- **Dni tygodnia**: `jeśli nie jest to notatka dla piątku`
- **Daty**: `jeśli jest przed 10 dniem danego miesiąca`
- **Poprzednie wykonanie**: `jeśli w przeciągu ostatnich 3 dni już zrobiłem`
- **Sytuacyjne**: `jeśli mało czasu poświęcam na relacje`

### 5. Ważne zasady

- **Jedna dyrektywa = jedna operacja edycji**
- **Zawsze usuń marker po przetworzeniu**
- **Sprawdź datę/dzień tygodnia notatki przed oceną warunków**
- **Nie pozostawiaj pustych sekcji po usunięciu treści**
- **Zachowaj formatowanie markdown po edycji**

### 6. Sekwencja działań

1. Przeczytaj notatkę i zidentyfikuj wszystkie dyrektywy `%%`
2. Dla każdej dyrektywy określ typ:
   - **Automatyczna** (usuwanie na podstawie warunków)
   - **Interaktywna** (wymagająca rozmowy z użytkownikiem)
3. **Dla dyrektyw automatycznych:**
   - Sprawdź warunek (dzień, data, poprzednie wykonanie)
   - Zdecyduj o akcji (usuń/zostaw treść)
   - Wykonaj edycję za pomocą narzędzia edycji
   - Usuń marker dyrektywy
4. **Dla dyrektyw interaktywnych:**
   - Przeprowadź rozmowę z użytkownikiem
   - Poczekaj na odpowiedź
   - Zapisz uzyskane informacje w notatce
   - Dopiero teraz usuń marker dyrektywy
5. Sprawdź czy nie zostały żadne markery `%%`

Pamiętaj: Cel to doprowadzenie do stanu, gdzie w notatce nie ma żadnych markerów `%%`, a treść jest odpowiednio dostosowana do warunków.