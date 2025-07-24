import { Building2, Users, Award, Target } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      name: "State Education Department",
      logo: "https://images.unsplash.com/photo-1560179406-67c6cdacecb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
      type: "Government Partner",
      description: "Supporting our IDC program with resources and expertise"
    },
    {
      name: "Local CSR Partners",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
      type: "Corporate Sponsor",
      description: "Funding educational infrastructure and programs"
    },
    {
      name: "Healthcare Foundation",
      logo: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
      type: "Healthcare Partner",
      description: "Providing medical support for children with special needs"
    },
    {
      name: "Educational Trust",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
      type: "Academic Partner",
      description: "Scholarship and higher education guidance programs"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "NGO Excellence Award 2023",
      description: "Recognized for outstanding service in rural education",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Impact Recognition",
      description: "Certified by district administration for community development",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Community Trust",
      description: "Endorsed by local village councils and parent committees",
      color: "text-green-500"
    },
    {
      icon: Building2,
      title: "Government Registered",
      description: "Official NGO registration since 1995 with tax exemption status",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Our Partners & Recognition</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working together with trusted partners and recognized by authorities for our commitment to children's education and welfare.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-neutral mb-8">Recognition & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 ${achievement.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <h3 className="text-2xl font-semibold text-center text-neutral mb-8">Our Trusted Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-24 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <img 
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-16 w-auto object-contain opacity-80"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {partner.type}
                  </div>
                  <h4 className="text-lg font-semibold text-neutral mb-2">{partner.name}</h4>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action for Partnership */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Partner With Us</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Join our network of partners making a real difference in children's lives. Whether through CSR initiatives, 
            educational support, or community programs, together we can create lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Partnership
            </button>
            <button 
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Support Our Mission
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">1995</div>
            <div className="text-sm text-gray-600">Established</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">80G</div>
            <div className="text-sm text-gray-600">Tax Exemption</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">100%</div>
            <div className="text-sm text-gray-600">Transparency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">Verified</div>
            <div className="text-sm text-gray-600">Government Registered</div>
          </div>
        </div>
      </div>
    </section>
  );
}