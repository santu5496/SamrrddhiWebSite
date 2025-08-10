import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Users, GraduationCap, Home, Heart, Award, Calendar } from "lucide-react";
import { HeroContent } from "@shared/schema";
import { useCountAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};



export default function ImpactSection() {
  const { data: heroContent } = useQuery<HeroContent>({
    queryKey: ["/api/hero"],
  });

  const { count: yearsCount, countRef: yearsRef } = useCountAnimation(parseInt(heroContent?.yearsOfService || "29"), 2000);
  const { count: childrenCount, countRef: childrenRef } = useCountAnimation(parseInt(heroContent?.childrenSupported?.replace('+', '') || "50"), 2500);
  const { count: programsCount, countRef: programsRef } = useCountAnimation(parseInt(heroContent?.corePrograms || "8"), 1500);
  const { count: volunteersCount, countRef: volunteersRef } = useCountAnimation(25, 2200);
  const { count: graduatesCount, countRef: graduatesRef } = useCountAnimation(200, 3000);
  const { count: monthlyMealsCount, countRef: monthlyRef } = useCountAnimation(4500, 2800);
  
  const { ref: animationRef } = useScrollAnimation();

  const impacts = [
    {
      icon: Calendar,
      number: yearsCount,
      suffix: "",
      label: "Years of Service",
      description: "Empowering communities since 1995",
      color: "text-yellow-400",
      ref: yearsRef
    },
    {
      icon: Users,
      number: childrenCount,
      suffix: "+",
      label: "Children Supported",
      description: "Rural girls & differently-abled children",
      color: "text-blue-400",
      ref: childrenRef
    },
    {
      icon: GraduationCap,
      number: graduatesCount,
      suffix: "+",
      label: "Students Graduated",
      description: "Success stories over the years",
      color: "text-green-400",
      ref: graduatesRef
    },
    {
      icon: Heart,
      number: volunteersCount,
      suffix: "+",
      label: "Active Volunteers",
      description: "Dedicated community supporters",
      color: "text-pink-400",
      ref: volunteersRef
    },
    {
      icon: Home,
      number: programsCount,
      suffix: "",
      label: "Core Programs",
      description: "Comprehensive support services",
      color: "text-purple-400",
      ref: programsRef
    },
    {
      icon: Award,
      number: monthlyMealsCount,
      suffix: "",
      label: "Monthly Meals Served",
      description: "Nutritious food for healthy growth",
      color: "text-orange-400",
      ref: monthlyRef
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden" ref={animationRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-xl animate-float opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-xl animate-float opacity-20" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-animated mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every number represents lives transformed, dreams fulfilled, and hope restored through our dedicated programs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div 
                key={index} 
                className="modern-card p-8 text-center hover-lift group"
                ref={impact.ref}
              >
                <div className={`w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <IconComponent className={`h-10 w-10 ${impact.color} group-hover:animate-pulse`} />
                </div>
                <div className={`text-5xl md:text-6xl font-extrabold ${impact.color} mb-4 animate-scale-in`}>
                  <span>{impact.number}</span><span>{impact.suffix}</span>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-3">
                  {impact.label}
                </div>
                <div className="text-gray-600 leading-relaxed">
                  {impact.description}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Join our mission</strong> to create lasting impact in the lives of underprivileged children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Support Our Cause
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Volunteer With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}