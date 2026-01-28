import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Droplets, Sun, Wind, Heart, Plus, Search, Filter, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

interface Plant {
  id: number;
  name: string;
  species: string;
  modelUrl: string;
  health: number;
  hydration: number;
  sunlight: number;
  growth: number;
  stage: 'Seedling' | 'Growing' | 'Mature';
  daysOld: number;
  lastWatered: string;
}

export function MyGarden() {
  const [selectedPlant, setSelectedPlant] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const plants: Plant[] = [
    {
      id: 0,
      name: 'Monstera Deliciosa',
      species: 'Swiss Cheese Plant',
      modelUrl: 'https://sketchfab.com/models/dac370ad6c49465c8613979514beb4f5/embed',
      health: 95,
      hydration: 78,
      sunlight: 85,
      growth: 67,
      stage: 'Mature',
      daysOld: 120,
      lastWatered: '2 hours ago'
    },
    {
      id: 1,
      name: 'Houseleek',
      species: 'Sempervivum',
      modelUrl: 'https://sketchfab.com/models/70679a304b324ca8941c214875acf6a9/embed',
      health: 88,
      hydration: 65,
      sunlight: 92,
      growth: 45,
      stage: 'Growing',
      daysOld: 45,
      lastWatered: '5 hours ago'
    },
    {
      id: 2,
      name: 'Peace Lily',
      species: 'Spathiphyllum',
      modelUrl: 'https://sketchfab.com/models/7c5e77d572c848458e5d898ac49f6f27/embed',
      health: 92,
      hydration: 82,
      sunlight: 75,
      growth: 88,
      stage: 'Mature',
      daysOld: 90,
      lastWatered: '1 hour ago'
    },
    {
      id: 3,
      name: 'Succulent Garden',
      species: 'Mixed Varieties',
      modelUrl: 'https://sketchfab.com/models/a3e0e52029db49f6882b4fbfbf3c0e9f/embed',
      health: 85,
      hydration: 55,
      sunlight: 95,
      growth: 34,
      stage: 'Growing',
      daysOld: 30,
      lastWatered: '3 days ago'
    },
    {
      id: 4,
      name: 'Ficus Elastica',
      species: 'Rubber Plant',
      modelUrl: 'https://sketchfab.com/models/c8a39f9604694e89b4d1f0b1c7a8e6d4/embed',
      health: 90,
      hydration: 70,
      sunlight: 88,
      growth: 72,
      stage: 'Mature',
      daysOld: 150,
      lastWatered: '4 hours ago'
    },
    {
      id: 5,
      name: 'Baby Cactus',
      species: 'Cactaceae',
      modelUrl: 'https://sketchfab.com/models/dac370ad6c49465c8613979514beb4f5/embed',
      health: 78,
      hydration: 45,
      sunlight: 98,
      growth: 23,
      stage: 'Seedling',
      daysOld: 15,
      lastWatered: '1 week ago'
    }
  ];

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPlantData = selectedPlant !== null ? plants[selectedPlant] : null;

  // Three.js-like particle animation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const handleWaterPlant = () => {
    if (selectedPlantData) {
      // Water animation feedback
      alert(`Watered ${selectedPlantData.name}! +50 GP`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 pt-24 pb-32 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            My Virtual Garden 🌱
          </h1>
          <p className="text-slate-400 text-lg">Nurture your plants and watch them grow in real-time</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              placeholder="Search your plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-800 text-white"
            />
          </div>
          <Button variant="outline" className="border-slate-800 text-slate-400">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Plant
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plant List */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              Your Plants ({filteredPlants.length})
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredPlants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPlant(plant.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedPlant === plant.id
                      ? 'bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800/30 border-slate-700 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex-shrink-0 overflow-hidden">
                      <iframe
                        title={plant.name}
                        src={plant.modelUrl}
                        className="w-full h-full scale-150"
                        style={{ pointerEvents: 'none' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{plant.name}</p>
                      <p className="text-slate-500 text-xs truncate">{plant.species}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all"
                            style={{ width: `${plant.health}%` }}
                          />
                        </div>
                        <span className="text-emerald-400 text-xs">{plant.health}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Main Plant Display */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {selectedPlantData && (
                <motion.div
                  key={selectedPlantData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl text-white mb-1">{selectedPlantData.name}</h2>
                        <p className="text-slate-400">{selectedPlantData.species}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            {selectedPlantData.stage}
                          </Badge>
                          <Badge variant="outline" className="border-slate-700 text-slate-400">
                            Day {selectedPlantData.daysOld}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-sm">Overall Health</p>
                        <p className="text-4xl text-emerald-400">{selectedPlantData.health}%</p>
                      </div>
                    </div>

                    {/* 3D Model Viewer */}
                    <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg overflow-hidden border border-slate-800 mb-6 relative group">
                      <iframe
                        title={selectedPlantData.name}
                        frameBorder="0"
                        allowFullScreen
                        mozallowfullscreen="true"
                        webkitallowfullscreen="true"
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        xr-spatial-tracking="true"
                        execution-while-out-of-viewport="true"
                        execution-while-not-rendered="true"
                        web-share="true"
                        src={selectedPlantData.modelUrl}
                        className="w-full h-full"
                      />
                      
                      {/* Overlay Controls */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge className="bg-slate-900/90 backdrop-blur-sm border-slate-700">
                          3D View • Drag to rotate
                        </Badge>
                        <Badge className="bg-slate-900/90 backdrop-blur-sm border-slate-700">
                          Last watered: {selectedPlantData.lastWatered}
                        </Badge>
                      </div>
                    </div>

                    {/* Plant Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-5 h-5 text-rose-400" />
                          <p className="text-slate-400 text-sm">Health</p>
                        </div>
                        <p className="text-2xl text-white mb-2">{selectedPlantData.health}%</p>
                        <Progress value={selectedPlantData.health} className="h-2 bg-slate-800" />
                      </div>

                      <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="w-5 h-5 text-blue-400" />
                          <p className="text-slate-400 text-sm">Hydration</p>
                        </div>
                        <p className="text-2xl text-white mb-2">{selectedPlantData.hydration}%</p>
                        <Progress value={selectedPlantData.hydration} className="h-2 bg-slate-800" />
                      </div>

                      <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="w-5 h-5 text-yellow-400" />
                          <p className="text-slate-400 text-sm">Sunlight</p>
                        </div>
                        <p className="text-2xl text-white mb-2">{selectedPlantData.sunlight}%</p>
                        <Progress value={selectedPlantData.sunlight} className="h-2 bg-slate-800" />
                      </div>

                      <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Sprout className="w-5 h-5 text-emerald-400" />
                          <p className="text-slate-400 text-sm">Growth</p>
                        </div>
                        <p className="text-2xl text-white mb-2">{selectedPlantData.growth}%</p>
                        <Progress value={selectedPlantData.growth} className="h-2 bg-slate-800" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        onClick={handleWaterPlant}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 border-0"
                      >
                        <Droplets className="w-4 h-4 mr-2" />
                        Water
                      </Button>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 border-0">
                        <Sprout className="w-4 h-4 mr-2" />
                        Fertilize
                      </Button>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30 border-0">
                        <Sun className="w-4 h-4 mr-2" />
                        Adjust Light
                      </Button>
                    </div>
                  </Card>

                  {/* Care Tips */}
                  <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/30 backdrop-blur-xl p-6">
                    <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-teal-400" />
                      Care Recommendations
                    </h3>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>• {selectedPlantData.species} thrives in indirect sunlight</p>
                      <p>• Water when soil is 50% dry (about every {selectedPlantData.hydration > 70 ? '7-10' : '3-5'} days)</p>
                      <p>• Optimal temperature: 65-75°F (18-24°C)</p>
                      <p>• Fertilize bi-weekly during growing season</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}