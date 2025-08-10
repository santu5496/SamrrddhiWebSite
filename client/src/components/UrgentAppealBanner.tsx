import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Clock, Heart, Target, Users } from "lucide-react";

export default function UrgentAppealBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer for urgent campaign
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentAmount = 245000; // Current raised amount
  const targetAmount = 500000; // Target amount
  const progressPercentage = (currentAmount / targetAmount) * 100;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      {/* Enhanced life-changing animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-white rounded-full animate-heart-beat"></div>
        <div className="absolute top-8 right-12 w-16 h-16 bg-yellow-300 rounded-full animate-donation-glow"></div>
        <div className="absolute bottom-6 left-1/3 w-24 h-24 bg-orange-200 rounded-full animate-life-impact" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-4 left-1/2 w-12 h-12 bg-pink-300 rounded-full animate-save-life" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-2 right-1/4 w-20 h-20 bg-blue-200 rounded-full animate-help-transform" style={{animationDelay: '1.5s'}}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Urgent Appeal Content */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2 animate-donation-glow">
              <AlertCircle className="h-5 w-5 mr-2 animate-heart-beat" />
              <span className="font-semibold">URGENT APPEAL</span>
            </div>
            <div className="hidden md:block animate-life-impact">
              <h3 className="font-bold text-lg gradient-text-animated">Help 50 Girls Continue Their Education!</h3>
              <p className="text-sm opacity-90 animate-help-transform">Your support can prevent dropout during exam season</p>
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-3 mb-2">
                <Progress value={progressPercentage} className="w-24 h-2 bg-white/30" />
              </div>
              <div className="text-sm">
                <div className="font-bold">₹{(currentAmount/1000).toFixed(0)}K raised</div>
                <div className="opacity-90">of ₹{(targetAmount/1000).toFixed(0)}K goal</div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex space-x-2 text-center">
              <div className="bg-white/20 rounded px-2 py-1">
                <div className="font-bold text-lg">{timeLeft.days}</div>
                <div className="text-xs">DAYS</div>
              </div>
              <div className="bg-white/20 rounded px-2 py-1">
                <div className="font-bold text-lg">{timeLeft.hours}</div>
                <div className="text-xs">HRS</div>
              </div>
              <div className="bg-white/20 rounded px-2 py-1">
                <div className="font-bold text-lg">{timeLeft.minutes}</div>
                <div className="text-xs">MIN</div>
              </div>
            </div>

            <Button 
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-6 py-2 rounded-lg shadow-lg animate-pulse"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              DONATE NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}