import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, CheckCircle, ArrowRight, Gift } from "lucide-react";

export default function DonationCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              DONATE NOW
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Generous contributions are welcome. You can donate with monthly or one time donations. 
              Your support directly transforms lives and creates lasting change.
            </p>
            
            {/* Key Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-3 text-green-300" />
                <span className="text-lg">80G Tax Benefits Available</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-300" />
                <span className="text-lg">Secure & Safe Transactions</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-6 w-6 mr-3 text-green-300" />
                <span className="text-lg">Direct Impact on Children's Lives</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-red-500 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              CLICK HERE TO DONATE
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Right Content - Impact Visual */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Your Impact Today</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/20 backdrop-blur-sm border-0 p-4 text-center">
                <Gift className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold">₹500</div>
                <div className="text-sm text-white/90">Monthly supplies for 1 child</div>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-sm border-0 p-4 text-center">
                <Heart className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold">₹1,500</div>
                <div className="text-sm text-white/90">Complete monthly support</div>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-sm border-0 p-4 text-center">
                <CheckCircle className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold">₹5,000</div>
                <div className="text-sm text-white/90">Educational materials for 10</div>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-sm border-0 p-4 text-center">
                <Shield className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold">₹18,000</div>
                <div className="text-sm text-white/90">Full year sponsorship</div>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-center text-sm text-white/90">
                <strong>Every rupee counts!</strong> Your donation, no matter the amount, 
                makes a meaningful difference in a child's life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}