import { Handshake, Target, TrendingUp, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function CSRPartnershipSection() {
  const benefits = [
    {
      icon: Target,
      title: "Aligned Impact Goals",
      description: "Partner with us to achieve your CSR objectives while creating meaningful social impact in rural communities."
    },
    {
      icon: TrendingUp,
      title: "Measurable Outcomes",
      description: "Receive detailed impact reports and metrics to demonstrate the effectiveness of your CSR investments."
    },
    {
      icon: Award,
      title: "Brand Recognition",
      description: "Gain positive brand association through our educational initiatives and community development programs."
    }
  ];

  const partnershipModels = [
    {
      title: "Education Sponsorship",
      description: "Sponsor a girl's education for ₹18,000 annually and receive regular progress updates.",
      impact: "Direct impact on 1 beneficiary",
      commitment: "₹18,000/year"
    },
    {
      title: "Program Partnership",
      description: "Fund specific programs like skill development, healthcare, or infrastructure projects.",
      impact: "Benefit 50-100 children",
      commitment: "₹2-5 Lakhs"
    },
    {
      title: "Strategic Alliance",
      description: "Long-term partnership for sustainable community development and organizational growth.",
      impact: "Transform entire communities",
      commitment: "₹10+ Lakhs"
    }
  ];

  const currentPartners = [
    { name: "ABC Foundation", sector: "Technology", partnership: "Digital Literacy Program" },
    { name: "XYZ Corporation", sector: "Manufacturing", partnership: "Skill Development Initiative" },
    { name: "Education Trust", sector: "Education", partnership: "Teacher Training Program" },
  ];

  return (
    <section className="py-16 bg-white" id="csr-partnership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">CSR Partnerships</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Partner with us to fulfill your Corporate Social Responsibility goals while making a lasting impact on rural education and child welfare.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-neutral mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partnership Models */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">Partnership Models</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {partnershipModels.map((model, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-neutral mb-3">{model.title}</h4>
                <p className="text-gray-600 mb-4">{model.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Impact:</span>
                    <span className="font-medium text-primary">{model.impact}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Investment:</span>
                    <span className="font-medium text-neutral">{model.commitment}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => {
                    // Scroll to contact section or open contact form
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">Our Partners</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {currentPartners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {partner.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-neutral mb-1">{partner.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{partner.sector}</p>
                <p className="text-xs text-primary font-medium">{partner.partnership}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner With Us */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">Why Partner With Samruddhi?</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-neutral mb-4">Our Track Record</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">29+ years of successful operations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">2,500+ children impacted</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">95% program completion rate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">50+ villages reached</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-neutral mb-4">Partnership Benefits</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">80G tax exemption benefits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Quarterly impact reports</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Brand visibility opportunities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Employee engagement programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-neutral mb-4">Ready to Make an Impact Together?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's discuss how your organization can contribute to meaningful social change while achieving your CSR objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Partnership Discussion
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                // Download partnership brochure
                window.open('/api/placeholder/document/csr-partnership-brochure.pdf', '_blank');
              }}
            >
              Download Partnership Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}