import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Hand, Clock, MapPin, Phone, Users, Heart } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function VolunteerSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    message: "",
  });

  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // For now, we'll use the contact submission endpoint
      const response = await apiRequest("POST", "/api/contact/submit", {
        name: data.name,
        email: data.email,
        subject: "Volunteer Application",
        message: `Phone: ${data.phone}\nSkills: ${data.skills}\nAvailability: ${data.availability}\nMessage: ${data.message}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in volunteering! We'll contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", skills: "", availability: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const volunteerOpportunities = [
    {
      icon: Users,
      title: "Teaching & Mentoring",
      description: "Help with academic subjects, life skills, and career guidance",
      commitment: "4-6 hours/week"
    },
    {
      icon: Heart,
      title: "Special Needs Support",
      description: "Assist with IDC program for differently-abled children",
      commitment: "3-5 hours/week"
    },
    {
      icon: MapPin,
      title: "Field Work",
      description: "Community outreach and awareness programs",
      commitment: "Weekend activities"
    },
    {
      icon: Phone,
      title: "Administrative Support",
      description: "Help with documentation, fundraising, and communications",
      commitment: "Flexible hours"
    }
  ];

  return (
    <section id="volunteer" className="py-20 bg-gradient-to-br from-accent/5 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Join Our Volunteer Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make a direct impact in the lives of children. Whether you have a few hours a week or can commit to regular involvement, your contribution matters.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* Volunteer Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-accent mb-2">25+</div>
            <div className="text-gray-600">Active Volunteers</div>
          </div>
          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-secondary mb-2">500+</div>
            <div className="text-gray-600">Hours Contributed Monthly</div>
          </div>
          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-600">Lives Touched</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Volunteer Opportunities */}
          <div>
            <h3 className="text-2xl font-semibold text-neutral mb-8">Volunteer Opportunities</h3>
            <div className="space-y-6">
              {volunteerOpportunities.map((opportunity, index) => {
                const IconComponent = opportunity.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-neutral mb-2">{opportunity.title}</h4>
                        <p className="text-gray-600 mb-3">{opportunity.description}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium text-accent">{opportunity.commitment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-neutral mb-3">Why Volunteer With Us?</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Make a direct impact on children's lives</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Gain meaningful experience and skills</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Join a passionate community of changemakers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Flexible scheduling to fit your lifestyle</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Volunteer Application Form */}
          <div>
            <h3 className="text-2xl font-semibold text-neutral mb-8">Apply to Volunteer</h3>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="vol-name">Full Name *</Label>
                  <Input
                    id="vol-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vol-email">Email Address *</Label>
                  <Input
                    id="vol-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vol-phone">Phone Number *</Label>
                  <Input
                    id="vol-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 12345 67890"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vol-skills">Skills & Experience</Label>
                  <Input
                    id="vol-skills"
                    type="text"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder="Teaching, counseling, arts, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vol-availability">Availability</Label>
                  <Input
                    id="vol-availability"
                    type="text"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    placeholder="Weekends, evenings, etc."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vol-message">Why do you want to volunteer?</Label>
                  <Textarea
                    id="vol-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your motivation to volunteer..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="w-full bg-accent hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <Hand className="mr-2 h-4 w-4" />
                  {submitMutation.isPending ? "Submitting..." : "Apply to Volunteer"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}