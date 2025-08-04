import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  BookOpen, 
  Home, 
  Heart, 
  Utensils, 
  GraduationCap,
  Users,
  ArrowRight,
  Gift,
  Shield
} from "lucide-react";

export default function DonationImpactCalculator() {
  const [amount, setAmount] = useState<number>(1500);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly' | 'onetime'>('monthly');

  const impactCalculations = {
    500: {
      education: "1 child's school supplies for 1 month",
      food: "15 nutritious meals",
      books: "5 textbooks",
      healthcare: "1 basic health checkup",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    1500: {
      education: "1 girl's complete monthly support",
      food: "45 nutritious meals + supplements",
      books: "Full semester textbooks for 1 child",
      healthcare: "Comprehensive health package",
      icon: Heart,
      color: "bg-red-500"
    },
    3000: {
      education: "2 girls' complete monthly support",
      food: "90 nutritious meals for children",
      books: "Complete academic year materials",
      healthcare: "Medical support for 3 children",
      icon: Users,
      color: "bg-green-500"
    },
    5000: {
      education: "3-4 children's complete monthly support",
      food: "150 nutritious meals + special diet",
      books: "Classroom library setup",
      healthcare: "Emergency medical fund",
      icon: Home,
      color: "bg-purple-500"
    },
    10000: {
      education: "6-7 children's complete monthly support",
      food: "300 nutritious meals + kitchen supplies",
      books: "Computer lab setup contribution",
      healthcare: "Annual health camp organization",
      icon: GraduationCap,
      color: "bg-indigo-500"
    }
  };

  const getImpactForAmount = (amt: number) => {
    const keys = Object.keys(impactCalculations).map(Number).sort((a, b) => a - b);
    let bestMatch = keys[0];
    
    for (const key of keys) {
      if (amt >= key) {
        bestMatch = key;
      } else {
        break;
      }
    }
    
    const impact = impactCalculations[bestMatch as keyof typeof impactCalculations];
    const multiplier = Math.floor(amt / bestMatch);
    
    return {
      ...impact,
      multiplier: multiplier > 1 ? multiplier : 1,
      baseAmount: bestMatch
    };
  };

  const impact = getImpactForAmount(amount);
  const IconComponent = impact.icon;

  const yearlyImpact = selectedPeriod === 'monthly' ? amount * 12 : 
                     selectedPeriod === 'yearly' ? amount : amount;

  const presetAmounts = [500, 1500, 3000, 5000, 10000, 18000];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full mb-6">
            <Calculator className="h-5 w-5 mr-2" />
            Impact Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See Your Donation Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every rupee you donate has a direct, measurable impact on children's lives. 
            Use our calculator to see exactly how your contribution helps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <Card className="p-8 bg-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Calculate Your Impact</h3>
            
            {/* Donation Type Selection */}
            <div className="flex gap-2 mb-6">
              {[
                { key: 'onetime', label: 'One Time' },
                { key: 'monthly', label: 'Monthly' },
                { key: 'yearly', label: 'Yearly' }
              ].map((period) => (
                <Button
                  key={period.key}
                  variant={selectedPeriod === period.key ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSelectedPeriod(period.key as any)}
                >
                  {period.label}
                </Button>
              ))}
            </div>

            {/* Preset Amount Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset ? "default" : "outline"}
                  className="py-3"
                  onClick={() => setAmount(preset)}
                >
                  ₹{preset}
                </Button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="mb-8">
              <Label htmlFor="amount" className="text-base font-semibold mb-2 block">
                Custom Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="text-xl p-4 text-center font-bold"
                min="100"
                step="100"
              />
            </div>

            {/* Tax Benefits */}
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Tax Benefits</span>
              </div>
              <p className="text-green-700 text-sm">
                Save ₹{Math.floor(amount * 0.3)} in taxes with 80G deduction 
                (30% of donation amount)
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Donate ₹{amount} {selectedPeriod !== 'onetime' && `/${selectedPeriod.slice(0, -2)}`}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Card>

          {/* Impact Visualization */}
          <Card className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${impact.color} rounded-full mb-4`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Your Impact</h3>
              <div className="text-3xl font-bold">₹{amount.toLocaleString()}</div>
              {selectedPeriod !== 'onetime' && (
                <div className="text-lg opacity-90">per {selectedPeriod.slice(0, -2)}</div>
              )}
            </div>

            <div className="space-y-6">
              {/* Direct Impact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Education Impact
                </h4>
                <p className="text-sm opacity-90">
                  {impact.multiplier > 1 ? `${impact.multiplier}x ` : ''}{impact.education}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Nutrition Support
                </h4>
                <p className="text-sm opacity-90">
                  {impact.multiplier > 1 ? `${impact.multiplier}x ` : ''}{impact.food}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Learning Materials
                </h4>
                <p className="text-sm opacity-90">
                  {impact.multiplier > 1 ? `${impact.multiplier}x ` : ''}{impact.books}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Healthcare Support
                </h4>
                <p className="text-sm opacity-90">
                  {impact.multiplier > 1 ? `${impact.multiplier}x ` : ''}{impact.healthcare}
                </p>
              </div>
            </div>

            {/* Yearly Impact Summary */}
            {selectedPeriod === 'monthly' && (
              <div className="mt-8 p-4 bg-yellow-500/20 backdrop-blur-sm rounded-lg">
                <h4 className="font-bold mb-2">Annual Impact Summary</h4>
                <p className="text-sm">
                  Your monthly donation of ₹{amount.toLocaleString()} creates 
                  <span className="font-bold"> ₹{yearlyImpact.toLocaleString()}</span> worth 
                  of impact every year!
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}