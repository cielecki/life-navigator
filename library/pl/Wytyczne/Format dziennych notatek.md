### Zasada nieusuwania zadań
- **Wszystkie zadania pozostają w historii** - nigdy nie usuwamy zadań z plików markdown
- Zmiana statusu zadania zmienia tylko znacznik w nawiasach kwadratowych (`[ ]` → `[x]`, `[>]`, `[-]`)
- Ta zasada pozwala na analizę wzorców produktywności i planowania
- Wszystkie operacje narzędziowe stosują tą zasadę, nawet usunięcie dla pewności tylko oznacza zadanie jako usunięte - tak żebym mógł potem sam manualnie usunąć tak oznaczone zadanie.
- Format ten jest inspirowany papierowym formatem ze znanego 'Bullet Journal'.
### Język i forma zadań
- **Zadania piszemy po polsku** - wszystkie opisy zadań w języku polskim
- **Tryb dokonany** - zadania formułujemy jako już wykonane czynności (np. "napisałem raport" zamiast "napisać raport")
- Dzięki temu lista zadań brzmi jak dziennik osiągnięć
### Kolejność zadań w notkach dziennych
- **Porządek chronologiczny** - zadania układamy według czasu wykonania
- Zaczynamy od zadań robionych najwcześniej (rano)
- Kończymy na zadaniach wykonywanych wieczorem
- Ta kolejność odzwierciedla naturalny przepływ dnia

### Znaczniki w nawiasach kwadratowych
1. `- [ ] zadanie` - zadanie do zrobienia
2. `- [x] zadanie` - zadanie ukończone
3. `- [-] zadanie` - zadanie anulowane/porzucone
4. `- [>] zadanie` - zadanie przeniesione na inny dzień

### Znaczenie statusów dla produktywności
Dzięki zachowaniu wszystkich zadań możliwa jest analiza:
- **Wskaźnik wykonania**: stosunek `[x]` do wszystkich zadań
- **Wskaźnik przełożeń**: ile zadań było `[>]` (może wskazywać na nadmierne planowanie)
- **Wskaźnik porzuceń**: ile zadań było `[-]` (może wskazywać na nierealistyczne cele)
- **Wzorce czasowe**: które pory dnia są najbardziej produktywne
- **Trendy tygodniowe/miesięczne**: jak zmienia się produktywność w czasie

### Struktura zadania
```
- [status] {emoji} {czas} opis zadania {dodatkowe info w nawiasach}
    wcięty komentarz (opcjonalny)
    może być wielolinijkowy
```

### Formaty czasu
- **Zakres czasowy**: `14:00-17:00` (zadanie trwa od 14:00 do 17:00)
- **Konkretna godzina**: `18:30` (zadanie zaczyna się o 18:30)
- **Orientacyjny czas**: `~12:00` (zadanie około 12:00)
- **Czas zakończenia**: `(12:14)` - dodawany automatycznie przy ukończeniu zadania na końcu opisu zadania

### Emoji i priorytety
- Emoji odzwierciedlają kategorię/typ zadania (higiena 🚿, praca 💻, sport 🎾, etc.)
- **🚨 - zadanie priorytetowe/pilne** - może być dodane do dowolnego zadania

### Komentarze do zadań
- **Wcięcie**: każda linia komentarza musi być wcięta 4 spacjami
- **Wielolinijkowość**: komentarz może składać się z wielu linii
- **Zawartość**: dodatkowe informacje, kontekst, refleksje o zadaniu

Przykład:
```
- [x] 🎾 Trening Padla o 11 z Anną, Roksem i Julianem (zakończone o 12:14)
    Był trening wspólnie, było fajnie
    Następnym razem zabrać więcej wody
```

### Usunięte zadania
Zadania oznaczone do usunięcia umieszczamy w komentarzach HTML:
```html
<!-- USUNIĘTE ZADANIE:
- [x] 🎯 Plan na następne aktywności (10:56)
    Może tym razem pogramy w gry planszowe?
-->
```

### Przeniesione zadania
Zadania przeniesione na inny dzień zawierają marker docelowej daty:
```
- [>] 🔋 Naładować baterie (→ 2025-05-26 - poniedziałek)
```

### Nawyki Fundamentalne (Cornerstone Habits)
**Nawyki Fundamentalne** to złożone rutyny składające się z wielu czynności, które reprezentujemy jako jedno zadanie. Pozwala to na:
- Uproszczenie listy zadań
- Łatwiejsze śledzenie wykonania całej rutyny
- Zachowanie szczegółów o poszczególnych czynnościach

**Format:**
```
- [status] {emoji} Nazwa rutyny (szczegółowy opis wszystkich czynności)
    Dodatkowe notatki o wykonaniu rutyny
```

**Przykład:**
```
- [ ] 🚿 Poranna higiena (wziąłem prysznic + dezodorant + krem na ręce + alopexy + umyłem zęby) (zakończone o 07:30)
    Dlugo siedzialem pod prysznicem, higiena przez to zajela mi ponad godzinę.
```

**Zasady tworzenia:**
- Nazwa powinna być krótka i opisowa (np. "Poranna higiena", "Wieczorna rutyna")
- W nawiasach szczegółowy opis wszystkich wykonanych czynności
- Używaj znaku "+" do oddzielenia poszczególnych czynności
- W komentarzach dodaj refleksje o wykonaniu lub modyfikacjach rutyny

### Przykład ewolucji zadania
```
Poniedziałek (rano):
- [ ] napisać raport kwartalny

Poniedziałek (po południu):
- [>] napisać raport kwartalny (przełożone na wtorek)

Wtorek:
- [x] napisać raport kwartalny (ukończone)
```

### Elementy formatu danych wymuszane przez narzędzia
- **Format znaczników** - zawsze `- [status]`
- **Mapowanie znaczników** - `[ ]`, `[x]`, `[-]`, `[>]` są stałe
- **Automatyczne dodawanie czasu ukończenia** - przy ukończeniu/porzuceniu dodawanie markera `(zakończone o HH:MM)`
- **Automatyczne dodawanie informacji o przeniesieniu** - marker `(→ data)` przy przenoszeniu zadań 
- **Logika przenoszenia** - zadania ukończone/porzucone idą na początek listy
- **Format komentarzy** - zawsze wcięte 4 spacjami
