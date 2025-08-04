import { useQuery } from "@tanstack/react-query";
import { Home, GraduationCap, Utensils, Users, Heart, Shield, X, ExternalLink, Apple, Leaf, Droplets, User, UserCheck, Zap } from "lucide-react";
import { Program } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
            Nine comprehensive programs covering education, nutrition, healthcare, child welfare, environmental conservation, women empowerment, and elderly care to create positive impact in rural communities.
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        index === 2 ? 'gradient-accent' :
                        index === 3 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        index === 4 ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                        index === 5 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                        index === 6 ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                        index === 7 ? 'bg-gradient-to-r from-orange-500 to-amber-600' :
                        'bg-gradient-to-r from-blue-500 to-cyan-600'
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
