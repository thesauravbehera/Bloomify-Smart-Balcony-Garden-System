import type { BalconyDimensions } from '../components/BalconyGeometry/BalconyGeometryAnalyzer';

// Plant Profile Interface
export interface PlantProfile {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'flowering' | 'foliage' | 'herb' | 'vegetable' | 'succulent' | 'vine' | 'shrub';
  
  // Space requirements
  spaceRequirements: {
    minArea: number;      // m² of floor space
    maxHeight: number;    // max plant height (m)
    spreadWidth: number;  // typical width (m)
    minPotSize: number;   // liters
  };
  
  // Light requirements
  sunlight: {
    minHours: number;     // minimum peak sun hours needed
    maxHours: number;     // maximum before damage
    type: 'fullSun' | 'partialShade' | 'fullShade';
    bestOrientation?: ('south' | 'east' | 'west' | 'north')[];
  };
  
  // Climate compatibility
  climate: {
    minTemp: number;      // celsius
    maxTemp: number;      // celsius
    humidityRange: [number, number]; // min-max %
    droughtTolerant: boolean;
    windTolerant: boolean;
  };
  
  // Growth characteristics
  growth: {
    matureHeight: number;
    matureWidth: number;
    growthRate: 'slow' | 'medium' | 'fast';
    bloomSeason?: string;
    bloomColor?: string[];
  };
  
  // Container suitability
  containerSuitability: {
    suitable: boolean;
    minPotSize: number;   // liters
    needsStaking: boolean;
    spreading: boolean;
  };
  
  // Care difficulty
  careLevel: 'easy' | 'moderate' | 'challenging';
  waterNeeds: 'low' | 'moderate' | 'high';
  soilType: 'well-draining' | 'moist' | 'acidic' | 'sandy';
}

export interface ScoredPlantRecommendation {
  plant: PlantProfile;
  overallScore: number;      // 0-100
  spaceScore: number;
  sunScore: number;
  climateScore: number;
  reasoning: string;
  warnings: string[];
  tips: string[];
}

