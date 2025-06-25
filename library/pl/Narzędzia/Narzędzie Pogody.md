---
tags: ["ln-tool"]
description: "Pobiera aktualne informacje pogodowe dla określonej lokalizacji"
version: "1.0.0"
icon: "cloud"
enabled: true
---

# Narzędzie Pogody

To narzędzie pobiera aktualne informacje pogodowe dla dowolnej lokalizacji używając darmowego API pogodowego Open-Meteo. Nie wymaga klucza API!

## Schemat

```json
{
  "name": "get_weather",
  "description": "Pobiera aktualne informacje pogodowe i prognozę dla określonej lokalizacji",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "Miasto i kraj/województwo (np. 'Warszawa, Polska' lub 'Kraków, Małopolskie')"
      },
      "units": {
        "type": "string",
        "description": "Jednostki temperatury: 'metric' (Celsjusz), 'imperial' (Fahrenheit)",
        "enum": ["metric", "imperial"],
        "default": "metric"
      },
      "forecast_days": {
        "type": "integer",
        "description": "Liczba dni prognozy do uwzględnienia (1-7)",
        "minimum": 1,
        "maximum": 7,
        "default": 3
      }
    },
    "required": ["location"]
  }
}
```

## Implementacja

```javascript
async function execute(context) {
  const { params, plugin, progress, setLabel } = context;
  
  // Funkcja pomocnicza do normalizacji Unicode (wielokrotnego użytku w różnych narzędziach)
  function normalizeUnicode(text) {
    return text
      .normalize('NFKD') // Rozłóż znaki na podstawę + znaki diakrytyczne
      .replace(/[\u0300-\u036f]/g, ''); // Usuń łączące znaki diakrytyczne
  }
  
  // Opisy kodów pogodowych (kody WMO)
  const weatherDescriptions = {
    0: "Bezchmurnie",
    1: "Głównie bezchmurnie", 2: "Częściowo pochmurno", 3: "Zachmurzenie całkowite",
    45: "Mgła", 48: "Mgła z szadzią",
    51: "Lekka mżawka", 53: "Umiarkowana mżawka", 55: "Gęsta mżawka",
    56: "Lekka mżawka marznąca", 57: "Gęsta mżawka marznąca",
    61: "Słaby deszcz", 63: "Umiarkowany deszcz", 65: "Silny deszcz",
    66: "Lekki deszcz marznący", 67: "Silny deszcz marznący",
    71: "Słaby śnieg", 73: "Umiarkowany śnieg", 75: "Silny śnieg",
    77: "Ziarna śnieżne",
    80: "Słabe opady deszczu", 81: "Umiarkowane opady deszczu", 82: "Gwałtowne opady deszczu",
    85: "Słabe opady śniegu", 86: "Silne opady śniegu",
    95: "Burza", 96: "Burza z lekkim gradem", 99: "Burza z silnym gradem"
  };
  
  setLabel("Wyszukiwanie lokalizacji...");
  
  const location = params.location;
  const units = params.units || 'metric';
  const forecastDays = params.forecast_days || 3;
  
  progress(`Pobieranie pogody dla: ${location}`);
  
  try {
    // Krok 1: Geokodowanie lokalizacji przy użyciu API geokodującego Open-Meteo
    setLabel("Znajdowanie współrzędnych...");
    
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=pl&format=json`;
    
    const geocodeResponse = await requestUrl({
      url: geocodeUrl,
      method: 'GET'
    });
    
    if (!geocodeResponse.json || !geocodeResponse.json.results || geocodeResponse.json.results.length === 0) {
      throw new Error(`Lokalizacja "${location}" nie została znaleziona. Spróbuj innej lokalizacji lub bądź bardziej precyzyjny (np. "Warszawa, Polska")`);
    }
    
    const locationData = geocodeResponse.json.results[0];
    const { latitude, longitude, name, country, admin1 } = locationData;
    
    const displayLocation = admin1 ? `${name}, ${admin1}, ${country}` : `${name}, ${country}`;
    
    // Krok 2: Pobieranie danych pogodowych z Open-Meteo
    setLabel("Pobieranie danych pogodowych...");
    
    const tempUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
    const windUnit = units === 'imperial' ? 'mph' : 'kmh';
    const precipUnit = units === 'imperial' ? 'inch' : 'mm';
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto&forecast_days=${forecastDays}`;
    
    const weatherResponse = await requestUrl({
      url: weatherUrl,
      method: 'GET'
    });
    
    if (!weatherResponse.json) {
      throw new Error('Nie udało się pobrać danych pogodowych z API Open-Meteo');
    }
    
    const weatherData = weatherResponse.json;
    const current = weatherData.current;
    const daily = weatherData.daily;
    
    setLabel("Przetwarzanie informacji pogodowych...");
    
    // Formatowanie aktualnej pogody
    const tempSymbol = units === 'imperial' ? '°F' : '°C';
    const windSymbol = units === 'imperial' ? ' mph' : ' km/h';
    const precipSymbol = units === 'imperial' ? ' in' : ' mm';
    
    const currentTemp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const windSpeed = Math.round(current.wind_speed_10m);
    const windDir = current.wind_direction_10m;
    const pressure = Math.round(current.pressure_msl);
    const cloudCover = current.cloud_cover;
    const precipitation = current.precipitation;
    
    const currentWeatherDesc = weatherDescriptions[current.weather_code] || 'Nieznane';
    
    // Konwersja kierunku wiatru
    const getWindDirection = (degrees) => {
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      return directions[Math.round(degrees / 22.5) % 16];
    };
    
    setLabel("Informacje pogodowe pobrane");
    
    // Wyświetlanie aktualnej pogody
    progress(`**Aktualna Pogoda dla ${displayLocation}**`);
    progress(`*Aktualizacja: ${new Date(current.time).toLocaleString('pl-PL')}*`);
    progress('');
    progress('**Obecne Warunki:**');
    progress(`🌡️ Temperatura: ${currentTemp}${tempSymbol} (odczuwalna ${feelsLike}${tempSymbol})`);
    progress(`☁️ Warunki: ${currentWeatherDesc}`);
    progress(`💧 Wilgotność: ${humidity}%`);
    progress(`💨 Wiatr: ${windSpeed}${windSymbol} ${getWindDirection(windDir)} (${windDir}°)`);
    progress(`🗜️ Ciśnienie: ${pressure} hPa`);
    progress(`☁️ Zachmurzenie: ${cloudCover}%`);
    
    if (precipitation > 0) {
      progress(`🌧️ Opady: ${precipitation}${precipSymbol}`);
    }
    
    // Wyświetlanie prognozy
    if (forecastDays > 1) {
      progress('');
      progress(`**Prognoza ${forecastDays}-dniowa:**`);
      
      for (let i = 0; i < Math.min(forecastDays, daily.time.length); i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Dzisiaj' : 
                      i === 1 ? 'Jutro' : 
                      date.toLocaleDateString('pl-PL', { weekday: 'long' });
        
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const dailyWeatherDesc = weatherDescriptions[daily.weather_code[i]] || 'Nieznane';
        const precipProb = daily.precipitation_probability_max[i];
        const precipSum = daily.precipitation_sum[i];
        const maxWind = Math.round(daily.wind_speed_10m_max[i]);
        const windDirection = getWindDirection(daily.wind_direction_10m_dominant[i]);
        
        progress(`**${dayName}**: ${dailyWeatherDesc}`);
        progress(`  🌡️ ${minTemp}${tempSymbol} / ${maxTemp}${tempSymbol}`);
        
        if (precipProb > 0) {
          progress(`  🌧️ ${precipProb}% szansy na deszcz${precipSum > 0 ? ` (${precipSum}${precipSymbol})` : ''}`);
        }
        
        progress(`  💨 Wiatr: ${maxWind}${windSymbol} ${windDirection}`);
        progress('');
      }
    }
    
    progress('*Dane pogodowe dostarczane przez Open-Meteo.com*');
    progress('*Darmowe API pogodowe bez konieczności rejestracji*');
    
    setLabel("Raport pogodowy ukończony");
    
    return {
      success: true,
      location: displayLocation,
      current_weather: {
        temperature: currentTemp,
        feels_like: feelsLike,
        condition: currentWeatherDesc,
        humidity: humidity,
        wind_speed: windSpeed,
        wind_direction: getWindDirection(windDir),
        pressure: pressure,
        cloud_cover: cloudCover,
        precipitation: precipitation
      },
      forecast: daily.time.slice(0, forecastDays).map((time, i) => ({
        date: time,
        day_name: i === 0 ? 'Dzisiaj' : i === 1 ? 'Jutro' : new Date(time).toLocaleDateString('pl-PL', { weekday: 'long' }),
        condition: weatherDescriptions[daily.weather_code[i]] || 'Nieznane',
        temp_max: Math.round(daily.temperature_2m_max[i]),
        temp_min: Math.round(daily.temperature_2m_min[i]),
        precipitation_probability: daily.precipitation_probability_max[i],
        precipitation_sum: daily.precipitation_sum[i],
        wind_speed_max: Math.round(daily.wind_speed_10m_max[i]),
        wind_direction: getWindDirection(daily.wind_direction_10m_dominant[i])
      }))
    };
    
  } catch (error) {
    setLabel("Błąd podczas pobierania pogody");
    progress(`❌ **Błąd**: ${error.message}`);
    progress('');
    progress('**Wskazówki rozwiązywania problemów:**');
    progress('- Sprawdź pisownię nazwy lokalizacji');
    progress('- Spróbuj dodać kraj lub województwo (np. "Kraków, Polska")');
    progress('- Upewnij się, że masz połączenie z internetem');
    progress('- Spróbuj ponownie za chwilę');
    
    return {
      success: false,
      error: error.message,
      location: location
    };
  }
}
```

