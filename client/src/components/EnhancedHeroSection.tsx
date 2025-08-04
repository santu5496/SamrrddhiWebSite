import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Play,
  Shield,
  Star,
  Clock,
  Target
} from "lucide-react";
import { HeroContent } from "@shared/schema";

export default function EnhancedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [urgentProgress, setUrgentProgress] = useState(75); // Current progress toward urgent goal

  const { data: heroContent } = useQuery<HeroContent>({
    queryKey: ["/api/hero"],
  });

  const heroSlides = [
    {
      title: "Transform Lives Through Education",
      subtitle: "Empowering rural girls and specially-abled children since 1995",
      cta: "Make a Difference Today",
      stats: "501+ Children Supported",
      urgent: true
    },
    {
      title: "Every Child Deserves a Future",
      subtitle: "Your support provides education, shelter, and hope to those who need it most",
      cta: "Join Our Mission",
      stats: "29 Years of Service",
      urgent: false
    },
    {
      title: "Education Changes Everything",
      subtitle: "From rural villages to bright futures - see the transformation your donation creates",
      cta: "See Our Impact",
      stats: "605+ Special Needs Supported",
      urgent: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const urgentCampaign = {
    title: "URGENT: Help 50 Girls Continue Education",
    raised: 245000,
    target: 500000,
    daysLeft: 15,
    supporters: 123
  };

  const progressPercentage = (urgentCampaign.raised / urgentCampaign.target) * 100;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform skew-y-12"></div>
      </div>

      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: heroContent?.backgroundImageUrl 
            ? `url(${heroContent.backgroundImageUrl})` 
            : 'url(/api/placeholder/1920/1080)'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 min-h-screen items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Urgent Banner */}
            <div className="bg-red-500/90 backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center animate-pulse">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-bold">URGENT CAMPAIGN - {urgentCampaign.daysLeft} DAYS LEFT</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {heroContent?.headline || heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                {heroContent?.subheading || heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                  {heroContent?.yearsOfService || "29"}
                </div>
                <div className="text-sm text-white/80">Years Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400">
                  {heroContent?.childrenSupported || "501+"}
                </div>
                <div className="text-sm text-white/80">Children Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">
                  {heroContent?.corePrograms || "8"}
                </div>
                <div className="text-sm text-white/80">Core Programs</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-500/90 text-white px-3 py-1">
                <Shield className="h-4 w-4 mr-1" />
                80G Tax Benefits
              </Badge>
              <Badge className="bg-blue-500/90 text-white px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                Govt Registered
              </Badge>
              <Badge className="bg-purple-500/90 text-white px-3 py-1">
                <Award className="h-4 w-4 mr-1" />
                29 Years Trusted
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-5 w-5 mr-2" />
                DONATE NOW
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 text-lg rounded-lg"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-5 w-5 mr-2" />
                See Our Story
              </Button>
            </div>
          </div>

          {/* Right Content - Urgent Campaign Card */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm text-gray-900 p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-6">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 font-bold">
                  🚨 URGENT CAMPAIGN
                </div>
                <h3 className="text-2xl font-bold mb-2">{urgentCampaign.title}</h3>
                <p className="text-gray-600">
                  Help us reach our emergency fundraising goal to ensure no child drops out during exam season.
                </p>
              </div>

              {/* Progress Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Progress</span>
                  <span className="font-bold text-lg">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{(urgentCampaign.raised/1000).toFixed(0)}K raised</span>
                  <span>₹{(urgentCampaign.target/1000).toFixed(0)}K goal</span>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{urgentCampaign.supporters}</div>
                  <div className="text-xs text-gray-600">Supporters</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">{urgentCampaign.daysLeft}</div>
                  <div className="text-xs text-gray-600">Days Left</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">50</div>
                  <div className="text-xs text-gray-600">Girls Helped</div>
                </div>
              </div>

              {/* Quick Donation Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[1500, 3000, 5000, 10000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                    onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Target className="h-5 w-5 mr-2" />
                SUPPORT THIS CAMPAIGN
              </Button>
            </Card>

            {/* Social Proof */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-4 text-center">Recent Supporters</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dr. Priya S. donated</span>
                  <span className="font-bold">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Anonymous donated</span>
                  <span className="font-bold">₹2,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Rajesh K. donated</span>
                  <span className="font-bold">₹10,000</span>
                </div>
              </div>
              <p className="text-center text-xs mt-4 opacity-75">
                Join 123+ supporters who believe in education for all
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}