import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const animationRef = useScrollAnimation();

  // Authentic About section data based on organization details
  const aboutContent = {
    missionTitle: "Our Mission",
    missionDescription: "Samruddhi Service Society was registered in 1995 to promote rural girls' development of education. The organization provides free girls' hostel from 7th to 10th standard, ensuring access to quality accommodation and education.",
    journeyTitle: "Our Journey & Programs",
    journeyDescription: "The organization has started education for physically handicapped/disabled children to promote free education and quality of life support. Our key program 'IDC' (Integrated Education for Disabled Children) focuses on comprehensive support for differently-abled students.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  console.log("About Content (Hardcoded):", aboutContent);

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-optimized">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" ref={animationRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Samruddhi Service Society</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="transform hover:scale-105 transition-all duration-500">
            <img 
              src={aboutContent.imageUrl}
              alt="NGO volunteers working with children" 
              className="rounded-xl shadow-lg w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300"
              loading="lazy"
            />
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 hover:text-blue-600 transition-colors duration-300">
                {aboutContent.missionTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mobile-text">
                {aboutContent.missionDescription}
              </p>
            </div>
            
            <div className="transform hover:translate-x-2 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 hover:text-blue-600 transition-colors duration-300">
                {aboutContent.journeyTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mobile-text">
                {aboutContent.journeyDescription}
              </p>
            </div>
            
            <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
              <div className="flex items-center space-x-2 transform hover:translate-x-2 transition-all duration-300 touch-target">
                <CheckCircle className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 hover:text-blue-600 transition-colors duration-300" />
                <span className="text-gray-800 font-medium text-sm sm:text-base">Registered NGO since 1995</span>
              </div>
              <div className="flex items-center space-x-2 transform hover:translate-x-2 transition-all duration-300 touch-target">
                <CheckCircle className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 hover:text-blue-600 transition-colors duration-300" />
                <span className="text-gray-800 font-medium text-sm sm:text-base">Free girls' hostel for 7th to 10th standard</span>
              </div>
              <div className="flex items-center space-x-2 transform hover:translate-x-2 transition-all duration-300 touch-target">
                <CheckCircle className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 hover:text-blue-600 transition-colors duration-300" />
                <span className="text-gray-800 font-medium text-sm sm:text-base">IDC Program for disabled children</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
