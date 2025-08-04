import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { AboutContent } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { data: aboutContent, isLoading: aboutLoading } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
  });
  const animationRef = useScrollAnimation();

  console.log("About Content:", aboutContent);

  const defaultImageUrl = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600";

  if (aboutLoading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading about content...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={animationRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">About Samruddhi Service Society</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="transform hover:scale-105 transition-all duration-500">
            <img 
              src={aboutContent?.imageUrl || defaultImageUrl}
              alt="NGO volunteers working with children" 
              className="rounded-xl shadow-lg w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300"
              loading="lazy"
            />
          </div>
          
          <div className="space-y-6">
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-neutral mb-4 hover:text-primary transition-colors duration-300">
                {aboutContent?.missionTitle || "Our Mission"}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutContent?.missionDescription || "Established in 1995, Samruddhi Service Society has been dedicated to empowering underprivileged rural girls and differently-abled children through comprehensive education, shelter, and support services. Our commitment extends beyond mere education to nurturing holistic development."}
              </p>
            </div>
            
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-neutral mb-4 hover:text-primary transition-colors duration-300">
                {aboutContent?.journeyTitle || "Our Journey"}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutContent?.journeyDescription || "In 2002, we expanded our mission by establishing a free girls' hostel to promote rural girls' educational development. Today, we provide food, accommodation, and quality education to around 50 children, including specialized programs for differently-abled children through our IDC initiative."}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-4 transform hover:translate-x-2 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-accent h-5 w-5 hover:text-primary transition-colors duration-300" />
                <span className="text-neutral font-medium">Registered NGO since 1995</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
