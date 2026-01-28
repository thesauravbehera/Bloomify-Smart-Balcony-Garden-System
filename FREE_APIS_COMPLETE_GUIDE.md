# 🌐 BLOOMIFY - FREE APIS INTEGRATION GUIDE
## Complete List of Free APIs with Setup Instructions

---

## 📋 TABLE OF CONTENTS

1. [Complete Free APIs List](#complete-free-apis-list)
2. [Weather & Climate APIs](#1-weather--climate-apis)
3. [Plant Database APIs](#2-plant-database--identification-apis)
4. [Geolocation & Map APIs](#3-geolocation--mapping-apis)
5. [Image Analysis APIs](#4-image-analysis-apis)
6. [Social & Community APIs](#5-social--community-apis)
7. [Utility APIs](#6-utility-apis)
8. [Setup Instructions for Each API](#setup-instructions)
9. [Error Handling & Rate Limiting](#error-handling)
10. [Code Examples](#code-examples)

---

## 🎯 COMPLETE FREE APIS LIST

### Summary Table:

| # | API | Purpose | Free Tier | Auth | Rate Limit |
|---|-----|---------|-----------|------|-----------|
| 1 | **OpenWeatherMap** | Weather & climate data | ✅ Yes | API Key | 60/min |
| 2 | **Open-Meteo** | Weather forecast (no auth) | ✅ Yes | None | 10K/day |
| 3 | **USDA Plant Database** | Plant info & hardiness | ✅ Yes | None | Unlimited |
| 4 | **Pl@ntNet API** | Plant identification | ✅ Yes | API Key | 500/day |
| 5 | **OpenAI GPT Vision** | Photo analysis (balcony) | ⚠️ Paid | API Key | Pay-per-use |
| 6 | **Google Reverse Geocoding** | Address to coordinates | ✅ Yes | API Key | 50K/day |
| 7 | **Nominatim (OSM)** | Address to coordinates | ✅ Yes | None | 1/sec |
| 8 | **Mapbox Static API** | Map visualization | ⚠️ Limited | API Key | 125K/month |
| 9 | **Sunrise Sunset API** | Sunrise/sunset times | ✅ Yes | None | Unlimited |
| 10 | **OpenAQ** | Air quality data | ✅ Yes | None | Unlimited |
| 11 | **REST Countries** | Location/region data | ✅ Yes | None | Unlimited |
| 12 | **IP Geolocation** | User location from IP | ✅ Yes | None | 45K/month |
| 13 | **Pexels/Unsplash** | Free plant images | ✅ Yes | API Key | High limit |
| 14 | **GIPHY** | Animated plant GIFs | ✅ Yes | API Key | 43K/day |
| 15 | **Free Tier APIs** | Utilities (QR, emails) | ✅ Yes | Various | Various |

---

## 1️⃣ WEATHER & CLIMATE APIS

### A. OpenWeatherMap API (RECOMMENDED)

**Perfect for**: Real-time weather, solar radiation, UV index

**Free Tier**: 
- 60 calls/minute
- 1,000,000 calls/month
- Current weather, 5-day forecast, historical data

**Sign Up**: https://openweathermap.org/api

```bash
# Get API Key
1. Go to https://openweathermap.org/users/register
2. Create free account
3. Go to API keys tab
4. Copy API key (visible by default)
5. Add to .env.local: VITE_OPENWEATHER_API_KEY=your_key_here
```

**Current Weather Endpoint**:
```typescript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

async function getWeatherData(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  
  const data = await response.json();
  
  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    cloudiness: data.clouds.all,
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    uv: data.uvi || 0  // if included in your plan
  };
}
```

**Forecast Endpoint** (5-day):
```typescript
async function getWeatherForecast(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}
```

---

### B. Open-Meteo API (WEATHER - NO AUTH REQUIRED)

**Perfect for**: Weather when you don't want to manage API keys

**Free Tier**: 
- 10,000 calls/day per IP
- No authentication required
- Historical, current, forecast data

**Endpoint**:
```typescript
async function getMeteoWeather(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day&hourly=temperature_2m,precipitation,cloud_cover&daily=sunrise,sunset`
  );
  
  const data = await response.json();
  
  return {
    current: data.current,
    hourly: data.hourly,
    daily: data.daily
  };
}
```

---

### C. Sunrise Sunset API (PURE SUN DATA - NO AUTH)

**Perfect for**: Calculating exact sunrise/sunset times for your location

**Free Tier**: 
- Unlimited calls
- No authentication
- Historical & future data

```typescript
async function getSunTimes(latitude: number, longitude: number, date: string) {
  // Format: YYYY-MM-DD
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}`
  );
  
  const data = await response.json();
  
  return {
    sunrise: data.results.sunrise,     // ISO format
    sunset: data.results.sunset,       // ISO format
    solarNoon: data.results.solar_noon,
    dayLength: data.results.day_length
  };
}
```

---

## 2️⃣ PLANT DATABASE & IDENTIFICATION APIS

### A. USDA Plant Database (FREE, NO AUTH)

**Perfect for**: Complete plant information, hardiness zones, growing info

**Free Tier**: 
- Unlimited access
- No authentication
- Searchable database

**Access**:
```typescript
// Search by plant name
async function searchUSDAPlants(commonName: string) {
  const response = await fetch(
    `https://trefle.io/api/v1/plants/search?q=${commonName}`
    // Alternative: Trefle API (USDA data) - requires free key
  );
  return response.json();
}

// Better: Use Trefle API (free tier with USDA data)
const TREFLE_API_KEY = import.meta.env.VITE_TREFLE_API_KEY;

async function getTreflePlantData(commonName: string) {
  const response = await fetch(
    `https://trefle.io/api/v1/plants/search?q=${commonName}&token=${TREFLE_API_KEY}`
  );
  
  const data = await response.json();
  
  return data.data.map(plant => ({
    id: plant.id,
    name: plant.common_name,
    scientific: plant.scientific_name,
    mainSpecies: plant.main_species_id,
    imageUrl: plant.image_url
  }));
}

// Get detailed plant info
async function getTreflePlantDetails(plantId: number) {
  const response = await fetch(
    `https://trefle.io/api/v1/plants/${plantId}?token=${TREFLE_API_KEY}`
  );
  
  const plant = await response.json();
  
  return {
    name: plant.data.common_name,
    scientific: plant.data.scientific_name,
    hardiness: {
      minZone: plant.data.main_species.hardiness.min,
      maxZone: plant.data.main_species.hardiness.max
    },
    characteristics: plant.data.main_species.characteristics,
    images: plant.data.images
  };
}
```

**Sign up for Trefle**:
1. Go to https://trefle.io/users/sign_up
2. Create account (free tier: 100 requests/day)
3. Copy API token from dashboard
4. Add to `.env.local`: `VITE_TREFLE_API_KEY=your_token`

---

### B. Pl@ntNet API (PLANT IDENTIFICATION)

**Perfect for**: Identify plants from photos

**Free Tier**: 
- 500 identifications/day
- API access included

**Sign up**:
```bash
1. Go to https://identify.plantnet.org/
2. Create account
3. Go to API section
4. Copy API key
5. Add to .env.local: VITE_PLANTNET_API_KEY=your_key
```

**Usage**:
```typescript
const PLANTNET_API_KEY = import.meta.env.VITE_PLANTNET_API_KEY;

async function identifyPlantFromImage(imageFile: File) {
  const formData = new FormData();
  formData.append('images', imageFile);
  formData.append('organs', 'leaf');  // or 'flower', 'fruit', 'bark'
  
  const response = await fetch(
    `https://api.plantnet.org/v2/identify/all?api-key=${PLANTNET_API_KEY}`,
    {
      method: 'POST',
      body: formData
    }
  );
  
  const results = await response.json();
  
  return results.results.map(result => ({
    species: result.species.scientificName,
    commonName: result.species.commonNames?.[0],
    confidence: result.score,
    bestMatch: result.score > 0.8
  }));
}
```

---

## 3️⃣ GEOLOCATION & MAPPING APIS

### A. Nominatim - OpenStreetMap (FREE, NO AUTH)

**Perfect for**: Convert addresses to coordinates & vice versa

**Free Tier**: 
- Unlimited (be respectful with rate limiting)
- 1 request per second limit
- No authentication required

```typescript
// Address to Coordinates (Geocoding)
async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
  );
  
  const data = await response.json();
  
  if (data.length === 0) return null;
  
  const result = data[0];
  return {
    latitude: parseFloat(result.lat),
    longitude: parseFloat(result.lon),
    address: result.display_name,
    boundingBox: result.boundingbox
  };
}

// Coordinates to Address (Reverse Geocoding)
async function reverseGeocode(latitude: number, longitude: number) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  
  const data = await response.json();
  
  return {
    address: data.address.road || data.address.residential,
    city: data.address.city,
    country: data.address.country,
    postalCode: data.address.postcode
  };
}
```

---

### B. IP Geolocation (FREE, NO AUTH)

**Perfect for**: Get user location from their IP address

**Free Tier**: 
- 45,000 requests/month
- No authentication
- Automatic

```typescript
async function getUserLocationFromIP() {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.city,
    country: data.country,
    timezone: data.timezone,
    isp: data.org
  };
}
```

---

## 4️⃣ IMAGE & PHOTO APIS

### A. Pexels API (FREE PLANT IMAGES)

**Perfect for**: Get high-quality plant photos for your database

**Free Tier**: 
- Unlimited downloads
- 200 requests/hour
- No photo attribution required

```bash
# Sign up
1. Go to https://www.pexels.com/api/
2. Create account (free)
3. Get API key from dashboard
4. Add to .env: VITE_PEXELS_API_KEY=your_key
```

**Usage**:
```typescript
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

async function searchPlantImages(plantName: string) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${plantName}&per_page=15`,
    {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    }
  );
  
  const data = await response.json();
  
  return data.photos.map(photo => ({
    url: photo.src.original,
    thumbnail: photo.src.small,
    photographer: photo.photographer,
    width: photo.width,
    height: photo.height
  }));
}
```

---

### B. Unsplash API (FREE IMAGES)

**Perfect for**: Alternative to Pexels with different photo library

**Free Tier**: 
- 50 requests/hour
- High-quality photos
- Free download

```bash
# Sign up
1. Go to https://unsplash.com/oauth/applications
2. Create "New Application"
3. Copy Access Key
4. Add to .env: VITE_UNSPLASH_API_KEY=your_key
```

**Usage**:
```typescript
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

async function searchUnsplashImages(query: string) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${UNSPLASH_API_KEY}`
  );
  
  return response.json();
}
```

---

## 5️⃣ SOCIAL & COMMUNITY APIS

### A. Twitter/X API (FREE - LIMITED)

**Purpose**: Share plant tips, engage community

**Free Tier**: 
- Tweet to Twitter
- Read/write tweets
- Very limited

[See existing implementation in docs]

---

## 6️⃣ UTILITY APIS

### A. REST Countries API (FREE, NO AUTH)

**Perfect for**: Get region/country info for plant hardiness zones

```typescript
async function getCountryInfo(countryCode: string) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  
  const data = await response.json();
  
  return {
    name: data[0].name.common,
    region: data[0].region,
    subregion: data[0].subregion,
    coordinates: data[0].latlng,
    timeZone: data[0].timezones[0]
  };
}
```

---

## 🔧 SETUP INSTRUCTIONS

### Complete .env.local Setup:

```bash
# ============================================
# BLOOMIFY FREE APIS CONFIGURATION
# ============================================

