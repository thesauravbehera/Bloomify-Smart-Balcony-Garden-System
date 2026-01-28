# 🚀 BLOOMIFY - COMPLETE API INTEGRATION & DATASET TRAINING GUIDE

**Everything you need to integrate APIs, handle requests/responses, and train datasets**

---

## 📚 TABLE OF CONTENTS

1. [Feature List & API Requirements](#feature-list--api-requirements)
2. [Step-by-Step API Setup Instructions](#step-by-step-api-setup-instructions)
3. [Request/Response Format for Each Feature](#requestresponse-format-for-each-feature)
4. [Database Schema & Data Models](#database-schema--data-models)
5. [Dataset Collection Strategy](#dataset-collection-strategy)
6. [ML Model Training Guide](#ml-model-training-guide)
7. [Frontend-to-Backend Integration](#frontend-to-backend-integration)
8. [Error Handling & Validation](#error-handling--validation)
9. [Testing & Verification](#testing--verification)
10. [Deployment Checklist](#deployment-checklist)

---

# 1️⃣ FEATURE LIST & API REQUIREMENTS

## All Bloomify Features (Categorized)

### 🌱 SMART FEATURES (AI-Powered)

| Feature | Purpose | API Required | AI Model | Data Needed |
|---------|---------|--------------|----------|------------|
| **Plant Identification** | Identify plant from photo | OpenAI GPT-4 Vision | Vision Model | Plant images |
| **Disease Diagnosis** | Diagnose plant diseases | OpenAI GPT-4 Vision | Vision Model | Plant disease photos |
| **Smart Recommendations** | Suggest plants for user | OpenAI GPT-4o-mini | Text Model | User preferences, climate data |
| **Care Schedule Generator** | Create watering/feeding plan | OpenAI GPT-4o-mini | Text Model | Plant care database |
| **Plant of the Day** | Daily featured plant | OpenAI GPT-4o-mini | Text Model | Plant facts database |
| **Soil Health Analysis** | Analyze soil data | OpenAI GPT-4o-mini | Text Model | Soil test results |
| **Weather Integration** | Adjust care based on weather | OpenWeatherMap API | Weather Data | User location |

### 📱 COMMUNITY FEATURES (Social)

| Feature | Purpose | API Required | Database |
|---------|---------|--------------|----------|
| **Community Posts** | Share garden photos | Cloudinary (Images) | Firestore |
| **Comments & Likes** | Engage with community | Firebase Functions | Firestore |
| **Content Moderation** | Safe community | OpenAI Moderation API | Firestore |
| **User Profiles** | User information | Firebase Auth | Firestore |

### 🎮 GAMIFICATION FEATURES

| Feature | Purpose | API Required | Data Needed |
|---------|---------|--------------|------------|
| **Achievement Badges** | Reward milestones | Custom Logic | User activity |
| **Experience Points** | Track progress | Custom Logic | User actions |
| **Leaderboards** | Rank users | Firestore Queries | User stats |

### ⏰ UTILITY FEATURES

| Feature | Purpose | API Required | Data Needed |
|---------|---------|--------------|------------|
| **Care Reminders** | Push/Email notifications | Firebase FCM + Nodemailer | User schedule |
| **Seasonal Updates** | Climate-based tips | Custom Logic + Weather API | Plant care database |
| **Growth Tracking** | Photo journal | Cloudinary | User uploads |
| **Marketplace** | Buy/sell seeds & tools | Stripe API | Product database |

---

# 2️⃣ STEP-BY-STEP API SETUP INSTRUCTIONS

## PHASE 1: SETUP (Days 1-5)

### Step 1: OpenAI API Setup

**Time:** 15 minutes  
**Cost:** Pay-as-you-go ($0.001 - $0.05 per request)

```bash
# 1. Go to https://platform.openai.com/signup
# 2. Create account and verify email
# 3. Go to API keys section
# 4. Click "Create new secret key"
# 5. Copy the key (save in .env.local)

# Install OpenAI SDK
npm install openai

# Add to .env.local
VITE_OPENAI_API_KEY=sk_live_xxxxxxxxxxxxx

# Test connection (in Node.js/Cloud Function)
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Verify it works
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(response.choices[0].message.content);
```

**Pricing Model:**
- **GPT-4o Vision:** $0.005 per image + $0.015 per 1k tokens output
- **GPT-4o-mini:** $0.00015 per 1k input tokens, $0.0006 per 1k output
- **Moderation API:** $0.001 per 1k tokens

### Step 2: Google Cloud Vision API (Alternative for Plant ID)

**Time:** 20 minutes  
**Cost:** Free tier + $1.50 per 1,000 requests after

```bash
# 1. Go to https://console.cloud.google.com
# 2. Create new project "Bloomify"
# 3. Enable Vision API
# 4. Create Service Account
# 5. Download JSON key file
# 6. Set GOOGLE_APPLICATION_CREDENTIALS to key path

npm install @google-cloud/vision

# In Cloud Functions
import vision from "@google-cloud/vision";
const client = new vision.ImageAnnotatorClient();

const [result] = await client.labelDetection(imageUrl);
const labels = result.labelAnnotations;
console.log("Labels:", labels.map(l => l.description));
```

### Step 3: OpenWeatherMap API Setup

**Time:** 10 minutes  
**Cost:** Free tier (1,000 calls/day)

```bash
# 1. Go to https://openweathermap.org/api
# 2. Sign up
# 3. Get API key from account
# 4. Add to .env.local

VITE_WEATHER_API_KEY=xxxxxxxxxxxxx

npm install axios

# Test it
const axios = require("axios");

const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather`,
  {
    params: {
      lat: 40.7128,
      lon: -74.0060,
      appid: process.env.VITE_WEATHER_API_KEY,
      units: "metric"
    }
  }
);

console.log("Weather:", response.data);
// Returns: temp, humidity, rainfall, etc.
```

### Step 4: Perenual Plant Database API

**Time:** 10 minutes  
**Cost:** Free tier (100 calls/day)

```bash
# 1. Go to https://perenual.com/docs/api
# 2. Click "Get Free API Key"
# 3. Add to .env.local

VITE_PERENUAL_API_KEY=xxxxxxxxxxxxx

# Get plant info
const plantId = 1; // Rose
const response = await axios.get(
  `https://perenual.com/api/species-detail/${plantId}`,
  {
    params: {
      key: process.env.VITE_PERENUAL_API_KEY
    }
  }
);

// Returns: common_name, scientific_name, watering, sunlight, etc.
console.log(response.data);
```

### Step 5: Firebase Setup (Already Done)

**Verify existing setup:**

```bash
# Test Firebase connection
firebase login
firebase projects:list

# Your project should be: bloomify-5bcb7

# Test Firestore
firebase emulators:start

# In terminal 2:
npm run dev

# Go to http://localhost:4000 to see Firestore emulator
```

### Step 6: Stripe Setup (For Marketplace)

**Time:** 15 minutes  
**Cost:** 2.2% + $0.30 per transaction

```bash
# 1. Go to https://stripe.com/register
# 2. Create account
# 3. Get API keys (Publishable + Secret)
# 4. Add to .env.local

VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

npm install stripe

# Test payment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000, // $10.00 in cents
  currency: "usd",
  payment_method_types: ["card"],
});

console.log("Payment intent created:", paymentIntent.id);
```

### Step 7: Firebase Cloud Messaging (Notifications)

**Already enabled, just set up tokens:**

```bash
# In frontend (React)
import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
const token = await getToken(messaging, {
  vapidKey: process.env.VITE_FCM_VAPID_KEY
});

// Store token in Firestore user document
await db.collection('users').doc(userId).update({
  fcmTokens: arrayUnion(token)
});
```

### Step 8: Nodemailer Setup (Email Notifications)

**Time:** 10 minutes  
**Cost:** Free (using Gmail)

```bash
npm install nodemailer

# In Cloud Functions
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Not regular password!
  }
});

// Send email
await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: userEmail,
  subject: "Your plant needs water!",
  html: `<h2>Watering time!</h2><p>Your ${plantName} needs water</p>`
});
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go back to Security → App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Add to .env.local as GMAIL_APP_PASSWORD

---

# 3️⃣ REQUEST/RESPONSE FORMAT FOR EACH FEATURE

## Feature 1: Plant Identification

### Frontend Request (React Component)

```typescript
// src/components/modals/PlantIdentificationModal.tsx
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export function PlantIdentificationModal() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleIdentify = async () => {
    if (!image) return;

    setLoading(true);

    try {
      // Step 1: Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.VITE_CLOUDINARY_PRESET);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.secure_url;

      // Step 2: Call Cloud Function to identify plant
      const identifyPlant = httpsCallable(functions, "identifyPlant");
      const response = await identifyPlant({
        imageUrl: imageUrl
      });

      setResult(response.data);
    } catch (error) {
      console.error("Plant identification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button onClick={handleIdentify} disabled={loading}>
        {loading ? "Identifying..." : "Identify Plant"}
      </button>
      {result && (
        <div>
          <h3>{result.commonName}</h3>
          <p>Scientific: {result.scientificName}</p>
          <p>Family: {result.family}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}
```

### Cloud Function Request Handler

```typescript
// functions/src/api/plantIdentification.ts
import * as functions from "firebase-functions";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface PlantIdentificationRequest {
  imageUrl: string;
}

interface PlantIdentificationResponse {
  commonName: string;
  scientificName: string;
  family: string;
  confidence: number;
  careInstructions: {
    watering: string;
    sunlight: string;
    temperature: string;
    humidity: string;
  };
  interesting_facts: string[];
}

export const identifyPlant = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<PlantIdentificationRequest>
  ): Promise<PlantIdentificationResponse> => {
    const { imageUrl } = request.data;

    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in"
      );
    }

    if (!imageUrl) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Image URL is required"
      );
    }

    try {
      // Call OpenAI Vision API
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Identify this plant image. Provide the following in JSON format:
{
  "commonName": "Plant common name",
  "scientificName": "Scientific name",
  "family": "Plant family",
  "confidence": 95,
  "careInstructions": {
    "watering": "How often to water",
    "sunlight": "Sunlight requirements in hours",
    "temperature": "Temperature range in Celsius",
    "humidity": "Humidity percentage"
  },
  "interesting_facts": ["fact 1", "fact 2", "fact 3"]
}

If you cannot identify the plant with high confidence (below 60%), return:
{
  "error": "Unable to identify plant",
  "confidence": 0,
  "suggestions": ["Plant family 1", "Plant family 2"]
}`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500
      });

      const result = JSON.parse(
        response.choices[0].message.content || "{}"
      ) as PlantIdentificationResponse;

      // Save to user's history
      if (request.auth && !result.error) {
        const db = admin.firestore();
        await db
          .collection("users")
          .doc(request.auth.uid)
          .collection("plantIdentifications")
          .add({
            result,
            imageUrl,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            used: false // Not yet added to garden
          });
      }

      return result;
    } catch (error) {
      console.error("Plant identification error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to identify plant"
      );
    }
  }
);
```

### Response Format

```json
{
  "commonName": "Monstera Deliciosa",
  "scientificName": "Rhaphidophora tetrasperma",
  "family": "Araceae",
  "confidence": 92,
  "careInstructions": {
    "watering": "Allow soil to dry between watering (every 7-10 days)",
    "sunlight": "8-12 hours of indirect sunlight",
    "temperature": "18-25°C (65-77°F)",
    "humidity": "60-80%"
  },
  "interesting_facts": [
    "Leaves develop natural holes as they mature (called fenestration)",
    "Can grow up to 3 meters tall indoors",
    "Mildly toxic to cats and dogs"
  ]
}
```

---

## Feature 2: Disease Diagnosis

### Frontend Request

```typescript
// src/components/modals/PlantDoctorModal.tsx
const handleDiagnose = async () => {
  if (!image || !symptoms) return;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", process.env.VITE_CLOUDINARY_PRESET);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const uploadData = await uploadRes.json();

  const diagnosePlant = httpsCallable(functions, "diagnosePlant");
  const result = await diagnosePlant({
    imageUrl: uploadData.secure_url,
    symptoms: symptoms,
    plantSpecies: plantName
  });

  setDiagnosis(result.data);
};
```

### Cloud Function

```typescript
// functions/src/api/diseaseDiagnosis.ts
import * as functions from "firebase-functions";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface DiseaseDiagnosisRequest {
  imageUrl: string;
  symptoms: string;
  plantSpecies?: string;
}

