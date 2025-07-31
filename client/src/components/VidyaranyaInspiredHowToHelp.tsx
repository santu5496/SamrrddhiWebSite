import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Building, 
  HandHeart, 
  Briefcase,
  ArrowRight,
  CheckCircle,
  Star,
  Gift,
  Calendar,
  CreditCard,
  Banknote,
  Package,
  FileText,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Shield,
  Award,
  Clock,
  DollarSign,
  Home,
  GraduationCap,
  Stethoscope,
  Utensils,
  Shirt,
  BookOpen,
  Lightbulb
} from "lucide-react";

export default function VidyaranyaInspiredHowToHelp() {
  const donationMethods = [
    {
      title: "Online Donation",
      description: "Quick, secure, and convenient way to support our cause",
      icon: CreditCard,
      color: "bg-blue-500",
      features: ["Instant receipt", "Tax benefits", "Secure payment gateway", "Multiple payment options"],
      action: "Donate Online",
      isPopular: true
    },
    {
      title: "Bank Transfer",
      description: "Direct transfer to our organization account",
      icon: Banknote,
      color: "bg-green-500",
      features: ["No processing fees", "Large amounts", "Corporate donations", "Recurring transfers"],
      bankDetails: {
        name: "Samruddhi Service Society",
        account: "64014146915",
        bank: "State Bank of India",
        branch: "Pune Main Branch",
        ifsc: "SBIN0040016"
      },
      action: "Get Bank Details"
    },
    {
      title: "Cheque / DD",
      description: "Traditional donation method with doorstep collection",
      icon: FileText,
      color: "bg-purple-500",
      features: ["Doorstep collection", "Personal touch", "Large donations", "Corporate CSR"],
      contact: "+91-9876543210",
      action: "Schedule Collection"
    },
    {
      title: "Monthly Giving",
      description: "Become a monthly supporter for sustained impact",
      icon: Calendar,
      color: "bg-orange-500",
      features: ["Automated payments", "Greater impact", "Exclusive updates", "Community membership"],
      amounts: ["₹500", "₹1,000", "₹2,500", "₹5,000"],
      action: "Start Monthly Giving"
    }
  ];

  const giftingOptions = [
    {
      title: "Small Gifts",
      description: "Meaningful contributions that make a difference",
      icon: Gift,
      items: [
        { name: "School Supplies", price: "₹500", description: "Books, notebooks, and stationery for one child" },
        { name: "Uniform Set", price: "₹800", description: "Complete school uniform for one child" },
        { name: "Nutritious Meal", price: "₹50", description: "One healthy meal for a child" },
        { name: "Medical Check-up", price: "₹300", description: "Basic health screening for one child" }
      ]
    },
    {
      title: "Large Gifts",
      description: "Transformational donations for major impact",
      icon: Award,
      items: [
        { name: "Sponsor a Child", price: "₹15,000/year", description: "Complete education and care for one child" },
        { name: "Classroom Equipment", price: "₹50,000", description: "Smart board and learning materials" },
        { name: "Vehicle for Transport", price: "₹5,00,000", description: "Safe transportation for children" },
        { name: "Sponsor a Center", price: "₹10,00,000/year", description: "Fund operations of an entire center" }
      ]
    }
  ];

  const engagementOptions = [
    {
      title: "Volunteer With Us",
      description: "Share your time and skills to make a direct impact",
      icon: Users,
      color: "bg-pink-500",
      opportunities: [
        "Teaching and tutoring",
        "Healthcare support",
        "Skill development training",
        "Event organization",
        "Administrative support",
        "Fundraising activities"
      ],
      commitment: "Flexible timing available",
      action: "Apply to Volunteer"
    },
    {
      title: "Corporate Partnership",
      description: "CSR partnerships for sustainable community development",
      icon: Building,
      color: "bg-indigo-500",
      programs: [
        "Employee engagement programs",
        "Skill-based volunteering",
        "Infrastructure development",
        "Program sponsorship",
        "Matching gift programs",
        "Board advisory support"
      ],
      benefits: "CSR compliance & impact reporting",
      action: "Partner With Us"
    },
    {
      title: "Fundraise for Us",
      description: "Create your own fundraising campaign",
      icon: Heart,
      color: "bg-red-500",
      ideas: [
        "Birthday fundraisers",
        "Marathon sponsorship",
        "Community events",
        "Social media campaigns",
        "Workplace giving",
        "Anniversary celebrations"
      ],
      support: "Full campaign support provided",
      action: "Start Fundraising"
    },
    {
      title: "Spread Awareness",
      description: "Help us reach more supporters and beneficiaries",
      icon: Lightbulb,
      color: "bg-yellow-500",
      activities: [
        "Social media sharing",
        "Community presentations",
        "Newsletter subscriptions",
        "Referral programs",
        "Media outreach",
        "Word of mouth advocacy"
      ],
      impact: "Expand our reach exponentially",
      action: "Share Our Story"
    }
  ];

  const taxBenefits = {
    title: "Tax Benefits & Transparency",
    benefits: [
      "80G Tax Exemption Certificate",
      "100% tax deduction on donations",
      "Annual impact reports",
      "Transparent fund utilization",
      "Regular donor updates",
      "Certified audited accounts"
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="how-to-help">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            HOW YOU CAN HELP
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            There are many ways to support Samruddhi Service Society and make a meaningful difference 
            in the lives of underprivileged children and communities. Choose the option that works best for you.
          </p>
        </div>

        {/* Donation Methods */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Donation Options</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {method.isPopular && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className={`${method.color} p-6 text-white`}>
                    <IconComponent className="h-12 w-12 mb-4" />
                    <h4 className="text-xl font-bold mb-2">{method.title}</h4>
                    <p className="text-white/90 text-sm">{method.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-2 mb-6">
                      {method.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {method.bankDetails && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 text-xs">
                        <div className="font-semibold mb-2">Bank Details:</div>
                        <div>Account: {method.bankDetails.account}</div>
                        <div>Bank: {method.bankDetails.bank}</div>
                        <div>IFSC: {method.bankDetails.ifsc}</div>
                      </div>
                    )}

                    {method.amounts && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {method.amounts.map((amount, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amount}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {method.contact && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Phone className="h-4 w-4 mr-2" />
                        {method.contact}
                      </div>
                    )}

                    <Button className="w-full">
                      {method.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Gifting Options */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Gift Options</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {giftingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center mb-4">
                      <IconComponent className="h-8 w-8 mr-3" />
                      <div>
                        <h4 className="text-2xl font-bold">{option.title}</h4>
                        <p className="text-white/90">{option.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {option.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-start border-b pb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                          <div className="font-bold text-primary ml-4">{item.price}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-6">
                      Choose Gift Option
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Engagement Options */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Other Ways to Help</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`${option.color} p-6 text-white`}>
                    <IconComponent className="h-10 w-10 mb-4" />
                    <h4 className="text-xl font-bold mb-2">{option.title}</h4>
                    <p className="text-white/90 text-sm">{option.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-2 mb-4">
                      {(option.opportunities || option.programs || option.ideas || option.activities)?.slice(0, 4).map((item, i) => (
                        <div key={i} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    {(option.commitment || option.benefits || option.support || option.impact) && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <div className="text-xs font-semibold text-gray-700">
                          {option.commitment || option.benefits || option.support || option.impact}
                        </div>
                      </div>
                    )}
                    
                    <Button variant="outline" className="w-full">
                      {option.action}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tax Benefits Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">{taxBenefits.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {taxBenefits.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Media */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Connect With Us</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm">+91-9876543210</p>
              <p className="text-gray-600 text-sm">+91-8765432109</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600 text-sm">info@samruddhisociety.org</p>
              <p className="text-gray-600 text-sm">director@samruddhisociety.org</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-600 text-sm">Village Kanchanpur</p>
              <p className="text-gray-600 text-sm">Pune, Maharashtra</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Follow Us</h4>
              <div className="flex justify-center space-x-3">
                <Facebook className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                <Twitter className="h-5 w-5 text-blue-400 hover:text-blue-600 cursor-pointer" />
                <Instagram className="h-5 w-5 text-pink-600 hover:text-pink-800 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}