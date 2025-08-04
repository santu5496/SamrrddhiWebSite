import { useQuery } from "@tanstack/react-query";
import { Home, GraduationCap, Utensils, Users, Heart, Shield, X, ExternalLink } from "lucide-react";
import { Program } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const iconMap: Record<string, any> = {
  "fas fa-home": Home,
  "fas fa-graduation-cap": GraduationCap,
  "fas fa-utensils": Utensils,
};

const getIconComponent = (iconClass: string) => {
  return iconMap[iconClass] || Home;
};

export default function ProgramsSection() {
  const { data: programs, isLoading, error } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });
  const animationRef = useScrollAnimation();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);



  const defaultImages = [
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-section" ref={animationRef}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three core programs designed to provide comprehensive support and education to rural girls and differently-abled children.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs && programs.length > 0 ? (
            programs.map((program, index) => {
              const IconComponent = getIconComponent(program.icon);
              return (
                <div 
                  key={program.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  onClick={() => setSelectedProgram(program)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={program.imageUrl || defaultImages[index % defaultImages.length]}
                      alt={program.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mr-3 transform group-hover:rotate-12 transition-transform duration-300 ${
                        index === 0 ? 'gradient-primary' : 
                        index === 1 ? 'gradient-secondary' : 
                        'gradient-accent'
                      }`}>
                        <IconComponent className="text-white h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">{program.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
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
                    <div className="mt-4 flex items-center text-primary font-medium group-hover:text-secondary transition-colors duration-300">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span>Click to learn more</span>
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
                    src={selectedProgram.imageUrl || defaultImages[0]}
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
