# Przewodnik Instalacji Life Navigator

Ten przewodnik przeprowadzi Cię przez proces instalacji wtyczki Life Navigator w Obsidian.

## Wymagania

- **Obsidian**: Wersja 1.4.0 lub nowsza
- **System operacyjny**: Windows, macOS, Linux lub Android/iOS (z ograniczeniami)
- **Połączenie internetowe**: Wymagane do korzystania z funkcji AI
- **Klucze API**: Anthropic Claude i/lub OpenAI (opcjonalne, ale zalecane)

## Krok 1: Włączenie Wtyczek Społeczności

1. Otwórz Obsidian
2. Przejdź do **Ustawienia** (Settings) → **Wtyczki społeczności** (Community plugins)
3. Jeśli to Twoja pierwsza wtyczka społeczności, kliknij **Włącz wtyczki społeczności** (Turn on community plugins)
4. Potwierdź, że rozumiesz ryzyko związane z wtyczkami społeczności

## Krok 2: Instalacja Life Navigator

### Metoda A: Przez Marketplace Obsidian (Zalecana)

1. W sekcji **Wtyczki społeczności**, kliknij **Przeglądaj** (Browse)
2. Wyszukaj "Life Navigator"
3. Kliknij na wynik "Life Navigator"
4. Kliknij **Zainstaluj** (Install)
5. Po zakończeniu instalacji, kliknij **Włącz** (Enable)

### Metoda B: Ręczna Instalacja (Dla Zaawansowanych)

