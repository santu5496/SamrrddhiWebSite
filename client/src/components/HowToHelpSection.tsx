import { Heart, Users, Handshake, UserPlus, Building, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function HowToHelpSection() {
  const helpOptions = [
    {
      icon: Calendar,
      title: "Celebrate with Us",
      description: "Join our events, festivals, and celebrations to share joy with our children and show your support.",
      actions: ["Attend annual events", "Sponsor celebrations", "Share special occasions"],
      buttonText: "Join Celebrations",
      color: "bg-pink-500"
    },
    {
      icon: Heart,
      title: "Sponsor a Beneficiary",
      description: "Directly impact a child's life by sponsoring their education, accommodation, and development for ₹18,000 annually.",
      actions: ["Full educational support", "Regular progress updates", "Direct communication"],
      buttonText: "Sponsor Now",
      color: "bg-red-500"
    },
    {
      icon: Handshake,
      title: "Corporate Partnership",
      description: "Partner with us for CSR initiatives and create meaningful social impact while achieving your business goals.",
      actions: ["CSR compliance", "Brand visibility", "Impact reports"],
      buttonText: "Partner with Us",
      color: "bg-blue-500"
    },
    {
      icon: UserPlus,
      title: "Volunteering & Internships",
      description: "Contribute your time and skills to directly work with our children and community programs.",
      actions: ["Teaching & mentoring", "Skill development", "Administrative support"],
      buttonText: "Volunteer Now",
      color: "bg-green-500"
    },
    {
      icon: Building,
      title: "Employee Engagement",
      description: "Engage your team in meaningful volunteer activities and corporate social responsibility programs.",
      actions: ["Team building activities", "Skill-based volunteering", "Fundraising campaigns"],
      buttonText: "Engage Employees",
      color: "bg-purple-500"
    }
  ];

  const impactStats = [
    { value: "₹18,000", label: "Sponsors a girl's full education for one year" },
    { value: "₹5,000", label: "Provides educational materials for 10 children" },
    { value: "₹2,500", label: "Covers monthly nutrition for 5 children" },
    { value: "₹1,000", label: "Supports skill development workshops" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-white to-pink-50" id="how-to-help">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral mb-4">How You Can Help</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            There are many ways to support our mission and make a lasting impact on the lives of underprivileged children. 
            Choose the way that resonates most with you.
          </p>
        </div>

        {/* Help Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {helpOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className={`${option.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8" />
                    <div className="text-right">
                      <span className="text-sm opacity-90">Make a difference</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {option.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {option.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full group ${option.color} hover:opacity-90 text-white`}
                    onClick={() => {
                      // Scroll to contact or open specific action
                      if (option.title === "Sponsor a Beneficiary") {
                        document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (option.title === "Corporate Partnership") {
                        document.getElementById('csr-partnership')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (option.title === "Volunteering & Internships") {
                        document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {option.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Statistics */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 mb-12">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">Your Impact in Numbers</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Every contribution, no matter how small, creates ripples of positive change in a child's life. 
            Join us in building a brighter future for underprivileged children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => {
                document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Helping Today
              <Heart className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More Ways to Help
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about how you can help? We're here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:+91-9876543210" className="text-primary hover:text-secondary font-medium">
              📞 Call us: +91-9876543210
            </a>
            <a href="mailto:help@samruddhi.org" className="text-primary hover:text-secondary font-medium">
              ✉️ Email: help@samruddhi.org
            </a>
            <a href="https://wa.me/919876543210" className="text-primary hover:text-secondary font-medium">
              💬 WhatsApp: +91-9876543210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}