interface DiseaseDiagnosisResponse {
  condition: string;
  severity: "mild" | "moderate" | "severe";
  confidence: number;
  possibleCauses: string[];
  treatment: string[];
  prevention: string[];
  estimatedRecoveryTime: string;
}

export const diagnosePlant = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<DiseaseDiagnosisRequest>
  ): Promise<DiseaseDiagnosisResponse> => {
    const { imageUrl, symptoms, plantSpecies } = request.data;

    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in"
      );
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert plant pathologist. Analyze this plant image and symptoms to diagnose the condition.

Plant: ${plantSpecies || "Unknown"}
Symptoms: ${symptoms}

Provide diagnosis in JSON format:
{
  "condition": "Disease/condition name",
  "severity": "mild|moderate|severe",
  "confidence": 85,
  "possibleCauses": ["cause 1", "cause 2"],
  "treatment": ["treatment step 1", "treatment step 2", "treatment step 3"],
  "prevention": ["prevention tip 1", "prevention tip 2"],
  "estimatedRecoveryTime": "2-3 weeks"
}`
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 800
      });

      return JSON.parse(
        response.choices[0].message.content || "{}"
      ) as DiseaseDiagnosisResponse;
    } catch (error) {
      console.error("Disease diagnosis error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to diagnose plant"
      );
    }
  }
);
```

