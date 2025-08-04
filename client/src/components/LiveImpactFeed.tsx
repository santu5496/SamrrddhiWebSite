import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  BookOpen, 
  Heart, 
  Users, 
  Calendar,
  MapPin,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

export default function LiveImpactFeed() {
  const [currentImpact, setCurrentImpact] = useState(0);
  const [liveUpdates, setLiveUpdates] = useState([
    {
      id: 1,
      type: "milestone",
      message: "50th girl enrolled this month!",
      location: "Village Kumharpura",
      timestamp: "2 minutes ago",
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: 2,
      type: "donation",
      message: "₹5,000 donation received - Thank you!",
      location: "Online",
      timestamp: "15 minutes ago",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      id: 3,
      type: "education",
      message: "New computer lab setup completed",
      location: "Main Campus",
      timestamp: "1 hour ago",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      id: 4,
      type: "health",
      message: "Health checkup camp for 25 children",
      location: "Village Rampura",
      timestamp: "3 hours ago",
      icon: CheckCircle,
      color: "bg-purple-500"
    },
    {
      id: 5,
      type: "achievement",
      message: "Priya scored 95% in board exams!",
      location: "Grade 12",
      timestamp: "6 hours ago",
      icon: TrendingUp,
      color: "bg-yellow-500"
    }
  ]);

  // Real-time impact counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImpact(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate live updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const newUpdate = {
        id: Date.now(),
        type: "donation",
        message: `₹${Math.floor(Math.random() * 5000) + 500} donation received - Thank you!`,
        location: "Online",
        timestamp: "Just now",
        icon: Heart,
        color: "bg-red-500"
      };

      setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(updateInterval);
  }, []);

  const todayStats = {
    donations: 12,
    amount: 45000,
    newChildren: 3,
    mealsServed: 180
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full mb-6 animate-pulse">
            <Activity className="h-5 w-5 mr-2" />
            Live Impact Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-Time Impact Happening Now
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the immediate impact of donations as it happens. Every contribution creates 
            real change in children's lives right now!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Stats Dashboard */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-xl border-l-4 border-l-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-green-500" />
                Today's Impact
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{todayStats.donations}</div>
                    <div className="text-sm text-gray-600">Donations</div>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-green-600">₹{todayStats.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Amount Raised</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{todayStats.newChildren}</div>
                    <div className="text-sm text-gray-600">New Admissions</div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{todayStats.mealsServed}</div>
                    <div className="text-sm text-gray-600">Meals Served</div>
                  </div>
                  <BookOpen className="h-8 w-8 text-yellow-500" />
                </div>
              </div>

              {/* Live Counter */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center">
                <div className="text-sm opacity-90 mb-1">Lives Impacted Counter</div>
                <div className="text-3xl font-bold animate-pulse">
                  {(501 + currentImpact).toLocaleString()}
                </div>
                <div className="text-sm opacity-90">And counting...</div>
              </div>
            </Card>
          </div>

          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Live Activity Feed
                <Badge className="ml-3 bg-green-500 animate-pulse">LIVE</Badge>
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {liveUpdates.map((update) => {
                  const IconComponent = update.icon;
                  
                  return (
                    <div key={update.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`${update.color} rounded-full p-2 flex-shrink-0`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{update.message}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {update.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {update.timestamp}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {update.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subscription CTA */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                <h4 className="font-bold mb-2">Stay Updated!</h4>
                <p className="text-sm opacity-90 mb-3">
                  Get real-time notifications about the impact of your donations and our latest activities.
                </p>
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded font-semibold text-sm transition-colors">
                  Subscribe to Updates
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">Be Part of This Impact!</h3>
            <p className="mb-6 opacity-90">
              Your donation will appear in this live feed within minutes and start making a difference immediately.
            </p>
            <button 
              className="bg-white text-red-500 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-colors shadow-lg"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              DONATE NOW & SEE YOUR IMPACT LIVE
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}