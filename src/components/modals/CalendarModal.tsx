import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Sprout, Sun, Leaf } from "lucide-react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const months = [
    {
      name: "October",
      season: "Fall",
      plantings: [
        { name: "Lettuce & Greens", type: "Direct Sow", icon: Leaf, color: "text-green-500" },
        { name: "Kale", type: "Transplant", icon: Leaf, color: "text-green-600" },
        { name: "Spinach", type: "Direct Sow", icon: Leaf, color: "text-green-500" }
      ],
      tasks: [
        "Prepare containers for winter vegetables",
        "Harvest summer crops before frost",
        "Add compost to refresh soil"
      ]
    },
    {
      name: "November",
      season: "Fall",
      plantings: [
        { name: "Garlic", type: "Bulbs", icon: Sprout, color: "text-purple-500" },
        { name: "Winter Lettuce", type: "Direct Sow", icon: Leaf, color: "text-green-500" }
      ],
      tasks: [
        "Protect tender plants from frost",
        "Reduce watering frequency",
        "Clean and store unused containers"
      ]
    },
    {
      name: "December",
      season: "Winter",
      plantings: [
        { name: "Microgreens", type: "Indoor", icon: Sprout, color: "text-green-400" },
        { name: "Herbs (Indoor)", type: "Container", icon: Leaf, color: "text-green-500" }
      ],
      tasks: [
        "Monitor indoor plants for pests",
        "Plan spring garden layout",
        "Order seeds for next season"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Seasonal Planting Calendar
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Personalized planting schedule for your balcony garden
          </DialogDescription>
        </DialogHeader>

        {/* Region Indicator */}
        <Card className="p-4 bg-gradient-to-r from-slate-800 to-slate-850 border-2 border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Your Growing Zone</p>
              <p className="text-sm text-gray-400">USDA Zone 9b - Temperate Climate</p>
            </div>
            <Badge className="bg-cyan-500/30 text-cyan-200 border border-cyan-500/50">Based on your location</Badge>
          </div>
        </Card>

        {/* Monthly Calendar */}
        <div className="space-y-6">
          {months.map((month, index) => (
            <Card key={index} className="p-6 border-2 border-green-500/30 bg-gradient-to-br from-slate-800 to-slate-850 hover:border-green-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{month.name}</h3>
                  <Badge className="mt-1 bg-green-500/30 text-green-200 border border-green-500/50">
                    {month.season}
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Sun className="w-6 h-6 text-green-400" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* What to Plant */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-white">
                    <Sprout className="w-4 h-4 text-green-400" />
                    What to Plant
                  </h4>
                  <div className="space-y-2">
                    {month.plantings.map((planting, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-slate-700/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2">
                          <planting.icon className={`w-4 h-4 ${planting.color}`} />
                          <span className="text-sm font-medium text-white">{planting.name}</span>
                        </div>
                        <Badge className="text-xs bg-green-500/40 text-green-200 border border-green-500/50">
                          {planting.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4 text-green-400" />
                    Garden Tasks
                  </h4>
                  <ul className="space-y-2">
                    {month.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
          <h4 className="font-bold mb-3 text-white">Balcony Garden Tips</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"></div>
              <span>Containers warm up faster than ground soil - adjust planting times accordingly</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"></div>
              <span>Monitor microclimates - south-facing balconies are warmer</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"></div>
              <span>Use frost covers for early/late season protection</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"></div>
              <span>Succession plant every 2-3 weeks for continuous harvest</span>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
