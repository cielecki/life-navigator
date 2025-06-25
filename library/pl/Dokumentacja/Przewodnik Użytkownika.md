# Przewodnik Użytkownika Life Navigator

**Uwaga:** Ten przewodnik zakłada, że już zainstalowałeś Life Navigator i ukończyłeś początkową konfigurację. Jeśli jeszcze nie zainstalowałeś wtyczki, najpierw postępuj zgodnie z [Przewodnikiem Instalacji](instalacja.md).

Life Navigator to wtyczka asystenta osobistego zasilanego przez AI dla Obsidian, która pomaga w codziennym planowaniu, refleksji, budowaniu nawyków i przewodnictwie życiowym. W przeciwieństwie do generycznych chatbotów AI, Life Navigator zna Twój osobisty kontekst i może zapewniać dostosowane porady oparte na Twoich celach, preferencjach i codziennych wzorcach.

## Co Czyni Life Navigator Wyjątkowym

**Projekt Stawiający Prywatność na Pierwszym Miejscu:** Wszystkie Twoje dane pozostają na Twoich urządzeniach (komputer i telefon) i synchronizują się przez Twoją wybraną usługę (jak iCloud). AI otrzymuje tylko konkretne informacje, które wybierasz do udostępnienia, a żadne dane osobiste nie są przechowywane na zewnętrznych serwerach.

**Kontekstowa Inteligencja:** AI ma dostęp do Twoich informacji osobistych, codziennych notatek i wzorców, umożliwiając mu dostarczanie wglądów, których możesz sam nie dostrzec - jak zauważanie korelacji między snem a nastrojem, czy identyfikowanie wzorców w Twoim zachowaniu.

**Interakcja Głosowa na Pierwszym Miejscu:** Zaprojektowany do naturalnych rozmów głosowych przez cały dzień. Możesz szybko logować aktywności, prosić o przewodnictwo lub reflektować nad swoimi doświadczeniami bez pisania.

## Podstawowe Koncepcje

### Jak AI "Wie" o Tobie

Inteligencja Life Navigator pochodzi z trzech źródeł:

1. **Twoje Pliki Informacyjne:** Szczegóły osobiste, cele, preferencje i kontekst, które wyraźnie podajesz
2. **Codzienne Notatki:** Twoje bieżące wpisy dziennika i logi aktywności
3. **Bieżąca Rozmowa:** Bezpośredni kontekst tego, o czym rozmawiasz

**Ważne:** AI nie ma trwałej pamięci między sesjami. Aby "nauczyć" go czegoś nowego, musi to być zapisane w Twoich plikach informacyjnych lub codziennych notatkach.

### System Linków

Life Navigator używa specjalnego systemu linkowania do kontrolowania, jakie informacje widzi AI:

- **Zwykłe linki** `[[Nazwa Pliku]]` - Odnosi się do pliku, ale nie zawiera jego treści
- **Linki inline** `[[Nazwa Pliku]] 🧭` - Zawiera pełną treść pliku w kontekście AI
- **Linki expand** `🧭 expand [[Nazwa Pliku]]` - Nowoczesna składnia do włączania treści pliku w kontekst AI
- **Wywołania narzędzi** `🧭 periodic_notes(types=["daily"], start_date={offset: 0, unit: "days"}, end_date={offset: 0, unit: "days"})` - Odnosi się do notatek okresowych względem dzisiaj (0=dzisiaj, -1=wczoraj, itp.). Pozwala to trybom na automatyczne włączanie najnowszego kontekstu.
- **Narzędzia zakresowe** `🧭 periodic_notes(types=["daily"], start_date={offset: -3, unit: "days"}, end_date={offset: 0, unit: "days"})` - Zawiera wiele notatek okresowych w zakresie (np. ostatnie 3 dni do dzisiaj)

Dowiedz się więcej o systemie linków w dokumencie [rozwijanie-linków](rozwijanie-linków.md).

## Rozpoczęcie Pracy: Proces Konfiguracji

Life Navigator oferuje kompleksowy proces konfiguracji z przewodnikiem, który zapewnia odpowiednią konfigurację przed rozpoczęciem korzystania z wtyczki. Przepływ konfiguracji składa się z czterech sekwencyjnych ekranów, które przeprowadzą Cię przez wszystkie niezbędne kroki konfiguracji: konfigurację języka, początkową konfigurację treści, konfigurację klucza API Anthropic i konfigurację klucza API OpenAI.

### Pliki Informacyjne (Katalog Info)

