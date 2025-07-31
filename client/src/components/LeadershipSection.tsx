import { useQuery } from "@tanstack/react-query";
import { Users, Mail, ExternalLink } from "lucide-react";

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

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24 mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
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
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Our Leadership</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated leaders who guide our mission of empowering underprivileged children through education and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((leader) => (
            <div key={leader.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-4">
                  {leader.imageUrl ? (
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-neutral mb-1">{leader.name}</h3>
                  <p className="text-primary font-medium mb-2">{leader.role}</p>
                </div>

                {leader.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {leader.bio}
                  </p>
                )}

                {leader.qualification && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-neutral mb-1">Qualifications</h4>
                    <p className="text-xs text-gray-600">{leader.qualification}</p>
                  </div>
                )}

                {leader.experience && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral mb-1">Experience</h4>
                    <p className="text-xs text-gray-600">{leader.experience}</p>
                  </div>
                )}

                <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
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
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                      aria-label={`LinkedIn profile of ${leader.name}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}