
import { Heart, Users, Gift, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function MonthlyDonorSection() {
  const donorTiers = [
    {
      name: "Education Supporter",
      amount: "₹500",
      period: "per month",
      icon: <Gift className="h-8 w-8 text-primary" />,
      benefits: [
        "Monthly impact reports",
        "Quarterly newsletter",
        "Access to success stories",
        "Tax exemption certificate"
      ],
      impact: "Covers books and supplies for 1 child"
    },
    {
      name: "Child Champion",
      amount: "₹1,500",
      period: "per month",
      icon: <Heart className="h-8 w-8 text-secondary" />,
      benefits: [
        "All Education Supporter benefits",
        "Personal child updates",
        "Annual visit opportunity",
        "Direct communication channel"
      ],
      impact: "Covers full monthly support for 1 child",
      featured: true
    },
    {
      name: "Program Partner",
      amount: "₹5,000",
      period: "per month",
      icon: <Users className="h-8 w-8 text-accent" />,
      benefits: [
        "All Child Champion benefits",
        "Program naming opportunity",
        "Quarterly site visits",
        "Advisory board invitation"
      ],
      impact: "Supports entire program operations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Join Our Monthly Donor Family
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Become a sustained pillar of support. Your monthly contribution creates lasting change 
            and helps us plan long-term development for the children in our care.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {donorTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-8 shadow-lg card-hover text-center relative ${
                tier.featured ? 'ring-2 ring-secondary ring-opacity-50 transform scale-105' : ''
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex justify-center mb-6">
                {tier.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-neutral mb-2">{tier.name}</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{tier.amount}</span>
                <span className="text-gray-600 ml-2">{tier.period}</span>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-orange-800">{tier.impact}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${tier.featured ? 'btn-gradient' : 'bg-primary hover:bg-primary/90'} text-white font-semibold py-3`}
              >
                Start Monthly Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-neutral mb-4">Why Monthly Giving Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-gray-700">of our budget comes from individual donors like you</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">12x</div>
              <p className="text-gray-700">more impact than one-time donations</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-gray-700">transparency with regular progress updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
