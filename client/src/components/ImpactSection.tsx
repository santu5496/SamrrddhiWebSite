import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Users, GraduationCap, Home, Heart, Award, Calendar } from "lucide-react";
import { HeroContent } from "@shared/schema";

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

// Counter animation hook
const useCountAnimation = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
};

export default function ImpactSection() {
  const { data: heroContent } = useQuery<HeroContent>({
    queryKey: ["/api/hero"],
  });

  const yearsCount = useAnimatedCounter(parseInt(heroContent?.yearsOfService || "29"), 2000);
  const childrenCount = useAnimatedCounter(parseInt(heroContent?.childrenSupported?.replace('+', '') || "50"), 2500);
  const programsCount = useAnimatedCounter(parseInt(heroContent?.corePrograms || "3"), 1500);
  const volunteersCount = useAnimatedCounter(25, 2200);
  const graduatesCount = useAnimatedCounter(200, 3000);
  const monthlyMealsCount = useAnimatedCounter(4500, 2800);

  const impacts = [
    {
      icon: Calendar,
      number: yearsCount,
      suffix: "",
      label: "Years of Service",
      description: "Empowering communities since 1995",
      color: "text-primary"
    },
    {
      icon: Users,
      number: childrenCount,
      suffix: "+",
      label: "Children Supported",
      description: "Rural girls & differently-abled children",
      color: "text-secondary"
    },
    {
      icon: GraduationCap,
      number: graduatesCount,
      suffix: "+",
      label: "Students Graduated",
      description: "Success stories over the years",
      color: "text-accent"
    },
    {
      icon: Heart,
      number: volunteersCount,
      suffix: "+",
      label: "Active Volunteers",
      description: "Dedicated community supporters",
      color: "text-orange-500"
    },
    {
      icon: Home,
      number: programsCount,
      suffix: "",
      label: "Core Programs",
      description: "Comprehensive support services",
      color: "text-primary"
    },
    {
      icon: Award,
      number: monthlyMealsCount,
      suffix: "",
      label: "Monthly Meals Served",
      description: "Nutritious food for healthy growth",
      color: "text-secondary"
    }
  ];

  const impactStats = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      number: yearsCount,
      suffix: "",
      label: "Years of Service",
      description: "Empowering communities since 1995"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      number: childrenCount,
      suffix: "+",
      label: "Children Supported",
      description: "Currently enrolled in our programs"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-accent" />,
      number: graduatesCount,
      suffix: "+",
      label: "Students Graduated",
      description: "Success stories over the years"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      number: volunteersCount,
      suffix: "+",
      label: "Active Volunteers",
      description: "Dedicated community supporters"
    },
    {
      icon: <Home className="h-8 w-8 text-secondary" />,
      number: programsCount,
      suffix: "",
      label: "Core Programs",
      description: "Comprehensive support services"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      number: monthlyMealsCount,
      suffix: "",
      label: "Monthly Meals Served",
      description: "Nutritious food for healthy growth"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every number represents lives transformed, dreams fulfilled, and hope restored through our dedicated programs.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 ${impact.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`h-8 w-8 ${impact.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-extrabold ${impact.color} mb-2`}>
                  {impact.number}{impact.suffix}
                </div>
                <div className="text-lg font-semibold text-neutral mb-2">
                  {impact.label}
                </div>
                <div className="text-sm text-gray-600">
                  {impact.description}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
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