// Sample plant database (can be expanded or linked to external API)
const PLANT_DATABASE: PlantProfile[] = [
  {
    id: 'tomato-cherry',
    commonName: 'Cherry Tomato',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    category: 'vegetable',
    spaceRequirements: {
      minArea: 0.5,
      maxHeight: 1.5,
      spreadWidth: 0.6,
      minPotSize: 15
    },
    sunlight: {
      minHours: 6,
      maxHours: 12,
      type: 'fullSun',
      bestOrientation: ['south', 'southwest', 'west']
    },
    climate: {
      minTemp: 15,
      maxTemp: 32,
      humidityRange: [40, 70],
      droughtTolerant: false,
      windTolerant: false
    },
    growth: {
      matureHeight: 1.2,
      matureWidth: 0.6,
      growthRate: 'fast',
      bloomSeason: 'summer',
      bloomColor: ['yellow', 'red']
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 15,
      needsStaking: true,
      spreading: false
    },
    careLevel: 'moderate',
    waterNeeds: 'high',
    soilType: 'well-draining'
  },
  {
    id: 'basil',
    commonName: 'Basil',
    scientificName: 'Ocimum basilicum',
    category: 'herb',
    spaceRequirements: {
      minArea: 0.2,
      maxHeight: 0.6,
      spreadWidth: 0.4,
      minPotSize: 5
    },
    sunlight: {
      minHours: 6,
      maxHours: 10,
      type: 'fullSun',
      bestOrientation: ['south', 'east', 'west']
    },
    climate: {
      minTemp: 10,
      maxTemp: 28,
      humidityRange: [40, 60],
      droughtTolerant: false,
      windTolerant: true
    },
    growth: {
      matureHeight: 0.5,
      matureWidth: 0.4,
      growthRate: 'fast'
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 5,
      needsStaking: false,
      spreading: true
    },
    careLevel: 'easy',
    waterNeeds: 'moderate',
    soilType: 'well-draining'
  },
  {
    id: 'petunias',
    commonName: 'Petunias',
    scientificName: 'Petunia hybrida',
    category: 'flowering',
    spaceRequirements: {
      minArea: 0.3,
      maxHeight: 0.8,
      spreadWidth: 0.5,
      minPotSize: 8
    },
    sunlight: {
      minHours: 5,
      maxHours: 12,
      type: 'fullSun',
      bestOrientation: ['south', 'west', 'east']
    },
    climate: {
      minTemp: 4,
      maxTemp: 30,
      humidityRange: [30, 70],
      droughtTolerant: true,
      windTolerant: true
    },
    growth: {
      matureHeight: 0.6,
      matureWidth: 0.5,
      growthRate: 'fast',
      bloomSeason: 'spring-fall',
      bloomColor: ['pink', 'purple', 'white', 'red']
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 8,
      needsStaking: false,
      spreading: true
    },
    careLevel: 'easy',
    waterNeeds: 'moderate',
    soilType: 'well-draining'
  },
  {
    id: 'mint',
    commonName: 'Mint',
    scientificName: 'Mentha spp.',
    category: 'herb',
    spaceRequirements: {
      minArea: 0.2,
      maxHeight: 0.8,
      spreadWidth: 0.5,
      minPotSize: 6
    },
    sunlight: {
      minHours: 3,
      maxHours: 10,
      type: 'partialShade',
      bestOrientation: ['east', 'north']
    },
    climate: {
      minTemp: -10,
      maxTemp: 28,
      humidityRange: [40, 80],
      droughtTolerant: true,
      windTolerant: true
    },
    growth: {
      matureHeight: 0.6,
      matureWidth: 0.5,
      growthRate: 'fast'
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 6,
      needsStaking: false,
      spreading: true
    },
    careLevel: 'easy',
    waterNeeds: 'moderate',
    soilType: 'moist'
  },
  {
    id: 'hostas',
    commonName: 'Hostas',
    scientificName: 'Hosta spp.',
    category: 'foliage',
    spaceRequirements: {
      minArea: 0.4,
      maxHeight: 1.0,
      spreadWidth: 0.8,
      minPotSize: 12
    },
    sunlight: {
      minHours: 1,
      maxHours: 4,
      type: 'fullShade',
      bestOrientation: ['north']
    },
    climate: {
      minTemp: -30,
      maxTemp: 25,
      humidityRange: [50, 80],
      droughtTolerant: false,
      windTolerant: true
    },
    growth: {
      matureHeight: 0.8,
      matureWidth: 0.8,
      growthRate: 'slow',
      bloomSeason: 'summer',
      bloomColor: ['purple', 'white']
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 12,
      needsStaking: false,
      spreading: true
    },
    careLevel: 'easy',
    waterNeeds: 'high',
    soilType: 'moist'
  },
  {
    id: 'succulents',
    commonName: 'Succulents (Jade, Aloe)',
    scientificName: 'Crassulacean spp.',
    category: 'succulent',
    spaceRequirements: {
      minArea: 0.1,
      maxHeight: 0.6,
      spreadWidth: 0.4,
      minPotSize: 4
    },
    sunlight: {
      minHours: 4,
      maxHours: 12,
      type: 'fullSun',
      bestOrientation: ['south', 'west', 'east']
    },
    climate: {
      minTemp: 0,
      maxTemp: 40,
      humidityRange: [20, 40],
      droughtTolerant: true,
      windTolerant: true
    },
    growth: {
      matureHeight: 0.5,
      matureWidth: 0.4,
      growthRate: 'slow'
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 4,
      needsStaking: false,
      spreading: false
    },
    careLevel: 'easy',
    waterNeeds: 'low',
    soilType: 'sandy'
  },
  {
    id: 'jasmine',
    commonName: 'Jasmine Vine',
    scientificName: 'Jasminum officinale',
    category: 'vine',
    spaceRequirements: {
      minArea: 0.3,
      maxHeight: 3.0,
      spreadWidth: 1.5,
      minPotSize: 20
    },
    sunlight: {
      minHours: 4,
      maxHours: 10,
      type: 'fullSun',
      bestOrientation: ['south', 'east', 'west']
    },
    climate: {
      minTemp: -5,
      maxTemp: 30,
      humidityRange: [40, 70],
      droughtTolerant: false,
      windTolerant: false
    },
    growth: {
      matureHeight: 2.5,
      matureWidth: 1.5,
      growthRate: 'medium',
      bloomSeason: 'summer',
      bloomColor: ['white', 'yellow']
    },
    containerSuitability: {
      suitable: true,
      minPotSize: 20,
      needsStaking: true,
      spreading: true
    },
    careLevel: 'moderate',
    waterNeeds: 'moderate',
    soilType: 'well-draining'
  }
];