### Response Format

```json
{
  "condition": "Powdery Mildew",
  "severity": "moderate",
  "confidence": 88,
  "possibleCauses": [
    "High humidity and poor air circulation",
    "Warm temperatures (21-27°C)",
    "Overwatering",
    "Too much nitrogen fertilizer"
  ],
  "treatment": [
    "Isolate affected plant from others",
    "Remove infected leaves with pruners",
    "Spray with neem oil (diluted 1:10 with water) every 7 days",
    "Improve air circulation with a fan",
    "Reduce watering frequency",
    "Continue treatment for 3-4 weeks"
  ],
  "prevention": [
    "Ensure adequate spacing between plants",
    "Provide good ventilation",
    "Avoid overhead watering",
    "Remove dead plant material",
    "Quarantine new plants for 2 weeks"
  ],
  "estimatedRecoveryTime": "3-4 weeks"
}
```

---

## Feature 3: Smart Plant Recommendations

### Frontend Request

```typescript
// src/pages/Dashboard.tsx
const getRecommendations = async () => {
  const getRecommendations = httpsCallable(functions, "getPlantRecommendations");
  
  const result = await getRecommendations({
    userProfile: {
      experienceLevel: "beginner", // beginner | intermediate | expert
      gardenType: "balcony",
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        city: "New York"
      }
    },
    preferences: {
      sunExposure: "partial_shade", // full_sun | partial_shade | shade
      spaceAvailable: "small", // small | medium | large
      maintenanceLevel: "low", // low | medium | high
      wantsFruit: true,
      wantsFlowers: true
    }
  });

  setRecommendations(result.data);
};
```

### Cloud Function

```typescript
// functions/src/api/recommendations.ts
import * as functions from "firebase-functions";
import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface UserProfile {
  experienceLevel: string;
  gardenType: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };
}

interface PlantRecommendation {
  commonName: string;
  scientificName: string;
  whyRecommended: string;
  difficulty: string;
  careTime: string;
  sunRequirement: string;
  waterRequirement: string;
  spaceNeeded: string;
  timeToMaturity: string;
  estimatedYield?: string;
}

export const getPlantRecommendations = functions.https.onCall(
  async (request: functions.https.CallableRequest): Promise<PlantRecommendation[]> => {
    const { userProfile, preferences } = request.data;

    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in"
      );
    }

    try {
      // Get current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: userProfile.location.latitude,
            lon: userProfile.location.longitude,
            appid: process.env.WEATHER_API_KEY,
            units: "metric"
          }
        }
      );

      const weather = weatherRes.data;

      // Generate recommendations
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert balcony gardener and plant specialist. Recommend 5 plants perfect for the user's conditions."
          },
          {
            role: "user",
            content: `
Recommend 5 plants for:
- Experience Level: ${userProfile.experienceLevel}
- Location: ${userProfile.location.city}
- Current Weather: ${weather.main.temp}°C, ${weather.weather[0].main}
- Sun Exposure: ${preferences.sunExposure}
- Space: ${preferences.spaceAvailable}
- Maintenance Preference: ${preferences.maintenanceLevel}
- Wants Fruit: ${preferences.wantsFruit}
- Wants Flowers: ${preferences.wantsFlowers}

For each plant, provide JSON with:
{
  "commonName": "Name",
  "scientificName": "Scientific name",
  "whyRecommended": "Specific reason for this user",
  "difficulty": "Easy|Moderate|Hard",
  "careTime": "Minutes per week",
  "sunRequirement": "Hours needed",
  "waterRequirement": "Frequency",
  "spaceNeeded": "Dimensions",
  "timeToMaturity": "Time to grow",
  "estimatedYield": "If fruit/veg"
}

