import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const animationRef = useScrollAnimation();

  // Hardcoded About section data
  const aboutContent = {
    missionTitle: "Our Mission",
    missionDescription: "To empower underprivileged rural girls and differently-abled children by providing quality education, safe accommodation, and comprehensive care, enabling them to build independent and dignified lives.",
    journeyTitle: "Our Journey",
    journeyDescription: "Since 1995, Samruddhi Service Society has been a beacon of hope for marginalized communities. What started as a small initiative has grown into a comprehensive organization touching hundreds of lives through education, empowerment, and care.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  console.log("About Content (Hardcoded):", aboutContent);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={animationRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Samruddhi Service Society</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="transform hover:scale-105 transition-all duration-500">
            <img 
              src={aboutContent.imageUrl}
              alt="NGO volunteers working with children" 
              className="rounded-xl shadow-lg w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300"
              loading="lazy"
            />
          </div>
          
          <div className="space-y-6">
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
                {aboutContent.missionTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutContent.missionDescription}
              </p>
            </div>
            
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
                {aboutContent.journeyTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutContent.journeyDescription}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-4 transform hover:translate-x-2 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600 h-5 w-5 hover:text-blue-600 transition-colors duration-300" />
                <span className="text-gray-800 font-medium">Registered NGO since 1995</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