export class PlantRecommendationEngine {
  
  /**
   * Score plants based on balcony geometry and conditions
   */
  static scoreAllPlants(balcony: BalconyDimensions, temperature: number, humidity: number): ScoredPlantRecommendation[] {
    return PLANT_DATABASE
      .map(plant => this.scorePlant(plant, balcony, temperature, humidity))
      .sort((a, b) => b.overallScore - a.overallScore);
  }

  /**
   * Score a single plant against balcony conditions
   */
  private static scorePlant(
    plant: PlantProfile,
    balcony: BalconyDimensions,
    temperature: number,
    humidity: number
  ): ScoredPlantRecommendation {
    let spaceScore = this.calculateSpaceScore(plant, balcony);
    let sunScore = this.calculateSunScore(plant, balcony);
    let climateScore = this.calculateClimateScore(plant, temperature, humidity);
    
    // Weighted overall score
    const overallScore = (spaceScore * 0.35) + (sunScore * 0.40) + (climateScore * 0.25);
    
    const warnings = this.generateWarnings(plant, balcony, temperature, humidity);
    const tips = this.generateTips(plant, balcony);
    const reasoning = this.generateReasoning(plant, spaceScore, sunScore, climateScore);

    return {
      plant,
      overallScore: Math.round(overallScore),
      spaceScore: Math.round(spaceScore),
      sunScore: Math.round(sunScore),
      climateScore: Math.round(climateScore),
      reasoning,
      warnings,
      tips
    };
  }

  /**
   * Calculate space compatibility score (0-100)
   */
  private static calculateSpaceScore(plant: PlantProfile, balcony: BalconyDimensions): number {
    const { minArea, spreadWidth } = plant.spaceRequirements;
    const { area, height } = balcony;

    // Check if plant fits
    if (area < minArea) {
      return 20; // Plant too big for balcony
    }

    // Check height clearance (assuming overhead clearance of 2.5m typical)
    if (plant.spaceRequirements.maxHeight > 2.5) {
      return 40; // Not enough vertical space
    }

    // Optimal utilization: plant uses 20-50% of available space
    const utilization = minArea / area;
    
    if (utilization < 0.1) return 60;    // Underutilizes space
    if (utilization <= 0.5) return 100;  // Perfect fit
    if (utilization <= 1.0) return 80;   // Tight but workable
    return 30;                            // Too crowded
  }

  /**
   * Calculate sunlight compatibility score (0-100)
   */
  private static calculateSunScore(plant: PlantProfile, balcony: BalconyDimensions): number {
    const { minHours, maxHours, type, bestOrientation } = plant.sunlight;
    const { peakSunHours, orientation } = balcony;

    // Check if sun hours are in acceptable range
    if (peakSunHours < minHours) {
      return 30; // Not enough sun
    }
    if (peakSunHours > maxHours) {
      return 50; // Too much sun, risk of burning
    }

    // Check orientation match
    let orientationBonus = 0;
    if (bestOrientation && bestOrientation.includes(orientation)) {
      orientationBonus = 15;
    }

    // Ideal range is within 1 hour of recommended middle ground
    const ideal = (minHours + maxHours) / 2;
    const difference = Math.abs(peakSunHours - ideal);

    if (difference <= 1) {
      return 100 + orientationBonus;
    } else if (difference <= 2) {
      return 85 + orientationBonus;
    } else if (difference <= 3) {
      return 70 + orientationBonus;
    }

    return Math.max(40, 100 - (difference * 10));
  }