**O Mnie.md** - Twój profil osobisty i centrum kontroli
- Zacznij od zastąpienia przykładowej treści własnymi informacjami
- Dołącz szczegóły jak wiek, zawód, zainteresowania, cele, wartości, codzienne rutyny
- Ten plik zawiera również linki do wszystkich plików informacyjnych w katalogu `O Mnie`, więc za każdym razem, gdy linkujesz do tego pliku, AI będzie miało również dostęp do wszystkich informacji w katalogu `O Mnie`.
- Aby dodać nowe pliki informacyjne, MUSISZ linkować je z `O Mnie.md` używając `[[Nazwa Pliku]] 🧭`
- Im więcej odpowiednich szczegółów podasz, tym bardziej spersonalizowana stanie się pomoc AI

**Details/Struktura Dnia.md** - Twoja idealna codzienna rutyna
- Definiuje to, jak AI planuje Twoje dni, gdy prosisz o codzienne planowanie
- Opisz swój preferowany harmonogram, nawyki i powtarzające się aktywności
- Przykład: "Poranna rutyna: Wstawanie o 7:00, medytacja, kawa, przegląd codziennego planu"
- **Uwaga:** Powinno to opisywać Twój idealny dzień, niekoniecznie obecną rzeczywistość

**Details/Wzorce Do Naśladowania.md** - Wpływowe postacie lub wzorce do naśladowania
- Wymień ludzi, których mądrość cenisz (postacie historyczne, mentorzy, autorzy, itp.)
- Tryb Refleksji odnosi się do nich podczas udzielania przewodnictwa

**Details/Relacje.md** - Ważne osoby w Twoim życiu
- Dokumentuj rodzinę, przyjaciół, współpracowników i ich kluczowe cechy
- Pomaga AI zrozumieć Twój kontekst społeczny, gdy wspominasz ludzi po imieniu

**Zaległości.md** - Bieżące zadania i projekty
- Zadania, które nie są związane z konkretnymi dniami
- Długoterminowe cele, pomysły na projekty, rzeczy do zapamiętania
- Różni się od codziennych notatek, które rejestrują aktywności specyficzne dla dnia

### Tryby AI (Katalog Modes)

Life Navigator zawiera kilka wstępnie skonfigurowanych osobowości AI:

**Asystent** - Pomocnik ogólnego przeznaczenia
- Zarządzanie zadaniami, planowanie, odpowiadanie na pytania
- Najlepszy do: Logowania notatek, zarządzania i odznaczania codziennych zadań

**Planista** - Skoncentrowany na codziennym planowaniu
- Tworzy szczegółowe codzienne harmonogramy oparte na Twojej Strukturze Dnia
- Najlepszy do: Porannych sesji planowania, optymalizacji harmonogramu

**Ziomal** - Motywacyjny coach
- Bezpośrednia, zachęcająca osobowość zaprojektowana do przezwyciężania prokrastynacji i oporu
- Najlepsza do: Motywacji, odpowiedzialności, przełamywania mentalnych bloków

**Refleksja** - Przemyślany doradca
- Kontemplacyjna, mądra osobowość do głębszego myślenia, używająca Twoich wzorców do naśladowania i wartości
- Najlepsza do: Przetwarzania emocji, uzyskiwania wglądów, filozoficznych dyskusji

## Codzienny Przepływ Pracy

### Poranne Planowanie

1. Otwórz Life Navigator i wybierz tryb **Planista**
2. Powiedz lub napisz: "Zaplanuj mój dzień" lub "Co powinienem dziś robić?"
3. AI zapyta o Twój kalendarz i poziom energii
4. Tworzy szczegółowy plan oparty na Twojej Strukturze Dnia i bieżących priorytetach
5. Przejrzyj i dostosuj plan według potrzeb

### W Ciągu Dnia

**Szybkie Logowanie Aktywności:**
- Używaj wprowadzania głosowego do szybkiego logowania ukończonych zadań: "Skończyłem trening"
- Zgłaszaj wyzwania: "Mam problem z koncentracją na tym projekcie"
- Proś o przewodnictwo: "Co powinienem robić następnie?"

### Wieczorna Refleksja

1. Przełącz na tryb **Refleksja**
2. Zapytaj: "Pomóż mi reflektować nad moim dniem" lub "Jakie wzorce zauważasz?"
3. AI analizuje Twoje codzienne aktywności i dostarcza wglądy
4. Zapisz ważne wglądy w swojej codziennej notatce dla przyszłej referencji

## Zrozumienie Codziennych Notatek

Codzienne notatki to automatycznie tworzone pliki, które rejestrują Twoje codzienne aktywności, myśli i plany. Podążają za konkretnym formatem:

### Struktura Codziennej Notatki

