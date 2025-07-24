import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Book, Tag } from "lucide-react";
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
    <section id="donate" className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Difference Today</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your support directly impacts the lives of rural girls and differently-abled children. Every contribution helps us provide education, shelter, and hope.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
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
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className={`p-4 rounded-lg transition-all font-semibold ${
                    selectedAmount === amount 
                      ? "bg-secondary text-white border-secondary" 
                      : "border-secondary text-secondary hover:bg-secondary hover:text-white"
                  }`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  ₹{amount}
                </Button>
              ))}
              <Button
                variant={selectedAmount && !presetAmounts.includes(selectedAmount) ? "default" : "outline"}
                className={`p-4 rounded-lg transition-all font-semibold ${
                  selectedAmount && !presetAmounts.includes(selectedAmount)
                    ? "bg-secondary text-white border-secondary" 
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
              className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold transition-colors mb-4"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
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