# Weather & Climate
VITE_OPENWEATHER_API_KEY=sk_live_xxxxx
VITE_OPEN_METEO=true  # No key needed

# Plant Database
VITE_TREFLE_API_KEY=your_trefle_token
VITE_PLANTNET_API_KEY=your_plantnet_key

# Images
VITE_PEXELS_API_KEY=your_pexels_key
VITE_UNSPLASH_API_KEY=your_unsplash_key

# Location
VITE_GOOGLE_MAPS_API_KEY=your_google_key  # Optional, use Nominatim instead

# Existing APIs
VITE_OPENAI_API_KEY=sk_live_xxxxx         # For GPT vision (paid)
VITE_CLOUDINARY_NAME=xxxxx                # Existing
VITE_FIREBASE_...=xxxxx                   # Existing
```

---

## 🛡️ ERROR HANDLING & RATE LIMITING

### Robust API Wrapper:

```typescript
// lib/apiClient.ts

interface APIConfig {
  baseURL: string;
  rateLimit: number;  // requests per minute
  timeout: number;    // milliseconds
  retries: number;
}

class APIClient {
  private config: APIConfig;
  private requestQueue: Map<string, number[]> = new Map();
  
  constructor(config: APIConfig) {
    this.config = config;
  }
  
  async request(endpoint: string, options?: RequestInit) {
    // Rate limiting
    await this.checkRateLimit();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout
      );
      
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (this.config.retries > 0) {
        console.warn(`Retrying request... ${this.config.retries} attempts left`);
        await new Promise(r => setTimeout(r, 1000)); // backoff
        return this.request(endpoint, options);
      }
      throw error;
    }
  }
  
  private async checkRateLimit() {
    const now = Date.now();
    const window = 60000; // 1 minute
    const limit = this.config.rateLimit;
    
    const requests = this.requestQueue.get('main') || [];
    const recentRequests = requests.filter(time => now - time < window);
    
    if (recentRequests.length >= limit) {
      const oldestRequest = recentRequests[0];
      const waitTime = window - (now - oldestRequest);
      await new Promise(r => setTimeout(r, waitTime));
    }
    
    recentRequests.push(now);
    this.requestQueue.set('main', recentRequests);
  }
}

