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
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Seasonal Planting Calendar
          </DialogTitle>
          <DialogDescription>
            Personalized planting schedule for your balcony garden
          </DialogDescription>
        </DialogHeader>

        {/* Region Indicator */}
        <Card className="p-4 bg-secondary/30 border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Your Growing Zone</p>
              <p className="text-sm text-muted-foreground">USDA Zone 9b - Temperate Climate</p>
            </div>
            <Badge variant="outline">Based on your location</Badge>
          </div>
        </Card>

        {/* Monthly Calendar */}
        <div className="space-y-6">
          {months.map((month, index) => (
            <Card key={index} className="p-6 border-2 border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{month.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {month.season}
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sun className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* What to Plant */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-primary" />
                    What to Plant
                  </h4>
                  <div className="space-y-2">
                    {month.plantings.map((planting, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <planting.icon className={`w-4 h-4 ${planting.color}`} />
                          <span className="text-sm font-medium">{planting.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {planting.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Garden Tasks
                  </h4>
                  <ul className="space-y-2">
                    {month.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
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
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
          <h4 className="font-bold mb-3">Balcony Garden Tips</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Containers warm up faster than ground soil - adjust planting times accordingly</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Monitor microclimates - south-facing balconies are warmer</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Use frost covers for early/late season protection</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Succession plant every 2-3 weeks for continuous harvest</span>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
