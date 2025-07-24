
import { Building2, HandHeart, Trophy, FileText, ArrowRight, CheckCircle2, Users, Target } from "lucide-react";
import { Button } from "./ui/button";

export default function CSRPartnershipSection() {
  const csrBenefits = [
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Brand Recognition",
      description: "Feature your company in our marketing materials and annual reports"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Employee Engagement",
      description: "Volunteer opportunities for your team to directly impact communities"
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "SDG Alignment",
      description: "Support UN Sustainable Development Goals 4 (Quality Education) and 5 (Gender Equality)"
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Complete Documentation",
      description: "Detailed impact reports and proper documentation for CSR compliance"
    }
  ];

  const partnershipTiers = [
    {
      title: "Education Partner",
      amount: "₹50,000 - ₹2,00,000",
      impact: "Sponsor education for 5-15 children annually",
      features: ["Certificate of partnership", "Quarterly impact reports", "Social media recognition"]
    },
    {
      title: "Program Sponsor",
      amount: "₹2,00,000 - ₹10,00,000",
      impact: "Fund entire program components",
      features: ["Program naming rights", "Annual site visits", "Employee volunteer programs", "Custom impact videos"]
    },
    {
      title: "Strategic Partner",
      amount: "₹10,00,000+",
      impact: "Long-term strategic partnership",
      features: ["Advisory board representation", "Joint PR opportunities", "Custom partnership agreement", "CEO recognition events"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Corporate Social Responsibility Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with us to fulfill your CSR obligations while creating meaningful impact 
            in education and women empowerment. Join leading companies in transforming lives.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* CSR Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {csrBenefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center card-hover">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Partnership Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">CSR Partnership Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-8 card-hover">
                <h4 className="text-xl font-bold text-neutral mb-3">{tier.title}</h4>
                <div className="text-lg font-semibold text-primary mb-4">{tier.amount}</div>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-blue-800">{tier.impact}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center text-white">
          <Building2 className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Make a Corporate Impact?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Join us in creating sustainable change. Download our CSR partnership brochure 
            or schedule a meeting with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100 font-semibold">
              <FileText className="mr-2 h-4 w-4" />
              Download CSR Brochure
            </Button>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold">
              <HandHeart className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
