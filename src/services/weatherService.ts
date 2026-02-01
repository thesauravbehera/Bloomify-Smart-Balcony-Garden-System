/**
 * Weather Service - Handles integration with free weather APIs
 * Uses OpenWeatherMap for primary source, falls back to Open-Meteo
 */

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  feelsLike: number;
  uvIndex?: number;
  sunrise: Date;
  sunset: Date;
  description: string;
}

const OPENWEATHER_API_KEY = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY || '';

/**
 * Get weather data from OpenWeatherMap API
 * Free tier: 60 calls/minute, 1M calls/month
 */
export async function getWeatherFromOpenWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeatherMap API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cloudiness: data.clouds.all,
      feelsLike: data.main.feels_like,
      uvIndex: data.uvi,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      description: data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching OpenWeatherMap data:', error);
    return null;
  }
}

/**
 * Get weather data from Open-Meteo API (NO AUTH REQUIRED)
 * Free tier: 10,000 calls/day per IP, no authentication
 * Fallback option that doesn't require API keys
 */
export async function getWeatherFromOpenMeteo(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m&daily=sunrise,sunset&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    // Parse sunrise/sunset times
    const sunriseTime = new Date(daily.sunrise[0]);
    const sunsetTime = new Date(daily.sunset[0]);

    return {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      cloudiness: current.cloud_cover,
      feelsLike: current.temperature_2m, // Open-Meteo doesn't provide feels_like in free tier
      sunrise: sunriseTime,
      sunset: sunsetTime,
      description: getWeatherDescription(current.cloud_cover, current.relative_humidity_2m)
    };
  } catch (error) {
    console.error('Error fetching Open-Meteo data:', error);
    return null;
  }
}

/**
 * Get weather with fallback: Try OpenWeatherMap first, fall back to Open-Meteo
 */
export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  let weather = await getWeatherFromOpenWeather(latitude, longitude);

  if (!weather) {
    console.log('Falling back to Open-Meteo API...');
    weather = await getWeatherFromOpenMeteo(latitude, longitude);
  }

  if (!weather) {
    // Return default/placeholder weather
    return {
      temperature: 20,
      humidity: 50,
      windSpeed: 2,
      cloudiness: 30,
      feelsLike: 20,
      sunrise: new Date(),
      sunset: new Date(),
      description: 'Unable to fetch weather data'
    };
  }

  return weather;
}

/**
 * Generate weather description from cloud cover and humidity
 */
function getWeatherDescription(cloudCover: number, humidity: number): string {
  if (cloudCover < 20) return 'Clear sky';
  if (cloudCover < 50) return 'Mostly clear';
  if (cloudCover < 80) return 'Partly cloudy';
  if (cloudCover < 100) return 'Mostly cloudy';
  if (humidity > 80) return 'Humid and cloudy';
  return 'Overcast';
}

/**
 * Get sunrise/sunset times using Sunrise-Sunset API (NO AUTH)
 * Unlimited free tier
 */
export async function getSunTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): Promise<{ sunrise: Date; sunset: Date; dayLength: number } | null> {
  try {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${dateStr}`
    );

    if (!response.ok) {
      throw new Error(`Sunrise-Sunset API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Sunrise-Sunset API returned status: ${data.status}`);
    }

    const results = data.results;

    // Parse times (format: HH:MM:SS AM/PM)
    const sunrise = parseTime(results.sunrise, date);
    const sunset = parseTime(results.sunset, date);
    const dayLength = results.day_length; // in seconds

    return {
      sunrise,
      sunset,
      dayLength: dayLength / 3600 // convert to hours
    };
  } catch (error) {
    console.error('Error fetching sun times:', error);
    return null;
  }
}

/**
 * Parse time string in format "HH:MM:SS AM/PM" to Date object
 */
function parseTime(timeStr: string, baseDate: Date): Date {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes, seconds] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const date = new Date(baseDate);
  date.setHours(hours, minutes, seconds, 0);

  return date;
}

/**
 * Calculate peak sun hours based on weather data
 * This is the duration of direct sunlight at full intensity (>120W/m²)
 */
export function calculatePeakSunHours(
  sunrise: Date,
  sunset: Date,
  cloudiness: number
): number {
  // Total daylight duration
  const totalHours = (sunset.getTime() - sunrise.getTime()) / (1000 * 60 * 60);

  // Reduce by cloud cover
  // At 0% cloud: 100% direct sun
  // At 50% cloud: ~60% direct sun
  // At 100% cloud: ~5% direct sun (diffuse only)
  const cloudFactor = Math.max(0.05, 1 - cloudiness / 100 * 0.95);

  return totalHours * cloudFactor;
}

/**
 * Get hourly weather forecast for the next 7 days
 */
export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<any | null> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeatherMap API key not configured for forecast');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap forecast API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return null;
  }
}

/**
 * Check if location is suitable for balcony gardening based on weather
 */
export function assessGardeningConditions(weather: WeatherData): {
  score: number; // 0-100
  factors: string[];
  recommendations: string[];
} {
  const factors: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Temperature check
  if (weather.temperature < 0) {
    factors.push('Too cold - risk of plant damage');
    score -= 30;
    recommendations.push('Consider cold-hardy plants only');
  } else if (weather.temperature > 35) {
    factors.push('Very hot - may require extra watering');
    score -= 15;
    recommendations.push('Use shade cloth and mulch for heat protection');
  }

  // Humidity check
  if (weather.humidity < 30) {
    factors.push('Very dry air');
    score -= 10;
    recommendations.push('Choose drought-tolerant plants');
  } else if (weather.humidity > 85) {
    factors.push('High humidity - fungal disease risk');
    score -= 10;
    recommendations.push('Ensure good air circulation');
  }

  // Wind check
  if (weather.windSpeed > 25) {
    factors.push('Strong winds - risk to plants');
    score -= 20;
    recommendations.push('Use windbreaks or choose wind-resistant plants');
  }

  // Cloud cover
  if (weather.cloudiness > 80) {
    factors.push('Heavy cloud cover - less sunlight');
    score -= 5;
    recommendations.push('Choose shade-tolerant plants');
  }

  return {
    score: Math.max(0, score),
    factors,
    recommendations
  };
}
