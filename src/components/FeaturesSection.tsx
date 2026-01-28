import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Flower2, Calendar, Users, Trophy, Sprout, Bell, 
  MessageSquare, Award, Camera, RefreshCcw 
} from "lucide-react";
import { PlantOfDayModal } from "./modals/PlantOfDayModal";
import { CalendarModal } from "./modals/CalendarModal";

export function FeaturesSection() {
  const [plantOfDayOpen, setPlantOfDayOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(generateRandomPlant());

  const uniqueFeatures = [
    {
      icon: Flower2,
      title: "Plant of the Day",
      badge: "Daily",
      description: "Discover a new balcony-friendly plant every day with detailed care instructions and fun facts.",
      color: "from-pink-500/10 to-rose-500/10",
      action: () => {
        setCurrentPlant(generateRandomPlant());
        setPlantOfDayOpen(true);
      }
    },
    {
      icon: Calendar,
      title: "Seasonal Planting Calendar",
      badge: "Personalized",
      description: "Get month-by-month planting guides tailored to your climate zone and balcony conditions.",
      color: "from-blue-500/10 to-cyan-500/10",
      action: () => setCalendarOpen(true)
    },
    {
      icon: Users,
      title: "Community Garden Hub",
      badge: "Social",
      description: "Share photos, exchange tips, and connect with balcony gardeners worldwide.",
      color: "from-green-500/10 to-emerald-500/10",
      action: () => {}
    },
    {
      icon: Trophy,
      title: "Achievement Badges",
      badge: "Gamified",
      description: "Earn rewards as you progress from beginner to master balcony gardener.",
      color: "from-amber-500/10 to-yellow-500/10",
      action: () => {}
    }
  ];

  const platformFeatures = [
    { 
      icon: Sprout, 
      title: "Smart Plant Selection", 
      description: "AI recommendations for your balcony space and climate" 
    },
    { 
      icon: Bell, 
      title: "Care Reminders", 
      description: "Automated watering and fertilizing schedules" 
    },
    { 
      icon: Camera, 
      title: "Problem Diagnosis", 
      description: "AI-powered plant health analysis from photos" 
    },
    { 
      icon: MessageSquare, 
      title: "Expert Q&A", 
      description: "Get answers from experienced gardeners" 
    },
    { 
      icon: Award, 
      title: "Growth Tracking", 
      description: "Journal your plants' progress with photos" 
    },
    { 
      icon: RefreshCcw, 
      title: "Seasonal Updates", 
      description: "Timely tips for changing weather conditions" 
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Flower2 className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Everything for Balcony Garden Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bloomify provides all the tools, knowledge, and community support you need 
            to grow a thriving balcony garden, no matter your experience level.
          </p>
        </motion.div>

        {/* Unique Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/20 group cursor-pointer relative overflow-hidden"
                onClick={feature.action}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <Button variant="outline" className="w-full rounded-xl border-2 hover:bg-secondary/50 group-hover:border-primary">
                    Explore Feature
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Core Capabilities</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/20 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">300+</div>
                <div className="text-sm text-muted-foreground">Balcony Plants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Active Gardeners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Growing Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Community Support</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <PlantOfDayModal
        isOpen={plantOfDayOpen}
        onClose={() => setPlantOfDayOpen(false)}
        plant={currentPlant}
      />
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </section>
  );
}

function generateRandomPlant() {
  const plants = [
    {
      name: "Cherry Tomatoes",
      family: "Solanaceae (Nightshade Family)",
      origin: "South America",
      difficulty: "Beginner",
      funFacts: [
        "Cherry tomatoes are perfect for balconies - they produce fruit in just 60-70 days",
        "A single plant can yield up to 200 tomatoes in a season",
        "They contain more vitamin C per weight than oranges",
        "Can be grown year-round indoors with proper light"
      ],
      careBasics: {
        light: "6-8 hours of direct sunlight",
        water: "Keep soil consistently moist, water daily in hot weather",
        humidity: "40-70% - tolerates average humidity",
        temperature: "65-85°F (18-29°C) ideal growing range"
      }
    },
    {
      name: "Basil",
      family: "Lamiaceae (Mint Family)",
      origin: "Tropical regions of Asia and Africa",
      difficulty: "Beginner",
      funFacts: [
        "Basil is a natural mosquito repellent - perfect for balcony gardens",
        "Regular harvesting makes the plant bushier and more productive",
        "Fresh basil has 3x more essential oils than dried basil",
        "Can be grown from cuttings - just place stems in water"
      ],
      careBasics: {
        light: "4-6 hours of sunlight, can tolerate partial shade",
        water: "Keep soil moist but not waterlogged, water when top inch is dry",
        humidity: "50-70% - enjoys moderate to high humidity",
        temperature: "70-85°F (21-29°C) - very heat sensitive"
      }
    },
    {
      name: "Lettuce Mix",
      family: "Asteraceae (Daisy Family)",
      origin: "Mediterranean region",
      difficulty: "Beginner",
      funFacts: [
        "Lettuce is one of the fastest vegetables to grow - harvest in 30 days",
        "Perfect for succession planting - sow every 2 weeks for continuous harvest",
        "Grows well in shallow containers (only 6-8 inches deep needed)",
        "Can regrow from cut leaves - 'cut and come again' varieties"
      ],
      careBasics: {
        light: "3-4 hours of sunlight, prefers cooler conditions",
        water: "Keep consistently moist, needs frequent watering in containers",
        humidity: "60-80% - prefers higher humidity",
        temperature: "45-75°F (7-24°C) - cool season crop"
      }
    }
  ];
  
  return plants[Math.floor(Math.random() * plants.length)];
}
