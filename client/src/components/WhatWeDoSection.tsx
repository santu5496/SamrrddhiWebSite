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
  TrendingUp
} from "lucide-react";
import { Program } from "@shared/schema";

const iconMap = {
  GraduationCap,
  Users,
  Heart,
  Briefcase,
  Shield,
  TreePine,
  Users2
};

export default function WhatWeDoSection() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const categoryColors = {
    'education-childcare': 'bg-blue-500',
    'women-empowerment': 'bg-pink-500',
    'senior-care': 'bg-green-500',
    'skill-development': 'bg-purple-500',
    'health': 'bg-red-500',
    'community-development': 'bg-orange-500',
    'environment': 'bg-emerald-500'
  };

  const categoryLabels = {
    'education-childcare': 'Education & Child Care',
    'women-empowerment': 'Women Empowerment',
    'senior-care': 'Senior Care',
    'skill-development': 'Skill Development & Livelihood',
    'health': 'Health & Wellness',
    'community-development': 'Community Development',
    'environment': 'Environment & Sustainability'
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="what-we-do">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            WHAT WE DO
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Samruddhi Service Society extends comprehensive support across multiple domains, 
            creating lasting impact through education, empowerment, healthcare, and community development. 
            Each program is designed to address specific needs and create sustainable change.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs?.map((program) => {
            const IconComponent = iconMap[program.icon as keyof typeof iconMap] || GraduationCap;
            const colorClass = categoryColors[program.category as keyof typeof categoryColors] || 'bg-gray-500';
            
            return (
              <Card 
                key={program.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Header with Icon and Category */}
                <div className={`${colorClass} p-6 text-white relative`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-10 w-10" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {categoryLabels[program.category as keyof typeof categoryLabels]}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold">{program.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Key Objectives */}
                  {program.objectives && program.objectives.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-blue-500" />
                        Key Objectives
                      </h4>
                      <div className="space-y-2">
                        {program.objectives.slice(0, 2).map((objective, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{objective}</span>
                          </div>
                        ))}
                        {program.objectives.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{program.objectives.length - 2} more objectives
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Target Group */}
                  {program.targetGroup && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Users2 className="h-4 w-4 mr-2 text-purple-500" />
                        Target Group
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {program.targetGroup}
                      </p>
                    </div>
                  )}

                  {/* Components/Services */}
                  {program.components && program.components.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-orange-500" />
                        Our Services
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {program.components.slice(0, 4).map((component, index) => (
                          <div key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {component}
                          </div>
                        ))}
                      </div>
                      {program.components.length > 4 && (
                        <div className="text-xs text-gray-500 mt-2">
                          +{program.components.length - 4} more services
                        </div>
                      )}
                    </div>
                  )}

                  {/* Future Initiatives */}
                  {program.futureInitiatives && program.futureInitiatives.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                        Future Plans
                      </h4>
                      <div className="text-sm text-gray-600">
                        {program.futureInitiatives.slice(0, 2).join(", ")}
                        {program.futureInitiatives.length > 2 && "..."}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Support This Program
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
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
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Every Program Makes a Difference
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your support enables us to expand these programs and reach more beneficiaries. 
            Join us in creating sustainable change that transforms lives and builds stronger communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="h-5 w-5 mr-2" />
              Support Our Programs
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4"
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="h-5 w-5 mr-2" />
              Volunteer With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}