  /**
   * Calculate climate compatibility score (0-100)
   */
  private static calculateClimateScore(
    plant: PlantProfile,
    temperature: number,
    humidity: number
  ): number {
    const { minTemp, maxTemp, humidityRange, windTolerant, droughtTolerant } = plant.climate;

    let score = 100;

    // Temperature check
    if (temperature < minTemp || temperature > maxTemp) {
      score -= 40; // Not suitable climate
    }

    // Humidity check
    const [minHumidity, maxHumidity] = humidityRange;
    if (humidity < minHumidity || humidity > maxHumidity) {
      score -= 20; // Humidity mismatch
    }

    return Math.max(0, score);
  }

  /**
   * Generate warnings for problematic conditions
   */
  private static generateWarnings(
    plant: PlantProfile,
    balcony: BalconyDimensions,
    temperature: number,
    humidity: number
  ): string[] {
    const warnings: string[] = [];

    if (plant.spaceRequirements.minArea > balcony.area) {
      warnings.push('This plant may outgrow your balcony space.');
    }

    if (plant.sunlight.minHours > balcony.peakSunHours) {
      warnings.push(`Needs at least ${plant.sunlight.minHours}h sun; you have ${balcony.peakSunHours}h.`);
    }

    if (temperature < plant.climate.minTemp) {
      warnings.push(`Climate too cold (min: ${plant.climate.minTemp}°C).`);
    }

    if (temperature > plant.climate.maxTemp) {
      warnings.push(`Climate too hot (max: ${plant.climate.maxTemp}°C).`);
    }

    if (!plant.climate.windTolerant && balcony.orientation === 'west') {
      warnings.push('May struggle with strong afternoon winds on west-facing balconies.');
    }

    return warnings;
  }

  /**
   * Generate helpful tips for growing the plant
   */
  private static generateTips(plant: PlantProfile, balcony: BalconyDimensions): string[] {
    const tips: string[] = [];

    if (plant.spaceRequirements.minPotSize > 10) {
      tips.push(`Use a pot at least ${plant.spaceRequirements.minPotSize}L for optimal growth.`);
    }

    if (plant.containerSuitability.needsStaking) {
      tips.push('Will need a trellis or stake for support.');
    }

    if (plant.waterNeeds === 'high') {
      tips.push('Check soil moisture daily; may need daily watering in hot weather.');
    } else if (plant.waterNeeds === 'low') {
      tips.push('Drought-tolerant; water only when soil is completely dry.');
    }

    if (plant.careLevel === 'easy') {
      tips.push('Very low maintenance - great for beginners!');
    }

    if (plant.soilType === 'well-draining') {
      tips.push('Use a well-draining potting mix to prevent root rot.');
    }

    return tips;
  }

  /**
   * Generate human-readable explanation of scores
   */
  private static generateReasoning(
    plant: PlantProfile,
    spaceScore: number,
    sunScore: number,
    climateScore: number
  ): string {
    const reasons = [];

    if (sunScore >= 80) reasons.push('excellent sunlight match');
    else if (sunScore >= 60) reasons.push('good sunlight compatibility');
    else reasons.push('limited sunlight tolerance');

    if (spaceScore >= 80) reasons.push('perfect size for your space');
    else if (spaceScore >= 60) reasons.push('fits within space constraints');
    else reasons.push('space may be tight');

    if (climateScore >= 80) reasons.push('ideal climate conditions');
    else if (climateScore >= 60) reasons.push('acceptable climate tolerance');

    return `${plant.commonName} is recommended because it offers ${reasons.join(', ')}.`;
  }
}

// Export plant database for use in other components
export { PLANT_DATABASE };
