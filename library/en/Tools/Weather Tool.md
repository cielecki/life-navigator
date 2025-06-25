---
tags: ["ln-tool"]
description: "Fetches current weather information for a specified location"
version: "1.0.0"
icon: "cloud"
enabled: true
---

# Weather Tool

This tool fetches current weather information for any location using the free Open-Meteo weather API. No API key required!

## Schema

```json
{
  "name": "get_weather",
  "description": "Gets current weather information and forecast for a specified location",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and country/state (e.g., 'London, UK' or 'New York, NY')"
      },
      "units": {
        "type": "string",
        "description": "Temperature units: 'metric' (Celsius), 'imperial' (Fahrenheit)",
        "enum": ["metric", "imperial"],
        "default": "metric"
      },
      "forecast_days": {
        "type": "integer",
        "description": "Number of forecast days to include (1-7)",
        "minimum": 1,
        "maximum": 7,
        "default": 3
      }
    },
    "required": ["location"]
  }
}
```

## Implementation

```javascript
async function execute(context) {
  const { params, plugin, progress, setLabel } = context;
  
  // Helper function for Unicode normalization (reusable across tools)
  function normalizeUnicode(text) {
    return text
      .normalize('NFKD') // Decompose characters into base + diacritics
      .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
  }
  
  // Weather code descriptions (WMO codes)
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
  };
  
  setLabel("Looking up location...");
  
  const location = params.location;
  const units = params.units || 'metric';
  const forecastDays = params.forecast_days || 3;
  
  progress(`Getting weather for: ${location}`);
  
  try {
    // Step 1: Geocode the location using Open-Meteo's geocoding API
    setLabel("Finding coordinates...");
    
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;
    
    const geocodeResponse = await requestUrl({
      url: geocodeUrl,
      method: 'GET'
    });
    
    if (!geocodeResponse.json || !geocodeResponse.json.results || geocodeResponse.json.results.length === 0) {
      throw new Error(`Location "${location}" not found. Please try a different location or be more specific (e.g., "London, UK")`);
    }
    
    const locationData = geocodeResponse.json.results[0];
    const { latitude, longitude, name, country, admin1 } = locationData;
    
    const displayLocation = admin1 ? `${name}, ${admin1}, ${country}` : `${name}, ${country}`;
    
    // Step 2: Get weather data from Open-Meteo
    setLabel("Fetching weather data...");
    
    const tempUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
    const windUnit = units === 'imperial' ? 'mph' : 'kmh';
    const precipUnit = units === 'imperial' ? 'inch' : 'mm';
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto&forecast_days=${forecastDays}`;
    
    const weatherResponse = await requestUrl({
      url: weatherUrl,
      method: 'GET'
    });
    
    if (!weatherResponse.json) {
      throw new Error('Failed to retrieve weather data from Open-Meteo API');
    }
    
    const weatherData = weatherResponse.json;
    const current = weatherData.current;
    const daily = weatherData.daily;
    
    setLabel("Processing weather information...");
    
    // Format current weather
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
    
    const currentWeatherDesc = weatherDescriptions[current.weather_code] || 'Unknown';
    
    // Wind direction conversion
    const getWindDirection = (degrees) => {
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      return directions[Math.round(degrees / 22.5) % 16];
    };
    
    setLabel("Weather information retrieved");
    
    // Display current weather
    progress(`**Current Weather for ${displayLocation}**`);
    progress(`*Updated: ${new Date(current.time).toLocaleString()}*`);
    progress('');
    progress('**Current Conditions:**');
    progress(`🌡️ Temperature: ${currentTemp}${tempSymbol} (feels like ${feelsLike}${tempSymbol})`);
    progress(`☁️ Conditions: ${currentWeatherDesc}`);
    progress(`💧 Humidity: ${humidity}%`);
    progress(`💨 Wind: ${windSpeed}${windSymbol} ${getWindDirection(windDir)} (${windDir}°)`);
    progress(`🗜️ Pressure: ${pressure} hPa`);
    progress(`☁️ Cloud Cover: ${cloudCover}%`);
    
    if (precipitation > 0) {
      progress(`🌧️ Precipitation: ${precipitation}${precipSymbol}`);
    }
    
    // Display forecast
    if (forecastDays > 1) {
      progress('');
      progress(`**${forecastDays}-Day Forecast:**`);
      
      for (let i = 0; i < Math.min(forecastDays, daily.time.length); i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Today' : 
                      i === 1 ? 'Tomorrow' : 
                      date.toLocaleDateString('en-US', { weekday: 'long' });
        
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const dailyWeatherDesc = weatherDescriptions[daily.weather_code[i]] || 'Unknown';
        const precipProb = daily.precipitation_probability_max[i];
        const precipSum = daily.precipitation_sum[i];
        const maxWind = Math.round(daily.wind_speed_10m_max[i]);
        const windDirection = getWindDirection(daily.wind_direction_10m_dominant[i]);
        
        progress(`**${dayName}**: ${dailyWeatherDesc}`);
        progress(`  🌡️ ${minTemp}${tempSymbol} / ${maxTemp}${tempSymbol}`);
        
        if (precipProb > 0) {
          progress(`  🌧️ ${precipProb}% chance of rain${precipSum > 0 ? ` (${precipSum}${precipSymbol})` : ''}`);
        }
        
        progress(`  💨 Wind: ${maxWind}${windSymbol} ${windDirection}`);
        progress('');
      }
    }
    
    progress('*Weather data provided by Open-Meteo.com*');
    progress('*Free weather API with no registration required*');
    
    setLabel("Weather report completed");
    
  } catch (error) {
    setLabel("Weather fetch failed");
    progress(`Error: ${error.message}`);
    
    if (error.message.includes('not found')) {
      progress('');
      progress('**Troubleshooting tips:**');
      progress('• Try including the country (e.g., "Paris, France")');
      progress('• Use English location names');
      progress('• Check spelling of the location');
      progress('• For US cities, include state (e.g., "Portland, Oregon")');
    }
    
    throw error;
  }
}
```

## Usage Examples

1. **Basic weather query**: "What's the weather in Tokyo?"
2. **With units**: "Get weather for Berlin in Fahrenheit"
3. **Extended forecast**: "Show me a 7-day forecast for Sydney, Australia"
4. **Specific location**: "Weather for San Francisco, California"

## Features

- **Real weather data** from Open-Meteo API (no API key required)
- **Current conditions** with temperature, humidity, wind, pressure
- **Multi-day forecasts** (1-7 days)
- **Automatic location lookup** with geocoding
- **Unit conversion** support (Celsius/Fahrenheit, km/h/mph)
- **Detailed weather descriptions** using WMO weather codes
- **Wind direction** conversion and display
- **Precipitation information** including probability and amounts

## Data Source

This tool uses the free Open-Meteo weather API, which provides:
- High-resolution weather forecasts
- Global coverage
- No API key required
- Data from national weather services
- Hourly updates for most regions

Learn more at: https://open-meteo.com
</rewritten_file>