```markdown
- [x] 🌅 Wstanie o 7:00 (ukończone o 07:15)
- [x] ☕ Poranna kawa i przegląd codziennego planu (ukończone o 07:30)
- [ ] 💼 Praca nad prezentacją projektu
- [x] 🍽️ Zdrowy lunch (ukończone o 12:30)
    Miałem sałatkę z grillowanym kurczakiem, czuję się zadowolony.
- [x] 🏃 30-minutowy trening (ukończone o 18:00)
    Czułem się pełen energii po treningu, dobra wytrzymałość dzisiaj.
- [ ] 📚 Czytanie przez 30 minut przed snem
```

### Praca z Codziennymi Notatkami

**Zarządzanie Zadaniami:**
- AI może dodawać, ukończyć i przenosić zadania między dniami
- Używaj pól wyboru `- [ ]` dla oczekujących zadań, `- [x]` dla ukończonych
- Proś AI o "przenieś to zadanie na jutro" lub "oznacz to jako zrobione"

**Logowanie Aktywności:**
- Logowanie głosowe automatycznie dodaje wpisy z znacznikami czasu
- Tworzy przeszukiwalną historię Twoich aktywności i myśli
- Pomaga AI zrozumieć Twoje wzorce i zapewnić lepsze wglądy

## Dostosowywanie Twojego Doświadczenia

### Personalizacja Trybów AI

Każdy tryb może być szeroko dostosowywany:

**Zmiana Osobowości:**
- Edytuj prompt systemowy w dowolnym pliku trybu
- Przykład: Uczyń Ziomal mniej agresywnym lub zmień prezentację płci
- Modyfikuj styl języka, ton i podejście

