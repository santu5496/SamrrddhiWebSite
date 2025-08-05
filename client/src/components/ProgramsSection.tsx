import { useQuery } from "@tanstack/react-query";
import { Home, GraduationCap, Utensils, Users, Heart, Shield, X, ExternalLink, Apple, Leaf, Droplets, User, UserCheck, Zap } from "lucide-react";
import { Program } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return iconMap[iconClass] || Home;
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

export default function ProgramsSection() {
  const { data: apiPrograms, isLoading, error } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });
  const animationRef = useScrollAnimation();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Hardcoded programs to ensure all 12 are displayed
  const hardcodedPrograms: Program[] = [
    {
      id: 1,
      title: "Free Girls' Hostel",
      description: "Safe accommodation and nutritious meals for underprivileged rural girls from 7th to 10th standard, providing a secure environment for education.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-home",
      category: "education-childcare",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 1,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 2,
      title: "Special Education Center (IDC)",
      description: "Integrated Education for Disabled Children - comprehensive educational support and specialized care for differently-abled children to promote inclusive learning.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-wheelchair",
      category: "education-childcare",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 2,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 3,
      title: "Skill Development Programs",
      description: "Vocational training programs including tailoring, embroidery, computer skills, and handicrafts for sustainable livelihood opportunities.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-graduation-cap",
      category: "skill-development",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 3,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 4,
      title: "Nutrition & Mid-Day Meal Program",
      description: "Ensuring proper nutrition for children through balanced meals, addressing malnutrition and supporting healthy growth and development.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-utensils",
      category: "healthcare-nutrition",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 4,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 5,
      title: "Healthcare & Medical Support",
      description: "Regular health checkups, medical treatment, vaccination drives, and health awareness programs for community wellness.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-heart",
      category: "healthcare-nutrition",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 5,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 6,
      title: "Women Empowerment Initiative",
      description: "Comprehensive programs for women including financial literacy, legal rights awareness, entrepreneurship training, and leadership development.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-female",
      category: "empowerment",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 6,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 7,
      title: "Community Development Projects",
      description: "Rural infrastructure development, clean water initiatives, sanitation programs, and community center establishment for overall village development.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-user-friends",
      category: "community-development",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 7,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 8,
      title: "Environmental Conservation",
      description: "Tree plantation drives, waste management programs, organic farming promotion, and environmental awareness campaigns for sustainable living.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-leaf",
      category: "environment",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 8,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 9,
      title: "Child Care & Shelter for Orphans",
      description: "Providing shelter, food, and education for children whose parents are not there - comprehensive care for non-parent children including accommodation, nutrition, and quality education.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-home",
      category: "childcare-orphan",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 9,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 10,
      title: "Free Karate Coaching for Rural Girls",
      description: "Empowering rural girls through free karate coaching to build self-defense skills, confidence, and physical strength for self-support and protection.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-fist-raised",
      category: "self-defense",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 10,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 11,
      title: "Women Empowerment Programs",
      description: "Comprehensive women empowerment initiatives including leadership training, financial independence, skill development, and awareness programs for rural women.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-female",
      category: "women-empowerment",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 11,
      isActive: true,
      createdAt: null,
      updatedAt: null
    },
    {
      id: 12,
      title: "Old Age Care Services",
      description: "Dedicated care services for elderly people including health support, social activities, nutrition programs, and companionship for senior citizens in rural areas.",
      detailedDescription: null,
      imageUrl: null,
      icon: "fas fa-user-friends",
      category: "elderly-care",
      objectives: null,
      targetGroup: null,
      howWeWork: null,
      components: null,
      futureInitiatives: null,
      orderIndex: 12,
      isActive: true,
      createdAt: null,
      updatedAt: null
    }
  ];

  // Use hardcoded programs to ensure all 12 display
  const programs = hardcodedPrograms;

  // Program-specific images based on program type
  const programImages: Record<string, string> = {
    "Free Girls' Hostel": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Special Education Center (IDC)": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Skill Development Programs": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Nutrition & Mid-Day Meal Program": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Healthcare & Medical Support": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Women Empowerment Initiative": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Community Development Projects": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Environmental Conservation": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Child Care & Shelter for Orphans": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Free Karate Coaching for Rural Girls": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Women Empowerment Programs": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    "Old Age Care Services": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  };

  const getImageForProgram = (programTitle: string): string => {
    return programImages[programTitle] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400";
  };

  return (
    <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-white mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-optimized">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 fade-in-section" ref={animationRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral mb-4">Our Programs</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mobile-text">
            Twelve comprehensive programs covering education, nutrition, healthcare, skill development, environmental conservation, women empowerment, community development, child care, self-defense training, and elderly care to create positive impact in rural communities.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4 sm:mt-6"></div>
        </div>
        
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading programs...</div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="text-lg text-red-600">Error loading programs: {error.message}</div>
          </div>
        )}
        
        {!isLoading && !error && (!programs || programs.length === 0) && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">No programs available.</div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {programs && programs.length > 0 ? (
            programs.map((program, index) => {
              const IconComponent = getIconComponent(program.icon);
              return (
                <div 
                  key={program.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group cursor-pointer touch-target"
                  onClick={() => setSelectedProgram(program)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={program.imageUrl || getImageForProgram(program.title)}
                      alt={program.title}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mr-2 sm:mr-3 transform group-hover:rotate-12 transition-transform duration-300 ${
                          index === 0 ? 'gradient-primary' : 
                          index === 1 ? 'gradient-secondary' : 
                          index === 2 ? 'gradient-accent' :
                          index === 3 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          index === 4 ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                          index === 5 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                          index === 6 ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                          index === 7 ? 'bg-gradient-to-r from-orange-500 to-amber-600' :
                          'bg-gradient-to-r from-blue-500 to-cyan-600'
                        }`}>
                          <IconComponent className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">{program.title}</h3>
                      </div>
                      <Badge variant="secondary" className="text-xs sm:text-sm bg-blue-100 text-blue-700">
                        {categoryLabels[program.category] || 'Program'}
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 mobile-text mb-4">
                      {program.description}
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center text-accent font-medium text-sm sm:text-base">
                      {program.title.includes("Girls") && (
                        <>
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span>50+ Girls Supported</span>
                        </>
                      )}
                      {program.title.includes("IDC") && (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          <span>Inclusive Education</span>
                        </>
                      )}
                      {program.title.includes("Food") && (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          <span>Complete Care</span>
                        </>
                      )}
                      {program.title.includes("Midday Meal") && (
                        <>
                          <Apple className="h-4 w-4 mr-2" />
                          <span>Nutritious School Meals</span>
                        </>
                      )}
                      {program.title.includes("Environmental") && (
                        <>
                          <Leaf className="h-4 w-4 mr-2" />
                          <span>Eco-Friendly Initiatives</span>
                        </>
                      )}
                      {program.title.includes("Blood Donation") && (
                        <>
                          <Droplets className="h-4 w-4 mr-2" />
                          <span>Save Lives Through Donation</span>
                        </>
                      )}
                      {program.title.includes("Women Empowerment") && (
                        <>
                          <User className="h-4 w-4 mr-2" />
                          <span>Leadership & Skills Development</span>
                        </>
                      )}
                      {program.title.includes("Old Age Care") && (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          <span>Comprehensive Elderly Support</span>
                        </>
                      )}
                      {program.title.includes("Orphan Care") && (
                        <>
                          <Users className="h-4 w-4 mr-2" />
                          <span>Complete Child Care & Education</span>
                        </>
                      )}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                      <Button 
                        className="flex-1 text-sm sm:text-base touch-target"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Support This Program
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-sm sm:text-base touch-target"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProgram(program);
                        }}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-lg text-gray-600">No programs available at the moment.</div>
            </div>
          )}
        </div>
      </div>

      {/* Program Details Modal */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-neutral mb-4">
                  {selectedProgram.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Program Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={selectedProgram.imageUrl || getImageForProgram(selectedProgram.title)}
                    alt={selectedProgram.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Program Description */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                {/* Program Details Based on Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProgram.title.includes("Girls") && (
                    <>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-blue-800">Key Features</h4>
                        <ul className="space-y-2 text-blue-700">
                          <li>• Free accommodation and meals</li>
                          <li>• Educational support and tutoring</li>
                          <li>• Life skills training</li>
                          <li>• Career guidance and counseling</li>
                          <li>• Health and wellness programs</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-green-800">Impact</h4>
                        <ul className="space-y-2 text-green-700">
                          <li>• 50+ girls currently supported</li>
                          <li>• 85% graduation rate</li>
                          <li>• 70% pursue higher education</li>
                          <li>• Safe environment for learning</li>
                          <li>• Breaking cycle of poverty</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("IDC") && (
                    <>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-purple-800">Services Provided</h4>
                        <ul className="space-y-2 text-purple-700">
                          <li>• Specialized education programs</li>
                          <li>• Physiotherapy and occupational therapy</li>
                          <li>• Speech and hearing therapy</li>
                          <li>• Adaptive learning tools</li>
                          <li>• Family counseling and support</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-orange-800">Impact</h4>
                        <ul className="space-y-2 text-orange-700">
                          <li>• 200+ special needs children served</li>
                          <li>• Individualized care plans</li>
                          <li>• Inclusive education approach</li>
                          <li>• Family empowerment programs</li>
                          <li>• Community integration initiatives</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Food") && (
                    <>
                      <div className="bg-red-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-red-800">Nutrition Program</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• Balanced daily meals</li>
                          <li>• Nutritional supplements</li>
                          <li>• Health monitoring</li>
                          <li>• Dietary counseling</li>
                          <li>• Growth tracking</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-yellow-800">Impact</h4>
                        <ul className="space-y-2 text-yellow-700">
                          <li>• 100% nutritional coverage</li>
                          <li>• Improved health outcomes</li>
                          <li>• Better academic performance</li>
                          <li>• Reduced malnutrition rates</li>
                          <li>• Enhanced physical development</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Midday Meal") && (
                    <>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-green-800">Program Features</h4>
                        <ul className="space-y-2 text-green-700">
                          <li>• Fresh, hot meals prepared daily</li>
                          <li>• Nutritionally balanced menu</li>
                          <li>• Local ingredient sourcing</li>
                          <li>• Hygiene and food safety standards</li>
                          <li>• Regular nutrition assessment</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-emerald-800">Impact</h4>
                        <ul className="space-y-2 text-emerald-700">
                          <li>• 300+ school children served daily</li>
                          <li>• 95% improvement in attendance</li>
                          <li>• Better concentration and learning</li>
                          <li>• Reduced dropout rates</li>
                          <li>• Enhanced physical development</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Environmental") && (
                    <>
                      <div className="bg-emerald-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-emerald-800">Conservation Activities</h4>
                        <ul className="space-y-2 text-emerald-700">
                          <li>• Tree plantation drives in rural areas</li>
                          <li>• Waste management and recycling programs</li>
                          <li>• Water conservation initiatives</li>
                          <li>• Organic farming promotion</li>
                          <li>• Environmental awareness workshops</li>
                        </ul>
                      </div>
                      <div className="bg-teal-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-teal-800">Impact</h4>
                        <ul className="space-y-2 text-teal-700">
                          <li>• 2,500+ trees planted annually</li>
                          <li>• 50+ villages reached with awareness</li>
                          <li>• Improved air and water quality</li>
                          <li>• Sustainable farming practices adopted</li>
                          <li>• Enhanced community environmental awareness</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Blood Donation") && (
                    <>
                      <div className="bg-red-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-red-800">Campaign Activities</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• Regular blood donation camps</li>
                          <li>• Donor awareness and education</li>
                          <li>• Mobile blood collection units</li>
                          <li>• Partnership with local hospitals</li>
                          <li>• Emergency blood supply coordination</li>
                        </ul>
                      </div>
                      <div className="bg-pink-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-pink-800">Impact</h4>
                        <ul className="space-y-2 text-pink-700">
                          <li>• 500+ units of blood collected annually</li>
                          <li>• 1,200+ lives potentially saved</li>
                          <li>• Network of 300+ regular donors</li>
                          <li>• 24/7 emergency blood supply</li>
                          <li>• Community health awareness increased</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Women Empowerment") && (
                    <>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-purple-800">Empowerment Activities</h4>
                        <ul className="space-y-2 text-purple-700">
                          <li>• Skill development and vocational training</li>
                          <li>• Financial literacy and microfinance programs</li>
                          <li>• Leadership development workshops</li>
                          <li>• Entrepreneurship support and mentoring</li>
                          <li>• Legal awareness and rights education</li>
                        </ul>
                      </div>
                      <div className="bg-violet-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-violet-800">Impact</h4>
                        <ul className="space-y-2 text-violet-700">
                          <li>• 150+ women trained in various skills</li>
                          <li>• 80+ women started their own businesses</li>
                          <li>• 90% increase in family income</li>
                          <li>• Enhanced decision-making power</li>
                          <li>• Strengthened community leadership</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Old Age Care") && (
                    <>
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-orange-800">Care Services</h4>
                        <ul className="space-y-2 text-orange-700">
                          <li>• Regular health check-ups and medical assistance</li>
                          <li>• Nutritious meals and dietary support</li>
                          <li>• Companionship and social activities</li>
                          <li>• Physical therapy and mobility assistance</li>
                          <li>• Mental health support and counseling</li>
                        </ul>
                      </div>
                      <div className="bg-amber-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-amber-800">Impact</h4>
                        <ul className="space-y-2 text-amber-700">
                          <li>• 75+ elderly individuals receiving care</li>
                          <li>• Improved quality of life and health outcomes</li>
                          <li>• Reduced isolation and loneliness</li>
                          <li>• Family support and respite care</li>
                          <li>• Dignified aging in community settings</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {selectedProgram.title.includes("Orphan Care") && (
                    <>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-blue-800">Complete Care Services</h4>
                        <ul className="space-y-2 text-blue-700">
                          <li>• Safe residential accommodation and loving home environment</li>
                          <li>• Quality education from primary to higher secondary</li>
                          <li>• Nutritious meals and healthcare services</li>
                          <li>• Emotional support and psychological counseling</li>
                          <li>• Life skills development and vocational training</li>
                        </ul>
                      </div>
                      <div className="bg-cyan-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-cyan-800">Impact</h4>
                        <ul className="space-y-2 text-cyan-700">
                          <li>• 120+ orphaned children in our care</li>
                          <li>• 100% enrollment in education programs</li>
                          <li>• Holistic development and bright futures</li>
                          <li>• Successful integration into society</li>
                          <li>• Breaking the cycle of poverty and abandonment</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* How to Support */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
                  <h4 className="font-semibold text-lg mb-3">How You Can Support This Program</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">₹1,500</div>
                      <div className="text-sm">Monthly support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">₹18,000</div>
                      <div className="text-sm">Annual support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">Volunteer</div>
                      <div className="text-sm">Share your skills</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