## Przykłady Użycia

### Podstawowe Zapytanie
```
🧭 get_weather(location="Warszawa, Polska")
```

### Z Niestandardowymi Parametrami
```
🧭 get_weather(location="Kraków, Polska", units="metric", forecast_days=5)
```

### Dla Lokalizacji Międzynarodowych
```
🧭 get_weather(location="Londyn, Wielka Brytania", units="metric", forecast_days=7)
```

## Obsługiwane Lokalizacje

- **Polskie miasta**: Warszawa, Kraków, Gdańsk, Wrocław, Poznań, etc.
- **Miasta międzynarodowe**: Podaj kraj dla lepszej precyzji
- **Małe miejscowości**: Dodaj województwo lub region
- **Precyzyjne lokalizacje**: Im bardziej szczegółowo, tym lepiej

## Dostępne Jednostki

### Metric (Domyślne)
- Temperatura: Celsjusz (°C)
- Prędkość wiatru: Kilometry na godzinę (km/h)
- Opady: Milimetry (mm)

### Imperial
- Temperatura: Fahrenheit (°F)
- Prędkość wiatru: Mile na godzinę (mph)
- Opady: Cale (in)

## Informacje Pogodowe

### Aktualne Warunki
- Temperatura rzeczywista i odczuwalna
- Opis warunków pogodowych
- Wilgotność powietrza
- Prędkość i kierunek wiatru
- Ciśnienie atmosferyczne
- Zachmurzenie
- Aktualny opad (jeśli występuje)

