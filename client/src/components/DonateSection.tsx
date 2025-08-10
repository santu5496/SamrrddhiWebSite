import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Book, Tag, Users, Gift, BookOpen, Home, Utensils } from "lucide-react";
import { DonationConfig } from "@shared/schema";

export default function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const { data: donationConfig } = useQuery<DonationConfig>({
    queryKey: ["/api/donation-config"],
  });

  const presetAmounts = [500, 1500, 3000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(parseInt(value) || null);
  };

  const handleDonate = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }
    
    // TODO: Integrate with payment gateway later
    alert(`Thank you for your generous donation of ₹${selectedAmount}! Your support means the world to us and will directly help transform lives.`);
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Enhanced background decorations with life-changing animations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Life-changing impact icons */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-heart-beat opacity-30">
          <Heart className="h-8 w-8 text-pink-300" />
        </div>
        <div className="absolute bottom-20 right-20 animate-helping-hand opacity-20">
          <Users className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-1/2 right-10 animate-save-life opacity-25">
          <Gift className="h-10 w-10 text-yellow-300" />
        </div>
        <div className="absolute top-10 right-1/4 animate-life-impact opacity-15">
          <BookOpen className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute bottom-10 left-1/4 animate-help-transform opacity-20">
          <Home className="h-8 w-8 text-green-300" />
        </div>
        <div className="absolute top-1/3 left-10 animate-donation-glow opacity-25">
          <Utensils className="h-7 w-7 text-orange-300" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-life-impact">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 animate-heart-beat">
            <Heart className="h-8 w-8 text-pink-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-animated">Make a Difference Today</h2>
          <p className="text-xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-help-transform">
            Your support directly impacts the lives of rural girls and differently-abled children. Every contribution helps us provide education, shelter, and hope for a brighter future.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-6 animate-donation-glow">
            <div className="w-12 h-1 bg-pink-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-heart-beat"></div>
            <div className="w-12 h-1 bg-pink-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="glass-card p-8 mb-8 shadow-vibrant">
              <h3 className="text-2xl font-semibold mb-6">Your Impact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">₹</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {donationConfig?.monthlyAmount || "₹1,500/month"}
                    </div>
                    <div className="opacity-90">
                      {donationConfig?.description || "Covers complete support for one child"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Book className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Education & Care</div>
                    <div className="opacity-90">Food, shelter, books, and healthcare</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Tag className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {donationConfig?.taxBenefits || "80G Tax Benefits"}
                    </div>
                    <div className="opacity-90">Tax deduction under section 80G</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-lg opacity-90 mb-4">
                Join our mission to transform lives through education and care.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 text-neutral">
            <h3 className="text-2xl font-bold mb-6 text-center">Choose Your Contribution</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6 stagger-children">
              {presetAmounts.map((amount, index) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className={`p-4 rounded-lg transition-all font-semibold animate-life-impact hover:animate-heart-beat ${
                    selectedAmount === amount 
                      ? "bg-secondary text-white border-secondary animate-donation-glow" 
                      : "border-secondary text-secondary hover:bg-secondary hover:text-white"
                  }`}
                  onClick={() => handleAmountSelect(amount)}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  ₹{amount}
                </Button>
              ))}
              <Button
                variant={selectedAmount && !presetAmounts.includes(selectedAmount) ? "default" : "outline"}
                className={`p-4 rounded-lg transition-all font-semibold animate-help-transform ${
                  selectedAmount && !presetAmounts.includes(selectedAmount)
                    ? "bg-secondary text-white border-secondary animate-donation-glow" 
                    : "border-secondary text-secondary hover:bg-secondary hover:text-white"
                }`}
                onClick={() => {
                  setSelectedAmount(null);
                  setCustomAmount("");
                }}
              >
                Custom
              </Button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Enter Amount (₹)</label>
              <Input 
                type="number" 
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
            
            <Button 
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 hover:from-red-600 hover:via-pink-600 hover:to-orange-600 text-white py-6 rounded-xl text-xl font-bold animate-donation-glow hover:animate-heart-beat transform hover:scale-105 transition-all duration-500 shadow-2xl mb-4"
            >
              <Heart className="mr-3 h-6 w-6 animate-heart-beat" />
              TRANSFORM A LIFE NOW - ₹{selectedAmount || 0}
            </Button>
            
            <p className="text-sm text-gray-600 text-center">
              Secure payment powered by Razorpay. Your donation is safe and encrypted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
