import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Leaf, Droplets, Sun, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BalconyDimensions } from './BalconyGeometryAnalyzer';
import { PlantRecommendationEngine, type ScoredPlantRecommendation } from '@/services/plantRecommendationEngine';

interface PlantRecommendationsProps {
  balconyData: BalconyDimensions;
  temperature: number;
  humidity: number;
  onPlantSelected?: (plant: ScoredPlantRecommendation) => void;
}

export function PlantRecommendations({
  balconyData,
  temperature,
  humidity,
  onPlantSelected
}: PlantRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ScoredPlantRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<ScoredPlantRecommendation | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'easy' | 'moderate' | 'challenging'>('all');

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      const scored = PlantRecommendationEngine.scoreAllPlants(
        balconyData,
        temperature,
        humidity
      );
      setRecommendations(scored);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [balconyData, temperature, humidity]);

  const filteredRecommendations = filterBy === 'all'
    ? recommendations
    : recommendations.filter(r => r.plant.careLevel === filterBy);

  const topRecommendations = filteredRecommendations.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌿 AI-Powered Plant Recommendations
        </h2>
        <p className="text-gray-600 mb-4">
          Based on your {balconyData.area.toFixed(1)}m² {balconyData.orientation}-facing balcony with{' '}
          <strong>{balconyData.peakSunHours}h</strong> daily sunlight
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'easy', 'moderate', 'challenging'] as const).map(level => (
            <Button
              key={level}
              variant={filterBy === level ? 'default' : 'outline'}
              onClick={() => setFilterBy(level)}
              className="capitalize"
              size="sm"
            >
              {level === 'all' ? '🌱 All Plants' : level === 'easy' ? '✨ Easy' : level === 'moderate' ? '🌱 Moderate' : '🔬 Challenging'}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4" />
            <p className="text-gray-600">Analyzing your balcony environment...</p>
          </div>
        </div>
      )}

      {/* Recommendations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {topRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlant?.plant.id === recommendation.plant.id
                      ? 'ring-2 ring-green-500 bg-green-50'
                      : 'hover:border-green-300'
                  }`}
                  onClick={() => {
                    setSelectedPlant(recommendation);
                    onPlantSelected?.(recommendation);
                  }}
                >
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {recommendation.plant.commonName}
                          </h3>
                          <p className="text-xs text-gray-500 italic">
                            {recommendation.plant.scientificName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {recommendation.overallScore}%
                          </div>
                          <p className="text-xs text-gray-500">match</p>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="capitalize text-xs">
                          {recommendation.plant.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            recommendation.plant.careLevel === 'easy'
                              ? 'bg-green-100 text-green-800'
                              : recommendation.plant.careLevel === 'moderate'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {recommendation.plant.careLevel === 'easy' ? '✨' : recommendation.plant.careLevel === 'moderate' ? '🌱' : '🔬'} {recommendation.plant.careLevel}
                        </Badge>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="space-y-2 bg-gray-50 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium flex-1">Sunlight</span>
                        <span className="text-sm font-bold text-yellow-600">{recommendation.sunScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-yellow-600 h-1.5 rounded-full"
                          style={{ width: `${recommendation.sunScore}%` }}
                        />
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium flex-1">Space Fit</span>
                        <span className="text-sm font-bold text-green-600">{recommendation.spaceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{ width: `${recommendation.spaceScore}%` }}
                        />
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium flex-1">Climate</span>
                        <span className="text-sm font-bold text-blue-600">{recommendation.climateScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${recommendation.climateScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="font-semibold">Water:</span> {recommendation.plant.waterNeeds}
                      </div>
                      <div>
                        <span className="font-semibold">Growth:</span> {recommendation.plant.growth.growthRate}
                      </div>
                      <div>
                        <span className="font-semibold">Height:</span> ~{recommendation.plant.growth.matureHeight}m
                      </div>
                      <div>
                        <span className="font-semibold">Pot Size:</span> {recommendation.plant.containerSuitability.minPotSize}L+
                      </div>
                    </div>

                    {/* Warnings */}
                    {recommendation.warnings.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded p-2 text-xs text-red-800">
                        <div className="flex gap-2 items-start">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            {recommendation.warnings.map((warning, i) => (
                              <p key={i}>{warning}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Detailed View Panel */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📋 Detailed Profile: {selectedPlant.plant.commonName}
              </h3>

              {/* Reasoning */}
              <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-green-500">
                <p className="text-gray-700">{selectedPlant.reasoning}</p>
              </div>

              {/* Tips */}
              {selectedPlant.tips.length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Growing Tips
                  </div>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    {selectedPlant.tips.map((tip, i) => (
                      <div key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">🌞 Light Requirements</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {selectedPlant.plant.sunlight.type}
                    </div>
                    <div>
                      <span className="font-medium">Min Hours:</span> {selectedPlant.plant.sunlight.minHours}h
                    </div>
                    <div>
                      <span className="font-medium">Max Hours:</span> {selectedPlant.plant.sunlight.maxHours}h
                    </div>
                    {selectedPlant.plant.sunlight.bestOrientation && (
                      <div>
                        <span className="font-medium">Best Orientation:</span>{' '}
                        {selectedPlant.plant.sunlight.bestOrientation.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">🌡️ Climate Requirements</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Temp Range:</span> {selectedPlant.plant.climate.minTemp}°C to{' '}
                      {selectedPlant.plant.climate.maxTemp}°C
                    </div>
                    <div>
                      <span className="font-medium">Humidity:</span>{' '}
                      {selectedPlant.plant.climate.humidityRange[0]}-{selectedPlant.plant.climate.humidityRange[1]}%
                    </div>
                    <div>
                      <span className="font-medium">Drought Tolerant:</span>{' '}
                      {selectedPlant.plant.climate.droughtTolerant ? '✅ Yes' : '❌ No'}
                    </div>
                    <div>
                      <span className="font-medium">Wind Tolerant:</span>{' '}
                      {selectedPlant.plant.climate.windTolerant ? '✅ Yes' : '❌ No'}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📏 Size & Growth</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Mature Height:</span> {selectedPlant.plant.growth.matureHeight}m
                    </div>
                    <div>
                      <span className="font-medium">Mature Width:</span> {selectedPlant.plant.growth.matureWidth}m
                    </div>
                    <div>
                      <span className="font-medium">Growth Rate:</span> {selectedPlant.plant.growth.growthRate}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">🪴 Container Info</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Min Pot Size:</span>{' '}
                      {selectedPlant.plant.containerSuitability.minPotSize}L
                    </div>
                    <div>
                      <span className="font-medium">Needs Staking:</span>{' '}
                      {selectedPlant.plant.containerSuitability.needsStaking ? '✅ Yes' : '❌ No'}
                    </div>
                    <div>
                      <span className="font-medium">Soil Type:</span> {selectedPlant.plant.soilType}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Add to My Balcony Plan
                </Button>
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