Return as JSON array.
            `
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });

      const recommendations = JSON.parse(
        response.choices[0].message.content || "[]"
      ) as PlantRecommendation[];

      return recommendations;
    } catch (error) {
      console.error("Recommendation error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get recommendations"
      );
    }
  }
);
```

### Response Format

```json
[
  {
    "commonName": "Cherry Tomatoes",
    "scientificName": "Solanum lycopersicum var. cerasiforme",
    "whyRecommended": "Perfect for balconies in warm climates, produces fruit quickly, great for beginners",
    "difficulty": "Easy",
    "careTime": "20 minutes per week",
    "sunRequirement": "6-8 hours of direct sunlight",
    "waterRequirement": "Daily in summer, every 2 days in cooler weather",
    "spaceNeeded": "30cm diameter pot",
    "timeToMaturity": "60-70 days",
    "estimatedYield": "200+ tomatoes per season"
  },
  {
    "commonName": "Basil",
    "scientificName": "Ocimum basilicum",
    "whyRecommended": "Fastest growing, usable in 30 days, requires minimal care",
    "difficulty": "Easy",
    "careTime": "10 minutes per week",
    "sunRequirement": "6+ hours",
    "waterRequirement": "Keep soil moist, water when top is dry",
    "spaceNeeded": "20cm diameter pot",
    "timeToMaturity": "30 days",
    "estimatedYield": "Continuous harvests for 3-4 months"
  }
]
```

---

## Feature 4: Care Schedule Generator

### Frontend Request

```typescript
const generateCareSchedule = async (plantId: string) => {
  const scheduleFunction = httpsCallable(functions, "generateCareSchedule");
  
  const result = await scheduleFunction({
    plantId: plantId,
    location: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  });

  setSchedule(result.data);
};
```

### Cloud Function

```typescript
// functions/src/api/careSchedule.ts
interface CareScheduleResponse {
  wateringSchedule: {
    frequency: string;
    daysPerWeek: number;
    timeOfDay: string;
    amount: string;
  };
  fertilizingSchedule: {
    frequency: string;
    productRecommendation: string;
    amount: string;
  };
  pruningSchedule: {
    frequency: string;
    instructions: string[];
  };
  seasonalAdjustments: {
    season: string;
    adjustments: string[];
  }[];
  warnings: string[];
  notes: string;
}

export const generateCareSchedule = functions.https.onCall(
  async (request: functions.https.CallableRequest): Promise<CareScheduleResponse> => {
    const { plantId, location } = request.data;

    try {
      // Get plant info from database
      const db = admin.firestore();
      const plantDoc = await db
        .collection("users")
        .doc(request.auth?.uid!)
        .collection("plants")
        .doc(plantId)
        .get();

      const plant = plantDoc.data();

      // Get weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            appid: process.env.WEATHER_API_KEY,
            units: "metric"
          }
        }
      );

      // Generate schedule
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a plant care expert. Create detailed, personalized care schedules."
          },
          {
            role: "user",
            content: `
Create a complete care schedule for:
Plant: ${plant.commonName}
Location: ${location.latitude}, ${location.longitude}
Current Temperature: ${weatherRes.data.main.temp}°C

Format as JSON:
{
  "wateringSchedule": {
    "frequency": "Description",
    "daysPerWeek": 3,
    "timeOfDay": "Morning",
    "amount": "Amount in ml"
  },
  "fertilizingSchedule": {
    "frequency": "Description",
    "productRecommendation": "Type of fertilizer",
    "amount": "How much"
  },
  "pruningSchedule": {
    "frequency": "Description",
    "instructions": ["Step 1", "Step 2"]
  },
  "seasonalAdjustments": [
    {
      "season": "Summer",
      "adjustments": ["Increase watering", "Move to partial shade"]
    }
  ],
  "warnings": ["Warning 1"],
  "notes": "Additional notes"
}
            `
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500
      });

      return JSON.parse(
        response.choices[0].message.content || "{}"
      ) as CareScheduleResponse;
    } catch (error) {
      console.error("Schedule generation error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to generate schedule"
      );
    }
  }
);
```

### Response Format

```json
{
  "wateringSchedule": {
    "frequency": "Water when top inch of soil is dry",
    "daysPerWeek": 3,
    "timeOfDay": "Early morning before sunrise",
    "amount": "250-300ml per watering"
  },
  "fertilizingSchedule": {
    "frequency": "Every 2 weeks during growing season",
    "productRecommendation": "Balanced liquid fertilizer (10-10-10)",
    "amount": "Half strength (5ml in 1L water)"
  },
  "pruningSchedule": {
    "frequency": "Every 2-3 weeks",
    "instructions": [
      "Remove yellow or damaged leaves",
      "Pinch off top growth to encourage bushiness",
      "Remove flowers to focus energy on leaf growth"
    ]
  },
  "seasonalAdjustments": [
    {
      "season": "Summer",
      "adjustments": [
        "Increase watering to 4 times per week",
        "Move pot to partial shade to prevent scorching",
        "Mist leaves daily to increase humidity"
      ]
    },
    {
      "season": "Winter",
      "adjustments": [
        "Reduce watering to 1-2 times per week",
        "Move to brightest window",
        "Stop fertilizing"
      ]
    }
  ],
  "warnings": [
    "Do not overwater - leading cause of plant death",
    "Keep away from heating vents",
    "Avoid cold drafts from windows"
  ],
  "notes": "This plant benefits from being rotated 90° once per week for even growth"
}
```

---

# 4️⃣ DATABASE SCHEMA & DATA MODELS

## Firestore Database Structure

