import { useQuery } from "@tanstack/react-query";
import { Home, GraduationCap, Utensils, Users, Heart, Shield } from "lucide-react";
import { Program } from "@shared/schema";

const iconMap: Record<string, any> = {
  "fas fa-home": Home,
  "fas fa-graduation-cap": GraduationCap,
  "fas fa-utensils": Utensils,
};

const getIconComponent = (iconClass: string) => {
  return iconMap[iconClass] || Home;
};

export default function ProgramsSection() {
  const { data: programs } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const defaultImages = [
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three core programs designed to provide comprehensive support and education to rural girls and differently-abled children.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs?.map((program, index) => {
            const IconComponent = getIconComponent(program.icon);
            return (
              <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img 
                  src={program.imageUrl || defaultImages[index % defaultImages.length]}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
                      index === 0 ? 'gradient-primary' : 
                      index === 1 ? 'gradient-secondary' : 
                      'gradient-accent'
                    }`}>
                      <IconComponent className="text-white h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral">{program.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="mt-4 flex items-center text-accent font-medium">
                    {program.title.includes("Girls") && (
                      <>
                        <Users className="h-4 w-4 mr-2" />
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
