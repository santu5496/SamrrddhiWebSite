import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Lock, 
  FileText, 
  Users,
  Star,
  Building,
  Globe,
  Verified,
  CreditCard,
  Phone
} from "lucide-react";

export default function TrustIndicators() {
  const certifications = [
    {
      title: "80G Tax Exemption",
      description: "Certified by Income Tax Department",
      icon: FileText,
      verified: true,
      color: "bg-green-500"
    },
    {
      title: "12A Registration",
      description: "Legal compliance under Income Tax Act",
      icon: Building,
      verified: true,
      color: "bg-blue-500"
    },
    {
      title: "FCRA Registered",
      description: "Authorized to receive foreign donations",
      icon: Globe,
      verified: true,
      color: "bg-purple-500"
    },
    {
      title: "NGO Darpan",
      description: "Registered with Government of India",
      icon: Award,
      verified: true,
      color: "bg-orange-500"
    }
  ];

  const securityFeatures = [
    {
      title: "SSL Encrypted",
      description: "All transactions are 256-bit encrypted",
      icon: Lock
    },
    {
      title: "PCI DSS Compliant",
      description: "Payment Card Industry standards",
      icon: CreditCard
    },
    {
      title: "Verified by Razorpay",
      description: "Trusted payment gateway",
      icon: Verified
    },
    {
      title: "24/7 Support",
      description: "Always available for assistance",
      icon: Phone
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Education Consultant, UNESCO",
      comment: "Samruddhi's transparent approach and measurable impact make them one of the most trustworthy NGOs I've worked with.",
      rating: 5
    },
    {
      name: "Rajesh Patel",
      role: "Corporate CSR Head",
      comment: "Their detailed reporting and genuine commitment to rural education is exceptional. We've been supporting them for 3 years.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Individual Donor",
      comment: "I can see exactly how my monthly donation is being used. The regular updates and photos of the children are heartwarming.",
      rating: 5
    }
  ];

  const impactNumbers = [
    { number: "29", label: "Years of Service", verified: true },
    { number: "501+", label: "Children Supported", verified: true },
    { number: "605+", label: "Special Needs Support", verified: true },
    { number: "85%", label: "Fund Utilization Ratio", verified: true }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full mb-6">
            <Shield className="h-5 w-5 mr-2" />
            Trust & Transparency
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Donors Trust Samruddhi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of transparency, accountability, and legal compliance. 
            Your trust is our most valuable asset.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Legal Certifications */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-500" />
              Legal Certifications
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                
                return (
                  <Card key={index} className="p-4 bg-white hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className={`${cert.color} rounded-full p-2 flex-shrink-0`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{cert.title}</h4>
                          {cert.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{cert.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Security Features */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-blue-500" />
              Security Features
            </h3>
            
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                
                return (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="bg-blue-500 rounded-full p-2 mr-4">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verified Impact Numbers */}
        <Card className="p-8 bg-gradient-to-r from-green-500 to-blue-500 text-white mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            <Verified className="h-6 w-6 mr-2" />
            Verified Impact Numbers
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {impactNumbers.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
                {stat.verified && (
                  <Badge className="bg-green-400 text-green-900">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Trust Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
            <Users className="h-6 w-6 mr-2 text-purple-500" />
            What Experts Say About Us
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Final Trust CTA */}
        <Card className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-2xl font-bold mb-4">Donate with Complete Confidence</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Your donation is protected by bank-level security, backed by legal certifications, 
            and will create verified impact in children's lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-colors shadow-lg"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              DONATE SECURELY NOW
            </button>
            <span className="text-sm opacity-75">
              ✓ 256-bit SSL Encryption ✓ PCI Compliant ✓ 80G Tax Benefits
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}