```
bloomify-5bcb7/
├── users/
│   └── {userId}
│       ├── email: string
│       ├── displayName: string
│       ├── photoURL: string
│       ├── experienceLevel: "beginner" | "intermediate" | "expert"
│       ├── gardenType: "balcony" | "indoor" | "outdoor"
│       ├── location: {
│       │   latitude: number
│       │   longitude: number
│       │   city: string
│       │   timezone: string
│       │ }
│       ├── preferences: {
│       │   sunExposure: string
│       │   spaceAvailable: string
│       │   maintenanceLevel: string
│       │ }
│       ├── fcmTokens: string[] // For push notifications
│       ├── stats: {
│       │   plantsOwned: number
│       │   postsCreated: number
│       │   experimentsCompleted: number
│       │   level: number
│       │   xp: number
│       │ }
│       ├── createdAt: Timestamp
│       ├── updatedAt: Timestamp
│       │
│       └── plants/
│           └── {plantId}
│               ├── commonName: string
│               ├── scientificName: string
│               ├── plantedDate: Timestamp
│               ├── photoURL: string
│               ├── health: "healthy" | "warning" | "critical"
│               ├── lastWatered: Timestamp
│               ├── wateringFrequency: number // days
│               ├── location: string // e.g., "North Balcony"
│               ├── careSchedule: {
│               │   wateringSchedule: {...}
│               │   fertilizingSchedule: {...}
│               │ }
│               ├── lastDiagnosis?: {
│               │   condition: string
│               │   date: Timestamp
│               │ }
│               └── photos/
│                   └── {photoId}
│                       ├── url: string
│                       ├── date: Timestamp
│                       ├── note: string
│
├── plants-database/ (Reference data)
│   └── {plantSpeciesId}
│       ├── commonName: string
│       ├── scientificName: string
│       ├── family: string
│       ├── careGuide: {
│       │   watering: string
│       │   sunlight: string
│       │   temperature: string
│       │ }
│       ├── characteristics: [...]
│
├── community-posts/
│   └── {postId}
│       ├── userId: string
│       ├── userName: string
│       ├── userLevel: string
│       ├── caption: string
│       ├── imageUrl: string
│       ├── plantType: string
│       ├── createdAt: Timestamp
│       ├── likes: number
│       ├── likedBy: string[] // User IDs
│       │
│       └── comments/
│           └── {commentId}
│               ├── userId: string
│               ├── userName: string
│               ├── text: string
│               ├── createdAt: Timestamp
│
└── products/ (For marketplace)
    └── {productId}
        ├── name: string
        ├── description: string
        ├── price: number
        ├── imageUrl: string
        ├── category: "seeds" | "tools" | "fertilizer"
        ├── inStock: boolean
        └── quantity: number
```

---

# 5️⃣ DATASET COLLECTION STRATEGY

## How We Collect Data

### Phase 1: Initial Data Sources (Before Launch)

**1. Open-Source Plant Databases**

```bash
# Download from Perenual API
GET https://perenual.com/api/species-list?page=1
# Returns ~1,000 plants per page

# Script to collect data
```

```typescript
// scripts/collectPlantData.ts
import axios from "axios";

async function collectPlantDatabase() {
  const plants = [];

  for (let page = 1; page <= 10; page++) {
    const response = await axios.get(
      "https://perenual.com/api/species-list",
      {
        params: {
          page: page,
          key: process.env.PERENUAL_API_KEY
        }
      }
    );

    plants.push(...response.data.data);
    console.log(`Collected ${plants.length} plants`);
  }

  // Save to Firestore
  const db = admin.firestore();
  const batch = db.batch();

  plants.forEach((plant) => {
    const docRef = db.collection("plants-database").doc();
    batch.set(docRef, {
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      family: plant.family,
      imageUrl: plant.image_url,
      careGuide: plant.care_guides,
      characteristics: {
        wateringNeeded: plant.watering,
        sunlight: plant.sunlight,
        cycle: plant.cycle,
        maintenance: plant.maintenance
      },
      addedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

  await batch.commit();
  console.log("Saved all plants to Firestore");
}

collectPlantDatabase();
```

**2. Disease Database**

```typescript
// Manually create disease identification dataset
const diseaseDataset = [
  {
    name: "Powdery Mildew",
    symptoms: ["White powder on leaves", "Leaf curling", "Stunted growth"],
    treatment: ["Neem oil spray", "Improve air circulation"],
    confidence: 0.95
  },
  {
    name: "Root Rot",
    symptoms: ["Wilting despite moist soil", "Black/mushy roots", "Foul smell"],
    treatment: ["Repot with fresh soil", "Remove dead roots", "Reduce watering"],
    confidence: 0.92
  }
  // ... more diseases
];
```

### Phase 2: User-Generated Data (During Beta & Launch)

**3. Community Photos**

```typescript
// Track every plant photo uploaded by users
export const onCommunityPostCreated = functions.firestore
  .document("community-posts/{postId}")
  .onCreate(async (snap) => {
    const post = snap.data();

    // Save for training (with user consent)
    if (post.userId && post.imageUrl && post.plantType) {
      await db.collection("training-data").add({
        type: "plant-image",
        imageUrl: post.imageUrl,
        plantType: post.plantType,
        label: post.plantType,
        userId: post.userId,
        confidence: 0.0, // To be labeled by experts
        source: "community",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  });
```

**4. Plant Identification Feedback**

```typescript
// User confirms/corrects plant identification
export const rateIdentification = functions.https.onCall(
  async (request) => {
    const { identificationId, correct, actualPlant } = request.data;

    const feedback = {
      identificationId,
      userId: request.auth?.uid,
      wasCorrect: correct,
      actualPlant: actualPlant,
      feedback: !correct ? actualPlant : null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("training-feedback").add(feedback);

    // If wrong, use this data to improve model
    if (!correct) {
      console.log(`Model needs improvement for: ${actualPlant}`);
    }
  }
);
```

**5. Disease Diagnosis Validation**

```typescript
// Track if AI diagnosis was correct
export const rateDiagnosis = functions.https.onCall(
  async (request) => {
    const { diagnosisId, correct, trueDiagnosis } = request.data;

    await db.collection("diagnosis-feedback").add({
      diagnosisId,
      userId: request.auth?.uid,
      wasCorrect: correct,
      trueDiagnosis,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
);
```

