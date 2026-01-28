import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { motion } from 'motion/react';

export interface BalconyDimensions {
  length: number;
  width: number;
  height: number;
  area: number;
  orientation: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  peakSunHours: number;
  floorMaterial: 'wood' | 'tile' | 'concrete' | 'metal';
}

interface BalconyGeometryAnalyzerProps {
  onAnalysisComplete: (dimensions: BalconyDimensions) => void;
}

export function BalconyGeometryAnalyzer({ onAnalysisComplete }: BalconyGeometryAnalyzerProps) {
  const [unit, setUnit] = useState<'meters' | 'feet'>('meters');
  const [length, setLength] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [orientation, setOrientation] = useState<BalconyDimensions['orientation']>('south');
  const [peakSunHours, setPeakSunHours] = useState<number | ''>('');
  const [floorMaterial, setFloorMaterial] = useState<BalconyDimensions['floorMaterial']>('tile');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!length || length <= 0) newErrors.length = 'Length must be greater than 0';
    if (!width || width <= 0) newErrors.width = 'Width must be greater than 0';
    if (!height || height <= 0) newErrors.height = 'Height must be greater than 0';
    if (!peakSunHours || peakSunHours < 0 || peakSunHours > 14) {
      newErrors.peakSunHours = 'Peak sun hours must be between 0 and 14';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const lengthVal = typeof length === 'number' ? length : 0;
    const widthVal = typeof width === 'number' ? width : 0;
    const area = lengthVal * widthVal;

    const dimensions: BalconyDimensions = {
      length: lengthVal,
      width: widthVal,
      height: typeof height === 'number' ? height : 0,
      area,
      orientation,
      peakSunHours: typeof peakSunHours === 'number' ? peakSunHours : 0,
      floorMaterial
    };

    setSubmitted(true);
    setTimeout(() => {
      onAnalysisComplete(dimensions);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📐 Balcony Geometry Analysis
          </h2>
          <p className="text-gray-600">
            Map your balcony dimensions to get AI-powered plant recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Unit Toggle */}
          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={unit === 'meters' ? 'default' : 'outline'}
              onClick={() => setUnit('meters')}
              className="flex-1"
            >
              Meters (m)
            </Button>
            <Button
              type="button"
              variant={unit === 'feet' ? 'default' : 'outline'}
              onClick={() => setUnit('feet')}
              className="flex-1"
            >
              Feet (ft)
            </Button>
          </div>

          {/* Dimensions Section */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Balcony Dimensions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="length" className="block text-sm font-medium mb-2">
                  Length ({unit === 'meters' ? 'm' : 'ft'})
                </Label>
                <Input
                  id="length"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 3.5"
                  value={length}
                  onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : '')}
                  className={errors.length ? 'border-red-500' : ''}
                />
                {errors.length && (
                  <p className="text-red-500 text-sm mt-1">{errors.length}</p>
                )}
              </div>

              <div>
                <Label htmlFor="width" className="block text-sm font-medium mb-2">
                  Width ({unit === 'meters' ? 'm' : 'ft'})
                </Label>
                <Input
                  id="width"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 2.0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : '')}
                  className={errors.width ? 'border-red-500' : ''}
                />
                {errors.width && (
                  <p className="text-red-500 text-sm mt-1">{errors.width}</p>
                )}
              </div>

              <div>
                <Label htmlFor="height" className="block text-sm font-medium mb-2">
                  Railing Height ({unit === 'meters' ? 'm' : 'ft'})
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 1.2"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className={errors.height ? 'border-red-500' : ''}
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                )}
              </div>

              {length && width && (
                <div className="flex items-end">
                  <div className="flex-1">
                    <Label className="block text-sm font-medium mb-2">
                      Total Area ({unit === 'meters' ? 'm²' : 'ft²'})
                    </Label>
                    <div className="text-2xl font-bold text-green-600">
                      {(Number(length) * Number(width)).toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Environment Section */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">☀️ Environment Conditions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orientation" className="block text-sm font-medium mb-2">
                  Balcony Orientation
                </Label>
                <Select value={orientation} onValueChange={(val: any) => setOrientation(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North (Least Sunlight)</SelectItem>
                    <SelectItem value="northeast">Northeast (Morning Sun)</SelectItem>
                    <SelectItem value="east">East (Morning Sun)</SelectItem>
                    <SelectItem value="southeast">Southeast (Morning-Midday)</SelectItem>
                    <SelectItem value="south">South (Most Sunlight)</SelectItem>
                    <SelectItem value="southwest">Southwest (Afternoon Heat)</SelectItem>
                    <SelectItem value="west">West (Strong Afternoon Sun)</SelectItem>
                    <SelectItem value="northwest">Northwest (Soft Light)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sunHours" className="block text-sm font-medium mb-2">
                  Peak Sun Hours per Day
                </Label>
                <Input
                  id="sunHours"
                  type="number"
                  step="0.5"
                  min="0"
                  max="14"
                  placeholder="e.g., 6.5"
                  value={peakSunHours}
                  onChange={(e) =>
                    setPeakSunHours(e.target.value ? parseFloat(e.target.value) : '')
                  }
                  className={errors.peakSunHours ? 'border-red-500' : ''}
                />
                {errors.peakSunHours && (
                  <p className="text-red-500 text-sm mt-1">{errors.peakSunHours}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Direct sunlight hours (6h = moderate, 8h+ = full sun)
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="floorMaterial" className="block text-sm font-medium mb-2">
                Floor Material
              </Label>
              <Select value={floorMaterial} onValueChange={(val: any) => setFloorMaterial(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wood">Wood (Heat insulating, natural drainage)</SelectItem>
                  <SelectItem value="tile">Tile (Heat absorbing, good drainage)</SelectItem>
                  <SelectItem value="concrete">Concrete (High heat absorption)</SelectItem>
                  <SelectItem value="metal">Metal (Very high heat, quick drainage)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Affects how quickly pots heat up and soil dries
              </p>
            </div>
          </div>

          {/* Info Alert */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 ml-2">
              💡 <strong>Tip:</strong> For peak sun hours, count direct sunlight at midday. Morning
              and late afternoon light counts as partial sun. Use a light meter app for precision.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitted}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze My Balcony
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
