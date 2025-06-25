# Narzędzia Life Navigator

Life Navigator posiada bogaty zestaw wbudowanych narzędzi, które pozwalają AI na wykonywanie konkretnych akcji w Twoim skarbcu Obsidian i poza nim. Te narzędzia to podstawa funkcjonalności systemu - umożliwiają AI na czytanie plików, tworzenie notatek, zarządzanie zadaniami i wiele więcej.

## Przegląd Systemu Narzędzi

### Jak Działają Narzędzia

Narzędzia to funkcje, które AI może wywoływać aby:
- Czytać i modyfikować pliki w Twoim skarbcu
- Wyszukiwać informacje w internecie
- Zarządzać zadaniami i projektami
- Pobierać dane z zewnętrznych API
- Wykonywać automatyczne działania

### Składnia Wywołania Narzędzi

Narzędzia można wywoływać na dwa sposoby:

**1. Automatyczne wywołanie przez AI:**
Gdy poprosisz AI o wykonanie zadania, automatycznie wybierze i użyje odpowiednich narzędzi.

**2. Ręczne wywołanie:**
```
🧭 nazwa_narzędzia(parametr1="wartość", parametr2="wartość")
```

Przykład:
```
🧭 note_read(path="Moja Notatka.md")
```

## Kategorie Narzędzi

### 📝 Zarządzanie Notatkami

#### `note_read`
**Opis**: Czyta zawartość pliku notatki
```
🧭 note_read(path="ścieżka/do/pliku.md")
```

#### `note_create`
**Opis**: Tworzy nową notatkę
```
🧭 note_create(path="Nowa Notatka.md", content="Treść notatki")
```

#### `note_edit`
**Opis**: Edytuje istniejącą notatkę z zaawansowanymi operacjami
- **Zamiana tekstu** (`replace`): Zamienia określony tekst na nowy
- **Wstawianie** (`insert_after`, `insert_before`): Dodaje treść przed/po tekście
- **Dodawanie** (`append`, `prepend`): Dodaje treść na końcu/początku dokumentu
- **Usuwanie** (`remove`): Usuwa określony tekst z dokumentu

```
🧭 note_edit(path="Notatka.md", edits=[
  {"type": "replace", "search_text": "Stary tekst", "content": "Nowy tekst"},
  {"type": "remove", "search_text": "Tekst do usunięcia"},
  {"type": "append", "content": "Treść na końcu"}
])
```

#### `note_delete`
**Opis**: Usuwa notatkę
```
🧭 note_delete(path="Notatka.md")
```

### ✅ Zarządzanie Zadaniami

#### `task_add`
**Opis**: Dodaje nowe zadanie do notatki
```
🧭 task_add(note_path="Dzisiejsza.md", task="🏃 Trening 30 minut")
```

#### `task_check`
**Opis**: Oznacza zadanie jako ukończone
```
🧭 task_check(note_path="Dzisiejsza.md", task_text="Trening 30 minut")
```

#### `task_uncheck`
**Opis**: Odznacza zadanie (powrót do stanu nieukończonego)
```
🧭 task_uncheck(note_path="Dzisiejsza.md", task_text="Trening 30 minut")
```

#### `task_edit`
**Opis**: Edytuje treść zadania
```
🧭 task_edit(note_path="Dzisiejsza.md", old_task="Stary tekst", new_task="Nowy tekst")
```

#### `task_move`
**Opis**: Przenosi zadanie między notatkami
```
🧭 task_move(from_note="Dzisiaj.md", to_note="Jutro.md", task_text="Zadanie")
```

#### `task_remove`
**Opis**: Usuwa zadanie całkowicie
```
🧭 task_remove(note_path="Notatka.md", task_text="Zadanie do usunięcia")
```

#### `task_abandon`
**Opis**: Oznacza zadanie jako porzucone ([-])
```
🧭 task_abandon(note_path="Notatka.md", task_text="Zadanie")
```

#### `task_create_completed`
**Opis**: Tworzy zadanie już oznaczone jako ukończone (z czasem)
```
🧭 task_create_completed(note_path="Dzisiaj.md", task="Zadanie", completion_time="14:30")
```

### 📅 Notatki Okresowe

#### `periodic_notes`
**Opis**: Pobiera notatki z określonego okresu
```
🧭 periodic_notes(types=["daily"], start_date={offset: -7, unit: "days"}, end_date={offset: 0, unit: "days"})
```

Parametry:
- `types`: ["daily", "weekly", "monthly", "yearly"]
- `start_date` / `end_date`: Obiekt z `offset` (liczba) i `unit` ("days", "weeks", "months", "years")

#### `periodic_notes_info`
**Opis**: Pobiera informacje o konfiguracji notatek okresowych
```
🧭 periodic_notes_info()
```

### 📂 Zarządzanie Plikami

#### `file_move`
**Opis**: Przenosi lub zmienia nazwę pliku
```
🧭 file_move(old_path="Stara/Lokalizacja.md", new_path="Nowa/Lokalizacja.md")
```

### 🔍 Wyszukiwanie i Odkrywanie

#### `vault_search`
**Opis**: Wyszukuje tekst w całym skarbcu
```
🧭 vault_search(query="szukany tekst", case_sensitive=false)
```

#### `vault_find`
**Opis**: Znajduje pliki według nazwy lub wzorca
```
🧭 vault_find(name_pattern="*.md", path_pattern="folder/*")
```

#### `vault_find_files_by_tag`
**Opis**: Znajduje pliki z określonymi tagami
```
🧭 vault_find_files_by_tag(tags=["#projekt", "#ważne"])
```

### 📚 Biblioteka i Dokumentacja

#### `library_list`
**Opis**: Lista wszystkich plików w bibliotece
```
🧭 library_list(language="pl")
```

