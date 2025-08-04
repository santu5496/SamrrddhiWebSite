import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Crown, 
  Star, 
  Heart, 
  Gift, 
  Medal,
  Users,
  Calendar,
  Trophy,
  Sparkles
} from "lucide-react";

export default function DonorRecognitionWall() {
  const topDonors = [
    {
      name: "Dr. Priya Sharma",
      amount: 50000,
      type: "Platinum Supporter",
      duration: "2 years",
      avatar: "/api/placeholder/80/80",
      message: "Education is the most powerful weapon to change the world.",
      impact: "Sponsored 3 girls' complete education",
      tier: "platinum"
    },
    {
      name: "Rajesh Industries Ltd.",
      amount: 100000,
      type: "Corporate Champion",
      duration: "3 years",
      avatar: "/api/placeholder/80/80",
      message: "Proud to support rural education initiatives.",
      impact: "Built classroom infrastructure",
      tier: "diamond"
    },
    {
      name: "The Kumar Family",
      amount: 25000,
      type: "Gold Supporter",
      duration: "18 months",
      avatar: "/api/placeholder/80/80",
      message: "Every child deserves a chance to learn and grow.",
      impact: "Monthly nutrition support for 15 children",
      tier: "gold"
    },
    {
      name: "Ms. Anita Verma",
      amount: 15000,
      type: "Silver Supporter",
      duration: "1 year",
      avatar: "/api/placeholder/80/80",
      message: "Small steps can create big changes.",
      impact: "Educational supplies for 30 children",
      tier: "silver"
    },
    {
      name: "Tech Solutions Pvt Ltd",
      amount: 75000,
      type: "Technology Partner",
      duration: "6 months",
      avatar: "/api/placeholder/80/80",
      message: "Bridging the digital divide in rural education.",
      impact: "Computer lab setup and maintenance",
      tier: "platinum"
    },
    {
      name: "Anonymous Donor",
      amount: 30000,
      type: "Community Hero",
      duration: "8 months",
      avatar: "/api/placeholder/80/80",
      message: "Giving back to society is our responsibility.",
      impact: "Healthcare support for 50 children",
      tier: "gold"
    }
  ];

  const recentDonations = [
    { name: "Suresh M.", amount: 2000, time: "2 hours ago", anonymous: false },
    { name: "Anonymous", amount: 5000, time: "5 hours ago", anonymous: true },
    { name: "Meera K.", amount: 1500, time: "1 day ago", anonymous: false },
    { name: "Corporate Donor", amount: 25000, time: "2 days ago", anonymous: false },
    { name: "Anonymous", amount: 3000, time: "3 days ago", anonymous: true },
  ];

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return { icon: Crown, color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' };
      case 'platinum':
        return { icon: Trophy, color: 'bg-gray-400', textColor: 'text-gray-700', bgColor: 'bg-gray-50' };
      case 'gold':
        return { icon: Medal, color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' };
      case 'silver':
        return { icon: Star, color: 'bg-gray-300', textColor: 'text-gray-600', bgColor: 'bg-gray-50' };
      default:
        return { icon: Heart, color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' };
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-purple-500 text-white px-6 py-3 rounded-full mb-6">
            <Sparkles className="h-5 w-5 mr-2" />
            Hall of Gratitude
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Celebrating Our Amazing Donors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These incredible individuals and organizations are making a real difference in children's lives. 
            Join them in creating lasting impact!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Donors Wall */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Champion Supporters
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {topDonors.map((donor, index) => {
                const tierConfig = getTierConfig(donor.tier);
                const TierIcon = tierConfig.icon;
                
                return (
                  <Card key={index} className={`p-6 ${tierConfig.bgColor} border-l-4 border-l-${tierConfig.color.split('-')[1]}-500 hover:shadow-lg transition-shadow`}>
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={donor.avatar} alt={donor.name} />
                          <AvatarFallback className="bg-primary text-white">
                            {donor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -top-1 -right-1 ${tierConfig.color} rounded-full p-1`}>
                          <TierIcon className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{donor.name}</h4>
                        <Badge variant="secondary" className={`${tierConfig.textColor} text-xs mb-2`}>
                          {donor.type}
                        </Badge>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold">₹{donor.amount.toLocaleString()}</span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {donor.duration}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 italic mb-2">"{donor.message}"</p>
                        
                        <div className="bg-white/50 rounded p-2 text-xs">
                          <span className="font-semibold text-green-700">Impact: </span>
                          <span className="text-gray-600">{donor.impact}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Donations & Call to Action */}
          <div>
            {/* Recent Donations */}
            <Card className="p-6 mb-6 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Recent Donations
              </h3>
              
              <div className="space-y-3">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {donation.anonymous ? "Anonymous Donor" : donation.name}
                        </div>
                        <div className="text-xs text-gray-500">{donation.time}</div>
                      </div>
                    </div>
                    <div className="font-bold text-green-600">
                      ₹{donation.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Join the Wall CTA */}
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <h3 className="text-xl font-bold mb-4 text-center">Join Our Recognition Wall!</h3>
              
              <div className="text-center mb-6">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <p className="text-sm opacity-90">
                  Become a recognized supporter and inspire others to give. 
                  Your contribution will be celebrated here!
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Recognition Tiers:</h4>
                <div className="space-y-1 text-sm">
                  <div>💎 Diamond: ₹1,00,000+</div>
                  <div>🏆 Platinum: ₹50,000+</div>
                  <div>🥇 Gold: ₹25,000+</div>
                  <div>⭐ Silver: ₹10,000+</div>
                  <div>❤️ Supporter: Any amount</div>
                </div>
              </div>

              <button 
                className="w-full bg-white text-red-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                DONATE & GET RECOGNIZED
              </button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}