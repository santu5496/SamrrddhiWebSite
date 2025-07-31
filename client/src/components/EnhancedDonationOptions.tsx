import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Building2, 
  Gift, 
  Phone, 
  Mail, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Heart,
  Users,
  BookOpen,
  Home
} from "lucide-react";

export default function EnhancedDonationOptions() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const donationMethods = [
    {
      id: "online",
      icon: CreditCard,
      title: "Online Donations",
      subtitle: "Quick & Secure",
      description: "Instant, secure payments with immediate confirmation and tax receipts",
      features: [
        "Credit/Debit Cards",
        "Net Banking",
        "UPI Payments",
        "Razorpay Gateway",
        "Instant Tax Receipt"
      ],
      buttonText: "Donate Online",
      color: "bg-green-500",
      popular: true
    },
    {
      id: "offline",
      icon: Building2,
      title: "Bank Transfer & Cheque",
      subtitle: "Traditional Methods",
      description: "Support us through bank transfers, cheques, or DD collections",
      features: [
        "Doorstep Cheque Collection",
        "Direct Bank Transfer",
        "Demand Draft (DD)",
        "Electronic Clearance Service",
        "NEFT/RTGS"
      ],
      buttonText: "Get Bank Details",
      color: "bg-blue-500"
    },
    {
      id: "gifts",
      icon: Gift,
      title: "In-Kind Donations",
      subtitle: "Material Support",
      description: "Contribute educational materials, equipment, and infrastructure",
      features: [
        "Educational Materials",
        "Uniforms & Books",
        "Medical Equipment",
        "Infrastructure Support",
        "Vehicle Donations"
      ],
      buttonText: "Donate Items",
      color: "bg-purple-500"
    }
  ];

  const impactGifts = [
    {
      amount: "₹500",
      impact: "School supplies for 1 child for a month",
      icon: BookOpen,
      color: "bg-yellow-500"
    },
    {
      amount: "₹1,500",
      impact: "Complete monthly support for 1 girl",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      amount: "₹5,000",
      impact: "Educational materials for 10 children",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      amount: "₹18,000",
      impact: "Full year education sponsorship",
      icon: Home,
      color: "bg-green-500"
    }
  ];

  const bankDetails = {
    name: "Samruddhi Service Society",
    accountNumber: "XXXXXXXXXXXX",
    bank: "State Bank of India",
    branch: "Main Branch",
    ifsc: "SBIN0000XXX",
    contact: "9XXXXXXXXX",
    email: "donations@samruddhi.org"
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tax Benefits Highlight */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full mb-6 font-semibold">
            <Shield className="h-5 w-5 mr-2" />
            80G Tax Benefits Available
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Multiple Ways to Support Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the donation method that works best for you. All donations are tax-deductible under Section 80G of the Income Tax Act.
          </p>
        </div>

        {/* Impact Gift Amounts - Like Vidyaranya's specific impact numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactGifts.map((gift, index) => {
            const IconComponent = gift.icon;
            return (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${gift.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{gift.amount}</div>
                <div className="text-sm text-gray-600">{gift.impact}</div>
              </Card>
            );
          })}
        </div>

        {/* Donation Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {donationMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <Card 
                key={method.id} 
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedMethod(isSelected ? null : method.id)}
              >
                {method.popular && (
                  <Badge className="absolute top-4 right-4 bg-orange-500">
                    Most Popular
                  </Badge>
                )}
                
                <div className={`${method.color} p-6 text-white`}>
                  <IconComponent className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
                  <p className="text-white/90 text-sm">{method.subtitle}</p>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {method.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (method.id === 'online') {
                        document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {method.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Bank Details for Offline Method */}
                {isSelected && method.id === 'offline' && (
                  <div className="border-t bg-gray-50 p-6 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="font-semibold text-gray-900 mb-4">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Account Name:</strong> {bankDetails.name}</div>
                      <div><strong>Account Number:</strong> {bankDetails.accountNumber}</div>
                      <div><strong>Bank:</strong> {bankDetails.bank}</div>
                      <div><strong>Branch:</strong> {bankDetails.branch}</div>
                      <div><strong>IFSC Code:</strong> {bankDetails.ifsc}</div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {bankDetails.contact}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {bankDetails.email}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        For cheque collection, please call us. We'll arrange doorstep pickup.
                      </p>
                    </div>
                  </div>
                )}

                {/* Gift Items for In-Kind */}
                {isSelected && method.id === 'gifts' && (
                  <div className="border-t bg-gray-50 p-6 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="font-semibold text-gray-900 mb-4">High-Need Items</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• School uniforms</div>
                      <div>• Textbooks & notebooks</div>
                      <div>• Sports equipment</div>
                      <div>• Computer equipment</div>
                      <div>• Medical supplies</div>
                      <div>• Kitchen equipment</div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500">
                        Contact us to discuss large infrastructure donations like vehicles, buildings, or equipment.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators - Like Vidyaranya's trust elements */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Safe</h3>
            <p className="text-gray-600 text-sm">Your donation transactions are completely safe and secure</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Tax Benefits</h3>
            <p className="text-gray-600 text-sm">Your donations are tax exempted under 80G of the Indian Income Tax Act</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Direct Impact</h3>
            <p className="text-gray-600 text-sm">All our efforts are made possible only because of your support</p>
          </div>
        </div>
      </div>
    </section>
  );
}