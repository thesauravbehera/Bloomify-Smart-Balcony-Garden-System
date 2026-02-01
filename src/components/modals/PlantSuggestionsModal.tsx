import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Leaf, Sun, Droplet, Wind, Sparkles } from "lucide-react";

interface PlantSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedImage?: string | null;
}

export function PlantSuggestionsModal({ isOpen, onClose, uploadedImage }: PlantSuggestionsModalProps) {
  const suggestions = [
    {
      name: "Balcony Tomatoes",
      difficulty: "Beginner",
      sunlight: "6-8 hours",
      water: "Daily",
      space: "Medium pot",
      benefits: ["Fresh produce", "Easy to grow", "Compact variety"]
    },
    {
      name: "Basil & Mint Combo",
      difficulty: "Beginner",
      sunlight: "4-6 hours",
      water: "2-3 times/week",
      space: "Small pots",
      benefits: ["Culinary herbs", "Aromatic", "Fast growing"]
    },
    {
      name: "Lettuce Mix",
      difficulty: "Beginner",
      sunlight: "3-4 hours",
      water: "Daily",
      space: "Shallow containers",
      benefits: ["Quick harvest", "Space efficient", "Continuous growth"]
    },
    {
      name: "Strawberries",
      difficulty: "Beginner",
      sunlight: "6+ hours",
      water: "Daily in summer",
      space: "Hanging baskets",
      benefits: ["Sweet fruit", "Vertical space", "Perennial"]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            AI-Powered Plant Recommendations
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Based on your space analysis, here are perfect plants for your balcony garden
          </DialogDescription>
        </DialogHeader>

        {uploadedImage && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2 text-white">Your Space:</p>
            <img src={uploadedImage} alt="Your space" className="w-full h-48 object-cover rounded-xl border-2 border-cyan-500/30" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {suggestions.map((plant, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-slate-800 to-slate-850 hover:shadow-lg transition-all border-2 border-blue-500/30 hover:border-blue-500/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold mb-1 text-white">{plant.name}</h4>
                  <Badge className="text-xs bg-blue-500/30 text-blue-200 border border-blue-500/50">
                    {plant.difficulty}
                  </Badge>
                </div>
                <Leaf className="w-6 h-6 text-blue-400" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{plant.sunlight}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Droplet className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{plant.water}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300">{plant.space}</span>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {plant.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold" size="sm">
                Add to Garden Plan
              </Button>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
