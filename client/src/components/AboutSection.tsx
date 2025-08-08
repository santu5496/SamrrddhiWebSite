import { 
  CheckCircle, 
  Calendar, 
  Users, 
  Heart, 
  GraduationCap, 
  Shield, 
  Award, 
  Star,
  Target,
  Book,
  Home,
  Sparkles
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const animationRef = useScrollAnimation();

  // Enhanced About section data with comprehensive content
  const aboutContent = {
    missionTitle: "Our Mission",
    missionDescription: "Samruddhi Service Society was registered in 1995 to promote rural girls' development of education. The organization provides free girls' hostel from 7th to 10th standard, ensuring access to quality accommodation and education.",
    journeyTitle: "Our Journey & Programs",
    journeyDescription: "The organization has started education for physically handicapped/disabled children to promote free education and quality of life support. Our key program 'IDC' (Integrated Education for Disabled Children) focuses on comprehensive support for differently-abled students.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  const milestones = [
    { year: '1995', title: 'Foundation', description: 'Organization established to empower rural girls' },
    { year: '2000', title: 'First Hostel', description: 'Opened free hostel for underprivileged girls' },
    { year: '2005', title: 'IDC Program', description: 'Started Integrated Education for Disabled Children' },
    { year: '2010', title: 'Expansion', description: 'Extended services to 12 comprehensive programs' },
    { year: '2020', title: 'Digital Integration', description: 'Incorporated modern learning methods' },
    { year: '2024', title: 'Current Day', description: '501+ children supported across all programs' }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Every child deserves love, care, and opportunities to thrive'
    },
    {
      icon: Book,
      title: 'Education First',
      description: 'Quality education as the foundation for empowerment'
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'Creating equal opportunities for all children'
    },
    {
      icon: Target,
      title: 'Impact Driven',
      description: 'Measurable change in every life we touch'
    }
  ];

  console.log("About Content (Enhanced):", aboutContent);

  return (
    <section id="about" className="py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400 rounded-full blur-2xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-indigo-400 rounded-full blur-xl float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header Section */}
        <div className="text-center mb-10 fade-in-section" ref={animationRef}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 shimmer">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Samruddhi Service Society</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Empowering underprivileged rural girls and differently-abled children through education, care, and comprehensive support since 1995.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 group">
              <img 
                src={aboutContent.imageUrl}
                alt="NGO volunteers working with children" 
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl font-bold mb-2">Transforming Lives</h4>
                <p className="text-sm">Creating hope and opportunities for every child we serve</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass-card p-8 shadow-vibrant">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral">{aboutContent.missionTitle}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {aboutContent.missionDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Registered NGO
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Since 1995
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                  <Award className="h-4 w-4 mr-1" />
                  29 Years Service
                </Badge>
              </div>
            </div>
            
            <div className="glass-card p-8 shadow-vibrant">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral">{aboutContent.journeyTitle}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {aboutContent.journeyDescription}
              </p>
              
              {/* Key Achievements */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="text-green-500 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">501+ children supported across all programs</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="text-green-500 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">Free girls' hostel for 7th to 10th standard</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="text-green-500 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">Comprehensive IDC program for differently-abled children</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="text-green-500 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-800 font-medium">12 specialized programs for holistic development</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Journey</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three decades of dedicated service, continuous growth, and unwavering commitment to empowering children.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="glass-card p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{milestone.year.slice(-2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium mb-1">{milestone.year}</div>
                  <h4 className="text-xl font-bold text-neutral mb-3 group-hover:text-primary transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Values</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guiding principles that shape our mission and drive our commitment to creating lasting change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="glass-card p-6 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-card p-8 md:p-12 text-center shadow-vibrant">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral mb-6">
              Join Our Mission of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Transformation</span>
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every contribution, every volunteer hour, and every shared story helps us reach more children and create more success stories. Be part of our journey to empower the next generation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-5 w-5 mr-2" />
                Support Our Cause
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg transition-all"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="h-5 w-5 mr-2" />
                Volunteer With Us
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                80G Tax Benefits
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Government Registered
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                29 Years Trusted
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