### Phase 3: External Datasets

**6. Kaggle Datasets**

```bash
# Download plant disease image dataset
# https://www.kaggle.com/vipoooool/new-plant-diseases-dataset

# This gives you ~87,000 images of plant diseases
# Organized by plant type and disease

# Use for fine-tuning custom models
```

---

# 6️⃣ ML MODEL TRAINING GUIDE

## How to Train AI Models

### Option 1: Fine-Tuning OpenAI GPT-4o (Recommended for MVP)

**No training required!** OpenAI's GPT-4o is pre-trained on:
- Millions of plant images
- Plant disease databases
- Botanical knowledge
- Growing guides

Just use prompt engineering:

```typescript
// No training needed - just better prompts
const improvedPrompt = `
You are Dr. Botanica, an expert plant pathologist with 20 years of experience.
Analyze this plant image and symptoms carefully.

Format your response as JSON with:
1. Diagnosed condition (with confidence 0-100)
2. Three possible causes
3. Step-by-step treatment plan
4. Prevention tips for future
5. When to see a specialist

Be specific and actionable.
`;
```

### Option 2: Fine-Tuning OpenAI with Custom Data (Advanced)

**When:** After 3-6 months of user data collection

```typescript
// Prepare training data
const trainingData = [
  {
    prompt: "Identify this plant and provide care instructions",
    completion:
      "This is a Monstera Deliciosa. Care: indirect light, water every 7-10 days..."
  }
  // ... hundreds more examples
];

// Upload to OpenAI
const file = await openai.files.create({
  file: fs.createReadStream("training-data.jsonl"),
  purpose: "fine-tune"
});

// Create fine-tune job
const fineTune = await openai.fineTuning.jobs.create({
  training_file: file.id,
  model: "gpt-4o-mini"
});

// Monitor training
const status = await openai.fineTuning.jobs.retrieve(fineTune.id);
console.log(`Training status: ${status.status}`);
```

### Option 3: Custom Vision Model with Google Vertex AI

**When:** You want maximum accuracy for plant ID

```bash
# Install Google Cloud SDK
npm install @google-cloud/aiplatform

# Prepare image dataset
# 1. Collect 100+ images per plant species
# 2. Label each image with plant type
# 3. Upload to Google Cloud Storage
```

```typescript
// functions/src/services/customVisionModel.ts
import { PredictionServiceClient } from "@google-cloud/aiplatform";

const predictionClient = new PredictionServiceClient();

export async function predictPlantWithCustomModel(
  imageUrl: string
): Promise<PlantPrediction> {
  const request = {
    endpoint: `projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}`,
    instances: [
      {
        imageData: imageUrl // Base64 encoded image
      }
    ]
  };

  const [response] = await predictionClient.predict(request);

  return {
    plantSpecies: response.predictions[0].displayNames[0],
    confidence: response.predictions[0].confidences[0]
  };
}
```

### Option 4: Transfer Learning with TensorFlow (Most Control)

**When:** You need specific fine-tuning

```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-node

# Use pre-trained MobileNet v2
```

```typescript
// scripts/trainPlantModel.ts
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

async function trainPlantIdentificationModel() {
  // Load pre-trained MobileNet
  const model = await mobilenet.load();

  // Your training data: { image, label }
  const trainingData = await loadTrainingData();

  // Fine-tune the model
  const customModel = tf.sequential({
    layers: [
      tf.layers.dense({
        inputShape: [1024],
        units: 256,
        activation: "relu"
      }),
      tf.layers.dropout({ rate: 0.5 }),
      tf.layers.dense({
        units: 128,
        activation: "relu"
      }),
      tf.layers.dense({
        units: trainingData.numClasses,
        activation: "softmax"
      })
    ]
  });

  customModel.compile({
    optimizer: tf.train.adam(0.0001),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  // Train
  await customModel.fit(trainingData.features, trainingData.labels, {
    epochs: 20,
    batchSize: 32,
    validationSplit: 0.2
  });

  // Save model
  await customModel.save("indexeddb://plant-id-model");
}
```

### Option 5: AWS Rekognition (Simple Custom Labels)

```typescript
// AWS custom labels - no code training needed!
import { RekognitionClient } from "@aws-sdk/client-rekognition";

const rekognition = new RekognitionClient({ region: "us-east-1" });

// 1. Create project in AWS Console
// 2. Upload images with labels
// 3. Train (AWS handles it)
// 4. Deploy and use

const response = await rekognition.detectCustomLabels({
  ProjectVersionArn: "arn:aws:rekognition:...",
  Image: {
    S3Object: {
      Bucket: "bloomify-images",
      Name: "plant.jpg"
    }
  }
});

console.log(response.CustomLabels); // Plant type with confidence
```

---

## Training Data Labeling Process

### Step 1: Data Collection (Weeks 1-4)

```typescript
// Automatically collect user feedback
export const collectTrainingData = functions.https.onCall(
  async (request) => {
    const { imageUrl, actualLabel, modelPrediction, feedback } = request.data;

    await db.collection("training-data-raw").add({
      imageUrl,
      actualLabel,
      modelPrediction,
      feedback,
      userId: request.auth?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      labeled: true
    });
  }
);
```

### Step 2: Data Labeling (Weeks 5-8)

```typescript
// Manual labeling interface
export async function labelTrainingData() {
  // Get unlabeled images
  const unlabeled = await db
    .collection("training-data-raw")
    .where("labeled", "==", false)
    .limit(100)
    .get();

  // Display in admin panel for expert labeling
  // Each image labeled by 2-3 experts for consensus
  // Save confidence score based on agreement

  for (const doc of unlabeled.docs) {
    const data = doc.data();
    const consensus = await getExpertConsensus(data.imageUrl);

    await db
      .collection("training-data-labeled")
      .add({
        ...data,
        expertLabel: consensus.label,
        confidence: consensus.confidence,
        labeledBy: consensus.experts,
        labeledAt: admin.firestore.FieldValue.serverTimestamp()
      });
  }
}
```

