import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Send, CheckCircle, Users, FileText } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeToNewsletter = useMutation({
    mutationFn: async (data: { email: string; name: string }) => {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Subscription failed");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive updates about our impact and activities.",
      });
      setEmail("");
      setName("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter-subscriptions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and email are required to subscribe.",
        variant: "destructive",
      });
      return;
    }
    subscribeToNewsletter.mutate({ email, name });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Newsletter Info */}
          <div>
            <div className="flex items-center mb-6">
              <Mail className="h-12 w-12 mr-4 text-blue-200" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Check Our Newsletters
                </h2>
                <p className="text-blue-200 text-lg">Stay updated with our impact stories</p>
              </div>
            </div>
            
            <p className="text-xl mb-8 text-blue-100">
              Get the latest updates about our programs, success stories, and impact directly in your inbox. 
              Join our community of supporters and stay connected with the children whose lives you're helping transform.
            </p>

            {/* Newsletter Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                <span>Monthly impact reports and success stories</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                <span>Upcoming events and volunteer opportunities</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                <span>Exclusive insights from our leadership team</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                <span>Program updates and organizational news</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">500+</div>
                <div className="text-sm text-blue-300">Newsletter subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">12</div>
                <div className="text-sm text-blue-300">Issues published</div>
              </div>
            </div>
          </div>

          {/* Right Content - Subscription Form */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Subscribe to Our Newsletter
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                  disabled={subscribeToNewsletter.isPending}
                >
                  {subscribeToNewsletter.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-blue-200 mt-4 text-center">
                We respect your privacy and will never share your email. 
                You can unsubscribe at any time.
              </p>
            </Card>

            {/* Recent Newsletter Preview */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Latest Newsletter</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  READ NOW
                </Button>
              </div>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                <h5 className="font-semibold mb-2">December 2024 Impact Report</h5>
                <p className="text-sm text-blue-200 mb-3">
                  "25 new girls enrolled in our education program this month. 
                  See how your support is creating lasting change..."
                </p>
                <div className="flex items-center text-xs text-blue-300">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Sent to 500+ supporters</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}