import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Users, 
  Heart, 
  Briefcase, 
  Shield, 
  TreePine,
  ArrowRight,
  CheckCircle,
  Target,
  Users2,
  Lightbulb,
  TrendingUp,
  Home,
  Utensils,
  Apple,
  Leaf,
  User,
  UserCheck,
  Zap
} from "lucide-react";
import { Program } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, any> = {
  "fas fa-home": Home,
  "fas fa-graduation-cap": GraduationCap,
  "fas fa-utensils": Utensils,
  "fas fa-apple": Apple,
  "fas fa-leaf": Leaf,
  "fas fa-heart": Heart,
  "fas fa-female": User,
  "fas fa-wheelchair": UserCheck,
  "fas fa-fist-raised": Zap,
  "fas fa-user-friends": Users,
};

const getIconComponent = (iconClass: string) => {
  return iconMap[iconClass] || GraduationCap;
};

const categoryLabels: Record<string, string> = {
  'education-childcare': 'Education & Child Care',
  'skill-development': 'Skill Development & Livelihood',
  'healthcare-nutrition': 'Healthcare & Nutrition',
  'empowerment': 'Women Empowerment',
  'community-development': 'Community Development',
  'environment': 'Environment & Sustainability',
  'childcare-orphan': 'Child Care & Shelter',
  'self-defense': 'Self-Defense Training',
  'women-empowerment': 'Women Empowerment',
  'elderly-care': 'Elderly Care Services'
};

export default function WhatWeDoSection() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });
  const animationRef = useScrollAnimation();

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-optimized">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50" id="what-we-do">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-optimized">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 fade-in-section" ref={animationRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral mb-4">
            WHAT WE DO
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mobile-text">
            Samruddhi Service Society extends comprehensive support across multiple domains, 
            creating lasting impact through education, empowerment, healthcare, and community development. 
            Each program is designed to address specific needs and create sustainable change.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {programs?.map((program, index) => {
            const IconComponent = getIconComponent(program.icon);
            const categoryColor = index % 8 === 0 ? 'bg-blue-500' :
                                 index % 8 === 1 ? 'bg-purple-500' :
                                 index % 8 === 2 ? 'bg-green-500' :
                                 index % 8 === 3 ? 'bg-orange-500' :
                                 index % 8 === 4 ? 'bg-red-500' :
                                 index % 8 === 5 ? 'bg-pink-500' :
                                 index % 8 === 6 ? 'bg-emerald-500' : 'bg-indigo-500';
            
            return (
              <Card 
                key={program.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden touch-target"
              >
                {/* Header with Icon and Category */}
                <div className={`${categoryColor} p-4 sm:p-6 text-white relative`}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <IconComponent className="h-8 w-8 sm:h-10 sm:w-10" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                      {categoryLabels[program.category] || 'Program'}
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{program.title}</h3>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base mobile-text">
                    {program.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button 
                      className="flex-1 text-sm sm:text-base touch-target"
                      size="sm"
                      onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Support This Program
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-sm sm:text-base touch-target"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Every Program Makes a Difference
          </h3>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto mobile-text">
            Your support enables us to expand these programs and reach more beneficiaries. 
            Join us in creating sustainable change that transforms lives and builds stronger communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 touch-target"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Support Our Programs
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 touch-target"
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Volunteer With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}