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
  const [urgentProgress, setUrgentProgress] = useState(75);

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
    <section className="relative min-h-screen overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-shift"></div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300/15 rounded-full blur-md animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-300/10 rounded-full blur-lg animate-pulse-slow"></div>
      </div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce-in" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-bounce-in" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-3/4 w-3 h-3 bg-purple-300/20 rounded-full animate-bounce-in" style={{animationDelay: '1.5s'}}></div>
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-white">
        <div className="grid lg:grid-cols-2 gap-12 min-h-screen items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            {/* Urgent Banner */}
            <div className="bg-red-500/90 glass-card backdrop-blur-sm rounded-full px-6 py-3 inline-flex items-center animate-pulse hover-glow">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-bold">URGENT CAMPAIGN - {urgentCampaign.daysLeft} DAYS LEFT</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight gradient-text-animated">
                {heroContent?.headline || heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed animate-fade-in-up animate-delay-300">
                {heroContent?.subheading || heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-6 stagger-children">
              <div className="text-center glass-card p-4 hover-lift">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 animate-scale-in">
                  {heroContent?.yearsOfService || "29"}
                </div>
                <div className="text-sm text-white/80">Years Service</div>
              </div>
              <div className="text-center glass-card p-4 hover-lift">
                <div className="text-3xl md:text-4xl font-bold text-green-400 animate-scale-in">
                  {heroContent?.childrenSupported || "501+"}
                </div>
                <div className="text-sm text-white/80">Children Helped</div>
              </div>
              <div className="text-center glass-card p-4 hover-lift">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 animate-scale-in">
                  {heroContent?.corePrograms || "8"}
                </div>
                <div className="text-sm text-white/80">Core Programs</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3 stagger-children">
              <Badge className="glass-button text-white px-3 py-1 hover-scale">
                <Shield className="h-4 w-4 mr-1" />
                80G Tax Benefits
              </Badge>
              <Badge className="glass-button text-white px-3 py-1 hover-scale">
                <Star className="h-4 w-4 mr-1" />
                Govt Registered
              </Badge>
              <Badge className="glass-button text-white px-3 py-1 hover-scale">
                <Award className="h-4 w-4 mr-1" />
                29 Years Trusted
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-2xl hover-lift hover-glow animate-bounce-in"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-5 w-5 mr-2" />
                DONATE NOW
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                className="glass-button text-white font-bold px-8 py-4 text-lg rounded-lg animate-fade-in-right"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-5 w-5 mr-2" />
                See Our Story
              </Button>
            </div>
          </div>

          {/* Right Content - Urgent Campaign Card */}
          <div className="space-y-6 animate-fade-in-right">
            <Card className="modern-card p-8 text-white">
              <div className="space-y-6">
                <div className="text-center">
                  <Badge className="bg-red-500 text-white px-4 py-2 text-lg font-bold">
                    URGENT CAMPAIGN
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-center">
                  {urgentCampaign.title}
                </h3>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raised: ₹{urgentCampaign.raised.toLocaleString()}</span>
                    <span>Goal: ₹{urgentCampaign.target.toLocaleString()}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-white/20" />
                  <div className="text-center text-lg font-bold text-green-400">
                    {Math.round(progressPercentage)}% Complete
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-yellow-400">{urgentCampaign.daysLeft}</div>
                    <div className="text-sm text-white/80">Days Left</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-blue-400">{urgentCampaign.supporters}</div>
                    <div className="text-sm text-white/80">Supporters</div>
                  </div>
                </div>

                {/* Urgent CTA */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-lg shadow-lg hover-lift animate-pulse-slow"
                  onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Target className="h-5 w-5 mr-2" />
                  SUPPORT THIS URGENT CAUSE
                </Button>
              </div>
            </Card>

            {/* Additional Impact Showcase */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center hover-lift">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-lg font-bold">Communities</div>
                <div className="text-2xl font-bold text-blue-400">12+</div>
              </div>
              <div className="glass-card p-4 text-center hover-lift">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-lg font-bold">Programs</div>
                <div className="text-2xl font-bold text-green-400">8+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}