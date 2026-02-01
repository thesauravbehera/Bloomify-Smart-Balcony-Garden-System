import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Flower2, Sun, Droplet, Wind, ThermometerSun, Info, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface PlantOfDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: {
    name: string;
    family: string;
    origin: string;
    difficulty: string;
    funFacts: string[];
    careBasics: {
      light: string;
      water: string;
      humidity: string;
      temperature: string;
    };
  };
}

export function PlantOfDayModal({ isOpen, onClose, plant }: PlantOfDayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Flower2 className="w-5 h-5 text-pink-400" />
            Plant of the Day
          </DialogTitle>
          <DialogDescription>
            Discover something new about balcony gardening every day
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-2xl font-bold mb-1 text-white">{plant.name}</h3>
                <p className="text-gray-400">{plant.family}</p>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400/50">{plant.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wind className="w-4 h-4" />
              <span>Origin: {plant.origin}</span>
            </div>
          </div>

          {/* Plant Image */}
          <Card className="overflow-hidden border-2 border-purple-500/30 bg-slate-800/50">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1757282101267-dc6667158dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwcGxhbnRzfGVufDF8fHx8MTc2MTUyMTU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={plant.name}
              className="w-full h-64 object-cover"
            />
          </Card>

          {/* Care Basics */}
          <Card className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-slate-800 to-slate-850">
            <h4 className="font-bold mb-4 text-white">Care Basics</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sun className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Light</p>
                  <p className="text-sm text-gray-400">{plant.careBasics.light}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Water</p>
                  <p className="text-sm text-gray-400">{plant.careBasics.water}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wind className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Humidity</p>
                  <p className="text-sm text-gray-400">{plant.careBasics.humidity}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ThermometerSun className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Temperature</p>
                  <p className="text-sm text-gray-400">{plant.careBasics.temperature}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Fun Facts */}
          <Card className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-white">
              <Star className="w-4 h-4 text-pink-400" />
              Did You Know?
            </h4>
            <ul className="space-y-3">
              {plant.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="w-3 h-3 text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-300">{fact}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold">
              Add to My Garden
            </Button>
            <Button variant="outline" className="flex-1 border-2 border-purple-500/40 text-white hover:bg-purple-500/10">
              Learn More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