#### `library_read`
**Opis**: Czyta plik z biblioteki
```
🧭 library_read(path="Docs/Przewodnik Użytkownika.md", language="pl")
```

### 🌐 Zewnętrzne API i Dane

#### `current_date_time`
**Opis**: Pobiera aktualną datę i czas
```
🧭 current_date_time()
```

#### `url_download`
**Opis**: Pobiera treść ze strony internetowej
```
🧭 url_download(url="https://example.com")
```

### 🎯 Konwersacje i Tryby

#### `current_chat`
**Opis**: Pobiera informacje o bieżącej konwersacji
```
🧭 current_chat()
```

#### `conversation_save`
**Opis**: Zapisuje bieżącą konwersację do pliku
```
🧭 conversation_save(path="Rozmowy/Dzisiejsza Rozmowa.md")
```

#### `mode_delegate`
**Opis**: Deleguje zadanie do innego trybu AI
```
🧭 mode_delegate(mode="Planista", message="Zaplanuj mój dzień", context="dodatkowy kontekst")
```

### 🔐 Zarządzanie Sekretami

#### `secret_save`
**Opis**: Zapisuje zaszyfrowane dane (klucze API, hasła)
```
🧭 secret_save(key="api_key", value="tajny_klucz")
```

#### `secret_list`
**Opis**: Lista dostępnych kluczy sekretów
```
🧭 secret_list()
```

### 📍 Kontekst i Nawigacja

#### `current_file_and_selection`
**Opis**: Pobiera informacje o aktualnie otwartym pliku
```
🧭 current_file_and_selection()
```

### 📋 Listy Narzędzi

#### `tools_list`
**Opis**: Lista wszystkich dostępnych narzędzi
```
🧭 tools_list()
```

## Narzędzia Użytkownika

Oprócz wbudowanych narzędzi, możesz tworzyć własne narzędzia użytkownika. Zobacz [Przewodnik Tworzenia Narzędzi](Przewodnik%20Tworzenia%20Narzędzi.md) dla szczegółów.

### Przykładowe Narzędzia Użytkownika

- **Narzędzie Pogody**: Sprawdza aktualną pogodę
- **Narzędzie Głębokich Badań**: Prowadzi szczegółowe badania internetowe  
- **Narzędzie Generowania Obrazów**: Tworzy obrazy za pomocą AI
- **Narzędzie Szablonów**: Stosuje predefiniowane szablony
- **Narzędzie Transkrypcji YouTube**: Pobiera transkrypcje filmów

## Kontrola Dostępu Narzędzi

### Poziom Trybu
Każdy tryb może mieć skonfigurowane:
- `tools_allowed`: Lista dozwolonych narzędzi (lub `["*"]` dla wszystkich)
- `tools_disallowed`: Lista zabronionych narzędzi

### Filtrowanie Bezpieczeństwa
System automatycznie filtruje narzędzia na podstawie:
- Uprawnień trybu
- Kontekstu bezpieczeństwa
- Typu wykonywanego zadania

## Najlepsze Praktyki

### Wydajność
- **Używaj odpowiednich narzędzi**: Wybieraj najmniej wymagające narzędzia dla zadania
- **Grupuj operacje**: Wykonuj wiele podobnych operacji jednocześnie
- **Ogranicz zakres**: Określaj precyzyjne parametry wyszukiwania

### Bezpieczeństwo
- **Sprawdzaj ścieżki**: Upewnij się, że ścieżki plików są poprawne
- **Backupy**: Regularnie wykonuj kopie zapasowe ważnych danych
- **Testuj zmiany**: Testuj nowe narzędzia na kopii danych

### Organizacja
- **Spójne nazewnictwo**: Używaj konsekwentnych konwencji nazewnictwa
- **Dokumentuj zmiany**: Prowadź rejestr ważnych modyfikacji
- **Czyść regularnie**: Usuń niepotrzebne pliki i dane

## Debugowanie Narzędzi

### Typowe Problemy

**Narzędzie nie działa:**
1. Sprawdź składnię wywołania
2. Zweryfikuj parametry
3. Sprawdź uprawnienia trybu
4. Sprawdź logi błędów

**Błędne wyniki:**
1. Sprawdź ścieżki plików
2. Zweryfikuj format danych
3. Sprawdź encoding znaków
4. Sprawdź uprawnienia plików

**Problemy z wydajnością:**
1. Ogranicz zakres operacji
2. Użyj bardziej specyficznych narzędzi
3. Sprawdź wielkość przetwarzanych danych
4. Rozważ podział na mniejsze operacje

### Narzędzia Diagnostyczne

#### `tool_validator`
**Opis**: Sprawdza poprawność narzędzi użytkownika
```
🧭 tool_validator()
```

## Integracja z Ekosystemem Obsidian

### Wtyczki Społeczności
Narzędzia Life Navigator mogą współpracować z:
- Periodic Notes
- Calendar Plugin
- Templater
- Dataview
- Tasks Plugin

### API Obsidian
Narzędzia wykorzystują oficjalne API Obsidian dla:
- Zarządzania plikami
- Wyszukiwania
- Metadanych
- Widoków i layout

## Rozwijanie Systemu Narzędzi

System narzędzi Life Navigator jest projektowany jako:
- **Rozszerzalny**: Łatwe dodawanie nowych narzędzi
- **Modularny**: Każde narzędzie działa niezależnie
- **Bezpieczny**: Kontrola dostępu i walidacja parametrów
- **Wydajny**: Optymalizacja dla częstego użycia

Aby dowiedzieć się więcej o tworzeniu własnych narzędzi, zobacz [Przewodnik Tworzenia Narzędzi](Przewodnik%20Tworzenia%20Narzędzi.md).
