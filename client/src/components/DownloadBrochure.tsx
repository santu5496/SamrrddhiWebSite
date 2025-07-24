import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Send, Users, Heart, GraduationCap } from "lucide-react";

export default function DownloadBrochure() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to download the brochure.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate brochure generation and email sending
    setTimeout(() => {
      toast({
        title: "Brochure Sent",
        description: "Check your email for the downloadable brochure. Thank you for your interest!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 2000);
  };

  const brochureFeatures = [
    {
      icon: Heart,
      title: "Mission & Vision",
      description: "Our commitment to empowering children since 1995"
    },
    {
      icon: GraduationCap,
      title: "Program Details",
      description: "Comprehensive overview of all our educational programs"
    },
    {
      icon: Users,
      title: "Impact Stories",
      description: "Success stories and testimonials from beneficiaries"
    },
    {
      icon: FileText,
      title: "How to Support",
      description: "Multiple ways to get involved and make a difference"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Information */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
                Get Our Detailed Brochure
              </h2>
              <p className="text-xl text-gray-600">
                Download our comprehensive brochure with detailed information about our programs, 
                impact, and how you can get involved in transforming lives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {brochureFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-neutral mb-4">Perfect for:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Corporate CSR teams looking for partnership opportunities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Individual donors wanting detailed impact information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Volunteers interested in our programs and activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Grant funders evaluating our organization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Download Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral mb-2">Download Brochure</h3>
                <p className="text-gray-600">Enter your email to receive our detailed information packet</p>
              </div>

              <form onSubmit={handleDownload} className="space-y-6">
                <div>
                  <Label htmlFor="brochure-email">Email Address</Label>
                  <Input
                    id="brochure-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-1"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Brochure to Email
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Or contact us directly for immediate information
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex-1"
                  >
                    Contact Us
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('tel:+911234567890')}
                    className="flex-1"
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-accent/10 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-700">
                <strong>100% Privacy Guaranteed:</strong> We respect your privacy and will never share your email. 
                You'll only receive the brochure and occasional updates about our programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}