// Create instances for each API
export const weatherAPI = new APIClient({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  rateLimit: 60,
  timeout: 5000,
  retries: 2
});

export const plantAPI = new APIClient({
  baseURL: 'https://trefle.io/api/v1',
  rateLimit: 100,
  timeout: 10000,
  retries: 3
});
```

---

## 📝 CODE EXAMPLES

### Complete Weather + Plant Recommendation Flow:

```typescript
// services/smartRecommendationEngine.ts

import { weatherAPI, plantAPI } from '@/lib/apiClient';

async function getSmartPlantRecommendations(latitude: number, longitude: number) {
  try {
    // Step 1: Get weather data
    const weather = await weatherAPI.request('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric'
      }
    });
    
    // Step 2: Get location info
    const location = await reverseGeocode(latitude, longitude);
    
    // Step 3: Determine hardiness zone from coordinates
    const hardinessZone = determineHardinessZone(latitude, weather.main.temp);
    
    // Step 4: Get plant recommendations from database
    const recommendedPlants = await plantAPI.request('/plants/search', {
      params: {
        filter: [
          { key: 'hardiness', value: hardinessZone },
          { key: 'watering', value: 'low' },  // example
          { key: 'sunlight', value: 'partial shade' }
        ]
      }
    });
    
    // Step 5: Get plant images
    const plantsWithImages = await Promise.all(
      recommendedPlants.map(async (plant) => ({
        ...plant,
        images: await searchPlantImages(plant.common_name)
      }))
    );
    
    return {
      location: location.city,
      weather: {
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed
      },
      hardinessZone,
      recommendedPlants: plantsWithImages
    };
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    // Fallback to generic recommendations
    return getGenericRecommendations();
  }
}