### Prognoza (1-7 dni)
- Temperatura minimalna i maksymalna
- Opis warunków
- Prawdopodobieństwo opadów
- Suma opadów
- Maksymalna prędkość wiatru
- Dominujący kierunek wiatru

## Rozwiązywanie Problemów

### Typowe Problemy
1. **"Lokalizacja nie znaleziona"**
   - Sprawdź pisownię
   - Dodaj kraj lub województwo
   - Użyj angielskiej nazwy jeśli polska nie działa

2. **Brak danych prognozy**
   - Sprawdź parametr `forecast_days` (1-7)
   - Spróbuj z mniejszą liczbą dni

3. **Błędy połączenia**
   - Sprawdź połączenie internetowe
   - Spróbuj ponownie za chwilę
   - API może być czasowo niedostępne

### Wskazówki Optymalizacji
- Używaj precyzyjnych nazw lokalizacji
- Zapisuj często sprawdzane lokalizacje
- Pamiętaj że dane są aktualizowane co godzinę
- Prognoza jest najbardziej dokładna na 3-5 dni

## Ograniczenia

- **Brak kluczy API**: Darmowe, ale z limitami częstotliwości
- **Dokładność**: Prognoza staje się mniej precyzyjna po 5 dniach
- **Dostępność**: Zależy od dostępności zewnętrznego API
- **Lokalizacje**: Niektóre bardzo małe miejscowości mogą nie być dostępne

To narzędzie jest idealne do codziennego planowania aktywności i sprawdzania warunków pogodowych bez konieczności konfiguracji dodatkowych usług.