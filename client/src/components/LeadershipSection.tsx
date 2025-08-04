import { useQuery } from "@tanstack/react-query";
import { Users, Mail, ExternalLink, Award, Calendar, GraduationCap, Briefcase, Quote } from "lucide-react";
import { useState } from "react";

interface Leadership {
  id: number;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  qualification?: string;
  experience?: string;
  email?: string;
  linkedIn?: string;
}

export default function LeadershipSection() {
  const { data: leadership = [], isLoading } = useQuery<Leadership[]>({
    queryKey: ['/api/leadership'],
  });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-80 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="flex justify-center space-x-8 mb-12">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="grid gap-4 mb-6">
                    <div className="flex space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                    <div className="flex space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="leadership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-6">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Leadership
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Meet the visionary leaders who guide our mission of empowering underprivileged children through education and care. 
            Their combined experience and dedication drive our impact across communities.
          </p>
          <div className="flex justify-center items-center mt-8 space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-primary" />
              <span>Combined 45+ Years Experience</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-primary" />
              <span>Advanced Qualifications</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leadership.map((leader, index) => (
            <div 
              key={leader.id} 
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                hoveredCard === leader.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(leader.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Quote className="h-8 w-8 text-primary" />
              </div>

              <div className="relative p-8">
                {/* Profile Section */}
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative">
                    {leader.imageUrl ? (
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="w-20 h-20 rounded-2xl object-cover border-3 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow duration-300">
                        <span className="text-xl font-bold text-white">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    {/* Achievement badge */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral mb-1 group-hover:text-primary transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-2 opacity-90">
                      {leader.role}
                    </p>
                    {index === 0 && (
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-xs font-medium text-primary">
                        <Calendar className="h-3 w-3 mr-1" />
                        Since 1995
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio Section */}
                {leader.bio && (
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm italic">
                      "{leader.bio}"
                    </p>
                  </div>
                )}

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {leader.qualification && (
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors duration-300">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-neutral mb-1">Education & Qualifications</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{leader.qualification}</p>
                      </div>
                    </div>
                  )}

                  {leader.experience && (
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors duration-300">
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                        <Briefcase className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-neutral mb-1">Professional Experience</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{leader.experience}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Section */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 group-hover:border-primary/20 transition-colors duration-300">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Get in touch</span>
                  </div>
                  <div className="flex space-x-3">
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-blue-500/25"
                        aria-label={`Email ${leader.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {leader.linkedIn && (
                      <a
                        href={leader.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/25"
                        aria-label={`LinkedIn profile of ${leader.name}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <h3 className="text-xl font-bold text-neutral mb-3">
              Join Our Mission
            </h3>
            <p className="text-gray-600 mb-4">
              Our leadership team is always looking for passionate individuals to join our cause and make a difference in children's lives.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105">
              <Mail className="h-4 w-4 mr-2" />
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}