1. Pobierz najnowszą wersję z [GitHub Releases](https://github.com/maciej-ka/life-navigator/releases)
2. Wypakuj pliki do folderu `.obsidian/plugins/life-navigator/` w Twoim skarbcu
3. Uruchom ponownie Obsidian
4. Przejdź do **Ustawienia** → **Wtyczki społeczności**
5. Znajdź "Life Navigator" na liście i kliknij **Włącz**

## Krok 3: Pierwsza Konfiguracja

Po włączeniu wtyczki zostaniesz automatycznie przeprowadzony przez proces początkowej konfiguracji:

### Ekran 1: Wybór Języka
- Wybierz język interfejsu (Polski lub Angielski)
- Ten wybór wpłynie na język przykładowych treści i dokumentacji

### Ekran 2: Konfiguracja Treści
- Zdecyduj, czy chcesz zainstalować przykładowe treści
- **Zalecane dla nowych użytkowników**: Zainstaluj przykłady, aby lepiej zrozumieć system
- **Dla doświadczonych użytkowników**: Możesz pominąć i utworzyć własną strukturę

### Ekran 3: Klucz API Anthropic
- Wprowadź swój klucz API Anthropic Claude
- [Jak uzyskać klucz API Anthropic](#uzyskiwanie-kluczy-api)
- Możesz pominąć ten krok i skonfigurować później

### Ekran 4: Klucz API OpenAI
- Wprowadź swój klucz API OpenAI
- [Jak uzyskać klucz API OpenAI](#uzyskiwanie-kluczy-api)
- Możesz pominąć ten krok i skonfigurować później

## Uzyskiwanie Kluczy API

### Klucz API Anthropic (Claude)

1. Przejdź do [console.anthropic.com](https://console.anthropic.com)
2. Utwórz konto lub zaloguj się
3. Przejdź do sekcji **API Keys**
4. Kliknij **Create Key**
5. Nadaj klawiszowi nazwę (np. "Life Navigator")
6. Skopiuj wygenerowany klucz (zaczyna się od `sk-ant-`)
7. **Ważne**: Zapisz klucz w bezpiecznym miejscu - nie będziesz mógł go ponownie zobaczyć

### Klucz API OpenAI

1. Przejdź do [platform.openai.com](https://platform.openai.com)
2. Utwórz konto lub zaloguj się
3. Przejdź do sekcji **API Keys**
4. Kliknij **Create new secret key**
5. Nadaj klawiszowi nazwę (np. "Life Navigator")
6. Skopiuj wygenerowany klucz (zaczyna się od `sk-`)
7. **Ważne**: Zapisz klucz w bezpiecznym miejscu - nie będziesz mógł go ponownie zobaczyć

## Krok 4: Weryfikacja Instalacji

Po ukończeniu konfiguracji:

1. Sprawdź, czy w lewym panelu pojawiła się ikona Life Navigator (zwykle ikona czatu)
2. Kliknij na ikonę, aby otworzyć interfejs
3. Spróbuj wysłać testową wiadomość: "Cześć! Jak działasz?"
4. Jeśli otrzymasz odpowiedź, instalacja zakończyła się sukcesem!

## Konfiguracja Mobilna

### Android

1. Pobierz Obsidian z Google Play Store
2. Otwórz swój skarbiec (upewnij się, że jest zsynchronizowany)
3. Przejdź do **Ustawienia** → **Wtyczki społeczności**
4. **Włącz wtyczki społeczności** jeśli jeszcze nie zostały włączone
5. Life Navigator powinien automatycznie pojawić się na liście dostępnych wtyczek
6. Włącz wtyczkę

### iOS

1. Pobierz Obsidian z App Store
2. Otwórz swój skarbiec (upewnij się, że jest zsynchronizowany)
3. Przejdź do **Ustawienia** → **Wtyczki społeczności**
4. **Włącz wtyczki społeczności** jeśli jeszcze nie zostały włączone
5. Life Navigator powinien automatycznie pojawić się na liście dostępnych wtyczek
6. Włącz wtyczkę

## Rozwiązywanie Problemów z Instalacją

### "Nie mogę znaleźć Life Navigator w marketplace"

**Możliwe przyczyny:**
- Wtyczki społeczności nie są włączone
- Używasz starszej wersji Obsidian
- Problem z połączeniem internetowym

**Rozwiązania:**
1. Upewnij się, że wtyczki społeczności są włączone
2. Zaktualizuj Obsidian do najnowszej wersji
3. Sprawdź połączenie internetowe i spróbuj ponownie
4. Spróbuj ręcznej instalacji

### "Wtyczka nie uruchamia się"

**Możliwe przyczyny:**
- Niekompatybilna wersja Obsidian
- Uszkodzone pliki wtyczki
- Konflikt z innymi wtyczkami

**Rozwiązania:**
1. Sprawdź, czy masz Obsidian w wersji 1.4.0 lub nowszej
2. Wyłącz i włącz ponownie wtyczkę
3. Uruchom ponownie Obsidian
4. Spróbuj wyłączyć inne wtyczki tymczasowo
5. Przeinstaluj wtyczkę

### "Nie widzę interfejsu Life Navigator"

**Możliwe przyczyny:**
- Wtyczka jest zainstalowana ale nie włączona
- Interfejs został zamknięty lub zminimalizowany
- Problem z układem Obsidian

**Rozwiązania:**
1. Sprawdź, czy wtyczka jest włączona w ustawieniach
2. Poszukaj ikony Life Navigator w lewym panelu
3. Spróbuj otworzyć paleta poleceń (Ctrl/Cmd + P) i wyszukaj "Life Navigator"
4. Zresetuj układ workspace w Obsidian

### "Błędy API podczas korzystania z AI"

**Możliwe przyczyny:**
- Nieprawidłowe klucze API
- Brak środków na koncie API
- Problem z połączeniem internetowym

**Rozwiązania:**
1. Sprawdź, czy klucze API są poprawnie wprowadzone
2. Zweryfikuj saldo na kontach Anthropic/OpenAI
3. Sprawdź połączenie internetowe
4. Sprawdź logi błędów w konsoli programisty (F12)

## Synchronizacja Między Urządzeniami

### iCloud (macOS/iOS)

1. Upewnij się, że Twój skarbiec Obsidian jest w folderze iCloud
2. Na wszystkich urządzeniach włącz synchronizację iCloud dla Obsidian
3. Poczekaj na zsynchronizowanie plików
4. Włącz wtyczki społeczności na każdym urządzeniu osobno

### Obsidian Sync

1. Jeśli masz subskrypcję Obsidian Sync, wtyczki synchronizują się automatycznie
2. Upewnij się, że synchronizacja wtyczek jest włączona w ustawieniach
3. Na nowych urządzeniach może być konieczne ręczne włączenie wtyczki

### Inne Usługi (Google Drive, Dropbox, etc.)

1. Upewnij się, że folder `.obsidian` jest synchronizowany
2. Poczekaj na pełną synchronizację przed otwarciem Obsidian na innym urządzeniu
3. Włącz wtyczki społeczności na każdym urządzeniu
4. Może być konieczne ręczne włączenie Life Navigator

## Bezpieczeństwo i Prywatność

### Przechowywanie Kluczy API

- Klucze API są przechowywane lokalnie w Obsidian
- Nigdy nie są wysyłane nigdzie poza oficjalnymi API (Anthropic/OpenAI)
- Upewnij się, że Twój skarbiec jest zabezpieczony

### Synchronizacja Kluczy

**Ostrzeżenie**: Jeśli synchronizujesz swój skarbiec, klucze API mogą być zsynchronizowane na wszystkie urządzenia. Upewnij się, że:
- Wszystkie urządzenia są zabezpieczone
- Używasz bezpiecznych metod synchronizacji
- Regulnie zmieniasz klucze API jeśli urządzenie zostanie skompromitowane

## Następne Kroki

Po pomyślnej instalacji:

1. Przeczytaj [Przewodnik Użytkownika](Przewodnik%20Użytkownika.md)
2. Skonfiguruj swoje [Informacje Osobiste](../Info/O%20Mnie.md)
3. Dostosuj [Strukturę Dnia](../Info/Details/Struktura%20Dnia.md)
4. Rozpocznij używanie różnych [Trybów](../Modes/)

## Pomoc i Wsparcie

Jeśli nadal masz problemy:

1. Sprawdź [Przewodnik Użytkownika](Przewodnik%20Użytkownika.md) dla częstych problemów
2. Odwiedź [GitHub Issues](https://github.com/maciej-ka/life-navigator/issues)
3. Dołącz do społeczności Obsidian na Discord
4. Sprawdź dokumentację Obsidian dla problemów z wtyczkami społeczności

Witamy w Life Navigator! 🧭