function determineHardinessZone(latitude: number, avgTemp: number): string {
  // Simple hardiness zone mapping
  const zones = [
    { minLat: 25, maxLat: 30, zone: '9b' },
    { minLat: 30, maxLat: 35, zone: '9a' },
    { minLat: 35, maxLat: 40, zone: '8b' },
    // ... more zones
  ];
  
  const zone = zones.find(z => 
    latitude >= z.minLat && latitude < z.maxLat
  );
  
  return zone?.zone || '8a';
}
```

---

## 💰 COST ANALYSIS

### Monthly Cost Estimate (Free Tier Only):

| Service | Free Limit | Typical Usage | Cost |
|---------|-----------|---------------|------|
| OpenWeatherMap | 1M calls/month | 10K calls | **FREE** |
| Open-Meteo | 10K/day | 5K calls | **FREE** |
| Trefle | 100 requests/day | 50 requests | **FREE** |
| Pexels | 200/hour | 100 requests | **FREE** |
| Nominatim | Unlimited (1/sec) | 1K requests | **FREE** |
| Pl@ntNet | 500/day | 300 requests | **FREE** |
| **TOTAL** | - | - | **$0/month** |

**Optional Paid Services**:
- OpenAI GPT-4 Vision: ~$0.01 per image analysis
- Google Maps: $0.05-0.07 per request (alternative: use Nominatim)

---

## 🎯 RECOMMENDATION PRIORITY

**Start with these (most useful):**
1. ✅ OpenWeatherMap (weather is essential)
2. ✅ Trefle / Pexels (plant data + images)
3. ✅ Nominatim (location handling)
4. ✅ Sunrise-Sunset API (sun calculations for 3D balcony)

**Add next (nice to have):**
5. ⭐ Pl@ntNet (plant identification from photos)
6. ⭐ Unsplash (backup image source)

**Optional (premium features):**
7. 🔮 OpenAI Vision (analyze balcony photos)
8. 🔮 Google Maps (if you need map integration)

---

## ✅ CHECKLIST

- [ ] Sign up for OpenWeatherMap
- [ ] Sign up for Trefle API
- [ ] Sign up for Pexels
- [ ] Create .env.local with all keys
- [ ] Test weather API connection
- [ ] Test plant search endpoint
- [ ] Test image search
- [ ] Implement error handling wrapper
- [ ] Add rate limiting to client
- [ ] Document API usage in code