**Ustawienia Głosu:**
- Każdy tryb może mieć inny głos AI
- Odwiedź [Demo Głosu OpenAI](https://platform.openai.com/docs/guides/text-to-speech) aby usłyszeć opcje
- Zmień ustawienie `voice` na: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, lub verse
- Modyfikuj `ln_voice_instructions` aby kontrolować styl mówienia (np. "mów szybko i energetycznie")

**Dostosowywanie Wizualne:**
- Zmień `icon` na dowolną [nazwę ikony Lucide](https://lucide.dev/icons/)
- Modyfikuj `color` używając kodów hex lub nazw kolorów
- Przykład: `icon: "brain"`, `color: "#ff5500"`

### Tworzenie Nowych Trybów

Aby utworzyć nowy tryb, poproś asystenta AI o pomoc. AI może:
1. Poprowadzić Cię przez proces tworzenia pliku trybu
2. Pomóc w dostosowaniu promptu systemowego, głosu i ustawień wyglądu
3. Zapewnić, że tryb jest odpowiednio skonfigurowany i zapisany w właściwej lokalizacji
4. Nowy tryb automatycznie pojawi się w panelu Life Navigator

Po prostu zapytaj coś jak "Pomóż mi utworzyć nowy tryb do [Twój cel]" a AI przeprowadzi Cię przez proces.

### Dodawanie Plików Informacyjnych

1. Utwórz nowy plik markdown z Twoimi informacjami
2. **Kluczowy krok:** Dodaj link do pliku w `O Mnie.md` używając formatu `[[Nazwa Pliku]] 🧭`
3. Bez tego linku AI nie może uzyskać dostępu do treści pliku

## Zaawansowane Funkcje

### Inspekcja Promptu Systemowego

Aby zobaczyć dokładnie, jakie informacje otrzymuje AI:
1. Wybierz dowolny tryb w Life Navigator
2. Poszukaj opcji "Pokaż prompt systemowy"
3. Zobacz pełny prompt zawierający wszystkie Twoje linkowane informacje
4. Możesz skopiować ten prompt do użycia w innych narzędziach AI jeśli potrzeba

### Budowanie Nawyków i Rozpoznawanie Wzorców

Life Navigator doskonale pomaga w budowaniu nawyków i rozpoznawaniu wzorców:

**Śledzenie Nawyków:**
- Dołącz powtarzające się aktywności w swojej Strukturze Dnia
- AI może tworzyć zadania warunkowe (np. "Dodaj terapię czerwonym światłem tylko jeśli nie było wczoraj")
- Śledź wskaźniki ukończenia i identyfikuj przeszkody

**Rozpoznawanie Wzorców:**
- AI analizuje Twoje codzienne notatki aby zidentyfikować korelacje
- Przykład: "Zauważam, że jesteś bardziej produktywny w dni, gdy ćwiczysz rano"
- Pytaj bezpośrednio: "Jakie wzorce widzisz w moim zachowaniu?"

## Użytkowanie Mobilne

### Kwestie Konfiguracji

- Zapewnij, że Twój skarbiec synchronizuje się prawidłowo przez iCloud lub wybraną usługę
- Włącz wtyczki społeczności na mobile: Ustawienia → Wtyczki społeczności → Włącz
- Ustawienia języka powinny być zgodne między komputerem a telefonem

### Wskazówki Przepływu Pracy Mobilnej

- Używaj wprowadzania głosowego do szybszego robienia notatek
- **Długie naciśnięcie na bloki narzędzi** aby je rozwinąć/zwinąć (odpowiednik shift+klik na komputerze)
- Unikaj jednoczesnej edycji tego samego pliku na komputerze i telefonie
- Pozwól na czas synchronizacji między urządzeniami (szczególnie z iCloud)
- Rozważ ustawienie codziennych notatek do automatycznego otwierania przy starcie

### Najlepsze Praktyki Synchronizacji

- Edytuj na jednym urządzeniu na raz gdy to możliwe
- Poczekaj na ukończenie synchronizacji przed przełączeniem urządzeń
- Jeśli wystąpią konflikty, ręcznie rozwiąż je wybierając właściwą wersję

## Rozwiązywanie Typowych Problemów

### AI Nie Odpowiada Odpowiednio

**Sprawdź swoje pliki informacyjne:**
- Zapewnij, że `O Mnie.md` linkuje do wszystkich odpowiednich plików z symbolami `🧭`
- Zweryfikuj, że Twoje informacje osobiste są aktualne i odpowiednie
- Usuń przykładową treść, która do Ciebie nie pasuje

**Przejrzyj najnowsze codzienne notatki:**
- AI używa najnowszych codziennych notatek do kontekstu
- Zapewnij, że ważne informacje są uchwycone w Twoich codziennych logach

### Problemy z Rozpoznawaniem Głosu

- Mów wyraźnie i w umiarkowanym tempie
- Zatrzymaj przetwarzanie AI i edytuj wysłaną wiadomość jeśli wystąpią błędy
- Rozważ użycie wprowadzania tekstowego dla złożonych lub technicznych terminów

### Problemy z Synchronizacją

- Sprawdź, że wtyczki społeczności są włączone na wszystkich urządzeniach
- Zweryfikuj, że Twój skarbiec jest prawidłowo skonfigurowany w usłudze synchronizacji
- Pozwól na odpowiedni czas dla ukończenia synchronizacji
- Zrestartuj Obsidian jeśli wtyczka nie pojawi się na nowym urządzeniu

## Kontrolowanie tego, co trafia do kontekstu AI

- Tylko informacje w plikach linkowanych z plików definiujących tryby jak `Planista.md` z symbolami `🧭`
- Najnowsze codzienne notatki (jeśli skonfigurowane w trybie)
- Bieżąca data i czas (jeśli skonfigurowane w trybie)
- Kontekst bieżącej rozmowy

### Użycie API i Koszty

- Life Navigator używa API Anthropic (Claude) i OpenAI
- Płacisz bezpośrednio tym dostawcom na podstawie użycia
- Koszty są zazwyczaj minimalne dla użytku osobistego
- Monitoruj swoje użycie API przez odpowiednie panele dostawców

## Maksymalne Wykorzystanie Life Navigator

### Zacznij Prosto

- Rozpocznij od podstawowych informacji w O Mnie.md
- Używaj początkowo jednego lub dwóch trybów
- Stopniowo dodawaj więcej szczegółów i złożoności gdy stajesz się komfortowy
- Usuń całą przykładową treść i zastąp swoimi informacjami osobistymi

### Bądź Konsekwentny

- Regularne codzienne sesje planowania i refleksji działają najlepiej
- Logowanie głosowe przez cały dzień tworzy cenny kontekst
- Konsekwentne użycie pomaga AI zapewniać lepsze wglądy z czasem

### Eksperymentuj i Iteruj

- Wypróbuj różne tryby w różnych sytuacjach
- Dostosuj osobowości do swoich preferencji
- Dostosuj swoją Strukturę Dnia na podstawie tego, co rzeczywiście działa
- Nie bój się modyfikować lub tworzyć nowych trybów

### Skup się na Wglądach

- Pytaj AI jakie wzorce zauważa w Twoim zachowaniu
- Używaj sesji refleksji do przetwarzania doświadczeń i emocji
- Zapisuj ważne wglądy w swoich plikach informacyjnych dla przyszłej referencji
- Pozwól AI pomóc Ci zobaczyć ślepe punkty w Twoim myśleniu i zachowaniu

Life Navigator staje się bardziej wartościowy im więcej go używasz i im więcej kontekstu podajesz. Zacznij od podstaw i stopniowo buduj kompleksowego osobistego asystenta AI, który naprawdę rozumie Twoje życie i cele.
