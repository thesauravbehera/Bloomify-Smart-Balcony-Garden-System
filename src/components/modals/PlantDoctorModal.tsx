import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Stethoscope, Upload, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";

interface PlantDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlantDoctorModal({ isOpen, onClose }: PlantDoctorModalProps) {
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [symptoms, setSymptoms] = useState("");

  const handleDiagnose = () => {
    // Simulated AI diagnosis
    setDiagnosis({
      condition: "Nutrient Deficiency (Nitrogen)",
      severity: "Moderate",
      confidence: 85,
      symptoms: [
        "Yellowing of lower leaves",
        "Slow growth",
        "Pale green color overall"
      ],
      causes: [
        "Insufficient fertilization",
        "Nutrient depletion in container soil",
        "High water drainage washing nutrients away"
      ],
      treatment: [
        "Apply balanced liquid fertilizer (10-10-10) at half strength",
        "Add compost or worm castings to top layer of soil",
        "Consider using slow-release fertilizer for containers",
        "Ensure proper watering - not too much, not too little"
      ],
      prevention: [
        "Fertilize container plants every 2-3 weeks during growing season",
        "Use quality potting mix with added nutrients",
        "Monitor leaf color for early signs",
        "Avoid over-watering which leaches nutrients"
      ]
    });
    toast.success("🌿 Diagnosis complete!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("📸 Photo uploaded! Analyzing...");
      setTimeout(() => handleDiagnose(), 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Stethoscope className="w-5 h-5 text-rose-400" />
            AI Plant Doctor
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Upload a photo or describe symptoms for instant diagnosis and treatment
          </DialogDescription>
        </DialogHeader>

        {!diagnosis ? (
          <div className="space-y-6">
            {/* Photo Upload */}
            <Card className="p-8 border-2 border-dashed border-rose-500/40 hover:border-rose-500/60 transition-all bg-gradient-to-br from-slate-800 to-slate-850">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-rose-400" />
                </div>
                <h4 className="font-medium mb-2 text-white">Upload Plant Photo</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Take a clear photo of affected leaves or plant parts
                </p>
                <input
                  type="file"
                  id="plant-photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button onClick={() => document.getElementById("plant-photo")?.click()} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold">
                  Choose Photo
                </Button>
              </div>
            </Card>

            {/* Or Describe Symptoms */}
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-sm text-muted-foreground bg-background">or</span>
                <div className="flex-1 border-t border-border"></div>
              </div>
            </div>

            <Card className="p-6 border-2 border-rose-500/30 bg-gradient-to-br from-slate-800 to-slate-850">
              <h4 className="font-medium mb-3 text-white">Describe Symptoms</h4>
              <Textarea
                placeholder="Example: Lower leaves are turning yellow and dropping off. New growth looks pale. Plant growing slowly..."
                className="min-h-32 mb-4 bg-slate-800/50 border-slate-700/50 text-gray-100 placeholder:text-gray-500"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <Button onClick={handleDiagnose} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold">
                <Stethoscope className="w-4 h-4 mr-2" />
                Get Diagnosis
              </Button>
            </Card>

            {/* Common Issues Quick Reference */}
            <Card className="p-6 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-2 border-rose-500/20">
              <h4 className="font-medium mb-3 text-white">Common Balcony Garden Issues</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Yellow Leaves</p>
                    <p className="text-gray-400 text-xs">Often indicates overwatering or nitrogen deficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Wilting</p>
                    <p className="text-gray-400 text-xs">Can be under-watering or root problems</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Brown Leaf Tips</p>
                    <p className="text-gray-400 text-xs">Usually low humidity or salt buildup</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Spots on Leaves</p>
                    <p className="text-gray-400 text-xs">Fungal or bacterial infection</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Diagnosis Header */}
            <Card className="p-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{diagnosis.condition}</h3>
                  <div className="flex gap-2">
                    <Badge variant={diagnosis.severity === "Moderate" ? "default" : "destructive"}>
                      {diagnosis.severity}
                    </Badge>
                    <Badge variant="outline">{diagnosis.confidence}% Confidence</Badge>
                  </div>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </Card>

            {/* Symptoms */}
            <Card className="p-6 border-2 border-primary/10">
              <h4 className="font-bold mb-3">Identified Symptoms</h4>
              <ul className="space-y-2">
                {diagnosis.symptoms.map((symptom: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Causes */}
            <Card className="p-6 border-2 border-primary/10">
              <h4 className="font-bold mb-3">Possible Causes</h4>
              <ul className="space-y-2">
                {diagnosis.causes.map((cause: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span className="text-sm">{cause}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Treatment */}
            <Card className="p-6 border-2 border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Recommended Treatment
              </h4>
              <div className="space-y-3">
                {diagnosis.treatment.map((step: string, i: number) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-green-600">{i + 1}</span>
                    </div>
                    <p className="text-sm pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prevention */}
            <Card className="p-6 border-2 border-primary/10 bg-secondary/30">
              <h4 className="font-bold mb-3">Prevention Tips</h4>
              <ul className="space-y-2">
                {diagnosis.prevention.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Button onClick={() => setDiagnosis(null)} variant="outline" className="w-full">
              New Diagnosis
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
