import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  GraduationCap, 
  TreePine, 
  HandHeart, 
  Home,
  ArrowRight,
  Trophy,
  Calendar
} from "lucide-react";

export default function VidyaranyaInspiredStats() {
  const [counts, setCounts] = useState({
    children: 0,
    specialNeeds: 0,
    women: 0,
    seniors: 0,
    trees: 0,
    initiatives: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targetCounts = {
      children: 501,
      specialNeeds: 605,
      women: 205,
      seniors: 5,
      trees: 30005,
      initiatives: 1505
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        children: Math.floor(targetCounts.children * progress),
        specialNeeds: Math.floor(targetCounts.specialNeeds * progress),
        women: Math.floor(targetCounts.women * progress),
        seniors: Math.floor(targetCounts.seniors * progress),
        trees: Math.floor(targetCounts.trees * progress),
        initiatives: Math.floor(targetCounts.initiatives * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      icon: Users,
      count: `${counts.children}+`,
      title: "Children",
      subtitle: "Provided Shelter & Education",
      color: "bg-blue-500",
      link: "#programs"
    },
    {
      icon: Heart,
      count: `${counts.specialNeeds}+`,
      title: "Children With Special Needs",
      subtitle: "Sheltered, Supported & Skilled",
      color: "bg-red-500",
      link: "#programs"
    },
    {
      icon: GraduationCap,
      count: `${counts.women}+`,
      title: "Women Empowerment",
      subtitle: "Rehabilitate & Empowerment",
      color: "bg-purple-500",
      link: "#programs"
    },
    {
      icon: Home,
      count: `${counts.seniors}+`,
      title: "Senior Citizen",
      subtitle: "Provided Shelter & Supported",
      color: "bg-green-500",
      link: "#programs"
    },
    {
      icon: TreePine,
      count: `${counts.trees}+`,
      title: "Trees",
      subtitle: "Planted",
      color: "bg-emerald-600",
      link: "#environment"
    },
    {
      icon: HandHeart,
      count: `${counts.initiatives}+`,
      title: "Community Initiatives",
      subtitle: "Organized & Handled",
      color: "bg-orange-500",
      link: "#community"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero-style Header */}
        <div className="text-center mb-16">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              TOWARDS
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">
              SUSTAINABLE CHANGE
            </h2>
          </div>
          <Button 
            size="lg" 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => document.getElementById('how-to-help')?.scrollIntoView({ behavior: 'smooth' })}
          >
            HOW YOU CAN HELP
          </Button>
        </div>

        {/* Impact Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => {
                  const element = document.querySelector(stat.link);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Count */}
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.count}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-gray-600 mb-4">
                    {stat.subtitle}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join Us in Creating Sustainable Change
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Every contribution, no matter the size, makes a meaningful difference in the lives of those we serve. 
              Your support helps us continue our mission of empowerment and education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4"
                onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <HandHeart className="h-5 w-5 mr-2" />
                Volunteer with Us
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">All our efforts are made possible</h4>
            <p className="text-gray-600 text-sm">only because of your support</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Your donations are tax exempted</h4>
            <p className="text-gray-600 text-sm">under 80G of the Indian Income Tax Act</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <HandHeart className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Your donation transactions</h4>
            <p className="text-gray-600 text-sm">are completely safe and secure</p>
          </div>
        </div>
      </div>
    </section>
  );
}