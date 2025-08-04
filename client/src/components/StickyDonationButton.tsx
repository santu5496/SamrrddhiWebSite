import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowUp, X } from "lucide-react";

export default function StickyDonationButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToDonate = () => {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Expanded Quick Donation Panel */}
      {isExpanded && (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mb-3 w-80 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Quick Donation</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-2 gap-2">
              {[500, 1500, 3000, 5000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  onClick={scrollToDonate}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
            onClick={scrollToDonate}
          >
            <Heart className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            80G Tax Benefits • Secure Payment
          </p>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="flex flex-col space-y-3">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        {/* Main Donation Button */}
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 animate-pulse"
            title="Quick donation options"
          >
            <Heart className="h-6 w-6" />
          </button>
          
          {/* Notification Badge */}
          <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 px-2 py-1 text-xs font-bold animate-bounce">
            ₹50K Goal
          </Badge>
        </div>

        {/* Direct Donate Button */}
        <Button
          onClick={scrollToDonate}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          DONATE
        </Button>
      </div>
    </div>
  );
}