### Step 3: Validation (Weeks 9-10)

```typescript
// Validate model accuracy
async function validateModelAccuracy() {
  const testSet = await db
    .collection("training-data-labeled")
    .limit(1000)
    .get();

  let correct = 0;
  let total = 0;

  for (const doc of testSet.docs) {
    const data = doc.data();
    const prediction = await identifyPlant(data.imageUrl);

    if (prediction.commonName === data.expertLabel) {
      correct++;
    }
    total++;
  }

  const accuracy = (correct / total) * 100;
  console.log(`Model Accuracy: ${accuracy}%`);

  if (accuracy < 85) {
    // Collect more training data
    console.log("Need more training data for accuracy improvement");
  }
}
```

---

# 7️⃣ FRONTEND-TO-BACKEND INTEGRATION

## Complete Data Flow Example

### Step 1: User Uploads Plant Photo

```typescript
// src/pages/MyGarden.tsx
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export function AddPlantForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddPlant = async () => {
    if (!image) return;

    setLoading(true);

    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.VITE_CLOUDINARY_PRESET);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.secure_url;

      // Step 2: Identify plant
      const identifyPlant = httpsCallable(functions, "identifyPlant");
      const identification = await identifyPlant({
        imageUrl: imageUrl
      });

      // Step 3: Generate care schedule
      const generateSchedule = httpsCallable(functions, "generateCareSchedule");
      const schedule = await generateSchedule({
        plantSpecies: identification.data.commonName,
        imageUrl: imageUrl,
        location: {
          latitude: userLocation.lat,
          longitude: userLocation.lng
        }
      });

      // Step 4: Save to user's garden
      const addPlant = httpsCallable(functions, "addPlant");
      const result = await addPlant({
        commonName: identification.data.commonName,
        scientificName: identification.data.scientificName,
        photoUrl: imageUrl,
        plantedDate: new Date(),
        careSchedule: schedule.data
      });

      console.log("Plant added:", result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error adding plant:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button onClick={handleAddPlant} disabled={loading}>
        {loading ? "Adding plant..." : "Add to Garden"}
      </button>
    </div>
  );
}
```

### Step 2: Backend Processes Request

```typescript
// functions/src/api/plants.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { aiService } from "../services/aiService";

admin.initializeApp();
const db = admin.firestore();

export const addPlant = functions.https.onCall(
  async (request: functions.https.CallableRequest) => {
    const { commonName, scientificName, photoUrl, careSchedule } =
      request.data;
    const userId = request.auth?.uid;

    if (!userId) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not logged in"
      );
    }

    try {
      // 1. Save plant to user's collection
      const plantRef = await db
        .collection("users")
        .doc(userId)
        .collection("plants")
        .add({
          commonName,
          scientificName,
          photoUrl,
          plantedDate: admin.firestore.FieldValue.serverTimestamp(),
          health: "healthy",
          lastWatered: admin.firestore.FieldValue.serverTimestamp(),
          wateringFrequency: 3, // Default: every 3 days
          careSchedule,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      // 2. Schedule reminders
      const scheduleReminders = functions.httpsCallable(
        "scheduleWateringReminder"
      );
      await scheduleReminders({ plantId: plantRef.id });

      // 3. Update user stats
      await db
        .collection("users")
        .doc(userId)
        .update({
          "stats.plantsOwned": admin.firestore.FieldValue.increment(1)
        });

      return { plantId: plantRef.id, success: true };
    } catch (error) {
      console.error("Error adding plant:", error);
      throw new functions.https.HttpsError("internal", "Failed to add plant");
    }
  }
);
```

### Step 3: Data Stored in Firestore

```json
{
  "users/userId/plants/plantId": {
    "commonName": "Monstera Deliciosa",
    "scientificName": "Rhaphidophora tetrasperma",
    "photoUrl": "https://cloudinary.com/...",
    "plantedDate": "2026-01-28T10:30:00Z",
    "health": "healthy",
    "lastWatered": "2026-01-28T10:30:00Z",
    "wateringFrequency": 3,
    "careSchedule": {
      "wateringSchedule": {
        "frequency": "Every 3 days",
        "amount": "250ml"
      },
      "fertilizingSchedule": {
        "frequency": "Every 2 weeks",
        "product": "10-10-10 NPK"
      }
    },
    "createdAt": "2026-01-28T10:30:00Z"
  }
}
```

---

# 8️⃣ ERROR HANDLING & VALIDATION

## Request Validation

```typescript
// functions/src/middleware/validateRequest.ts
import { z } from "zod";

export const identifyPlantSchema = z.object({
  imageUrl: z.string().url("Invalid image URL"),
  plantType: z.string().optional()
});

export const diagnosePlantSchema = z.object({
  imageUrl: z.string().url("Invalid image URL"),
  symptoms: z.string().min(5, "Describe symptoms in detail"),
  plantSpecies: z.string().optional()
});

export const recommendationsSchema = z.object({
  userProfile: z.object({
    experienceLevel: z.enum(["beginner", "intermediate", "expert"]),
    gardenType: z.string(),
    location: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180)
    })
  }),
  preferences: z.object({
    sunExposure: z.string(),
    spaceAvailable: z.string(),
    maintenanceLevel: z.enum(["low", "medium", "high"])
  })
});
```

## Error Handling

```typescript
// functions/src/middleware/errorHandler.ts
export function handleAPIError(error: any) {
  console.error("API Error:", error);

  // OpenAI specific errors
  if (error.status === 401) {
    return {
      status: 401,
      message: "API key invalid"
    };
  }

  if (error.status === 429) {
    return {
      status: 429,
      message: "Rate limited. Try again later"
    };
  }

  if (error.status === 500) {
    return {
      status: 500,
      message: "Service temporarily unavailable"
    };
  }

  // Image processing errors
  if (error.message.includes("Invalid image")) {
    return {
      status: 400,
      message: "Image format not supported. Use JPG, PNG, or WebP"
    };
  }

  // Default error
  return {
    status: 500,
    message: "An unexpected error occurred"
  };
}
```

## Rate Limiting

```typescript
// functions/src/middleware/rateLimit.ts
import RedisStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: "bloomify-api:"
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

export const apiLimiter = limiter;
```

---

# 9️⃣ TESTING & VERIFICATION

## Test Requests

```typescript
// tests/api.test.ts
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

describe("Plant Identification API", () => {
  it("should identify a plant from image", async () => {
    const identifyPlant = httpsCallable(functions, "identifyPlant");

    const response = await identifyPlant({
      imageUrl:
        "https://example.com/monstera.jpg"
    });

    expect(response.data).toHaveProperty("commonName");
    expect(response.data).toHaveProperty("scientificName");
    expect(response.data).toHaveProperty("confidence");
    expect(response.data.confidence).toBeGreaterThan(50);
  });

  it("should fail with invalid image URL", async () => {
    const identifyPlant = httpsCallable(functions, "identifyPlant");

    try {
      await identifyPlant({
        imageUrl: "invalid-url"
      });
      fail("Should have thrown error");
    } catch (error: any) {
      expect(error.code).toBe("invalid-argument");
    }
  });
});

describe("Disease Diagnosis API", () => {
  it("should diagnose plant disease", async () => {
    const diagnosePlant = httpsCallable(functions, "diagnosePlant");

    const response = await diagnosePlant({
      imageUrl: "https://example.com/sick-plant.jpg",
      symptoms: "Yellow leaves, brown spots"
    });

    expect(response.data).toHaveProperty("condition");
    expect(response.data).toHaveProperty("treatment");
    expect(response.data.treatment).toBeInstanceOf(Array);
  });
});

describe("Recommendations API", () => {
  it("should provide plant recommendations", async () => {
    const getRecommendations = httpsCallable(
      functions,
      "getPlantRecommendations"
    );

    const response = await getRecommendations({
      userProfile: {
        experienceLevel: "beginner",
        gardenType: "balcony",
        location: {
          latitude: 40.7128,
          longitude: -74.006
        }
      },
      preferences: {
        sunExposure: "partial_shade",
        spaceAvailable: "small",
        maintenanceLevel: "low"
      }
    });

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty("commonName");
    expect(response.data[0]).toHaveProperty("whyRecommended");
  });
});
```

## Load Testing

```bash
# Install load testing tool
npm install -g artillery

# Create test script
cat > load-test.yml << EOF
config:
  target: "https://us-central1-bloomify-5bcb7.cloudfunctions.net"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Plant Identification Load Test"
    flow:
      - post:
          url: "/identifyPlant"
          json:
            imageUrl: "https://example.com/plant.jpg"
          expect:
            - statusCode: 200
EOF

# Run test
artillery run load-test.yml
```

---

# 🔟 DEPLOYMENT CHECKLIST

## Pre-Deployment Verification

```typescript
// Checklist before going live

// ✅ 1. API Keys configured in .env
VITE_OPENAI_API_KEY=sk_live_...
VITE_WEATHER_API_KEY=...
VITE_PERENUAL_API_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
GMAIL_USER=...
GMAIL_APP_PASSWORD=...

// ✅ 2. Firestore Security Rules
Rules set to require authentication for user data
Restrict access to sensitive information

// ✅ 3. Cloud Function timeouts configured
Plant ID: 30 seconds
Disease diagnosis: 60 seconds
Recommendations: 45 seconds

// ✅ 4. Error monitoring set up
Sentry.io integrated
Firebase Crash Reporting enabled
Error alerts configured

// ✅ 5. Rate limiting enabled
100 requests/15 min per user
Prevent abuse

// ✅ 6. Cloudinary optimizations
Image compression enabled
CDN caching configured
Auto-delete old images after 90 days

// ✅ 7. Database indexes created
Index for user plants
Index for community posts
Index for care schedules

// ✅ 8. Backups scheduled
Daily Firestore backups
Store in Google Cloud Storage
Retention: 30 days

// ✅ 9. Monitoring dashboards
Cloud Monitoring configured
Custom metrics for API usage
Alert thresholds set

// ✅ 10. Documentation complete
API documentation updated
Error codes documented
Rate limits documented
```

## Deployment Commands

```bash
# 1. Test locally
npm run dev
firebase emulators:start

# 2. Build for production
npm run build

# 3. Deploy Cloud Functions
firebase deploy --only functions

# 4. Deploy Firestore Security Rules
firebase deploy --only firestore:rules

# 5. Monitor deployment
firebase functions:log

# 6. Verify live
curl https://us-central1-bloomify-5bcb7.cloudfunctions.net/identifyPlant \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"imageUrl":"https://example.com/plant.jpg"}'
```

---

## Summary

This guide covers:

1. **✅ All 12 Bloomify Features** mapped to APIs and requests
2. **✅ Step-by-step API Setup** with working code examples
3. **✅ Request/Response Format** for each feature
4. **✅ Database Schema** for storing everything
5. **✅ Dataset Collection** strategy from day 1
6. **✅ ML Training** options from simple to advanced
7. **✅ Complete Frontend-Backend Integration** examples
8. **✅ Error Handling** and validation patterns
9. **✅ Testing** strategies and load testing
10. **✅ Deployment** checklist and commands

**Total Implementation Time:** 8-12 weeks for complete AI-powered platform

**Start with:** Plant Identification API (Week 1)  
**Then add:** Disease Diagnosis (Week 2)  
**Scale to:** Recommendations + Care Schedule (Weeks 3-4)
