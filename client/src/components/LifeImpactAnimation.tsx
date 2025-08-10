import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Users, BookOpen, Home, Utensils, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LifeImpactAnimation() {
  const { ref: animationRef } = useScrollAnimation();

  const impactStories = [
    {
      icon: BookOpen,
      title: "Education Changes Everything",
      beforeText: "No Education",
      afterText: "Bright Future",
      description: "Your ₹500 donation provides school supplies for one month",
      color: "text-blue-500"
    },
    {
      icon: Utensils,
      title: "Nutrition Saves Lives", 
      beforeText: "Malnourished",
      afterText: "Healthy & Strong",
      description: "Your ₹300 donation feeds a child for 2 weeks",
      color: "text-green-500"
    },
    {
      icon: Home,
      title: "Safe Shelter Transforms",
      beforeText: "Homeless",
      afterText: "Safe Haven", 
      description: "Your ₹1000 donation provides shelter for one month",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 relative overflow-hidden" ref={animationRef}>
      {/* Animated Background Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-heart-beat opacity-20">
          <Heart className="h-8 w-8 text-red-400" />
        </div>
        <div className="absolute top-20 right-20 animate-heart-beat opacity-15" style={{animationDelay: '0.5s'}}>
          <Heart className="h-12 w-12 text-pink-400" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-heart-beat opacity-10" style={{animationDelay: '1s'}}>
          <Heart className="h-6 w-6 text-red-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-life-impact">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text-animated mb-6">
            Your Donation Transforms Lives
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-help-transform">
            See the powerful impact of your generosity - every rupee creates real change
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {impactStories.map((story, index) => (
            <div key={index} className="relative animate-save-life" style={{animationDelay: `${index * 0.3}s`}}>
              {/* Before/After Transformation */}
              <div className="modern-card p-8 text-center hover-lift group">
                <div className="mb-6">
                  <story.icon className={`h-16 w-16 mx-auto ${story.color} group-hover:animate-pulse`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{story.title}</h3>
                
                {/* Transformation Visual */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="glass-card p-4 opacity-60 animate-help-transform">
                    <div className="text-lg font-semibold text-gray-600">{story.beforeText}</div>
                  </div>
                  <div className="animate-helping-hand">
                    <Heart className="h-8 w-8 text-red-500 animate-heart-beat" />
                  </div>
                  <div className="glass-card p-4 bg-gradient-to-r from-green-100 to-blue-100 animate-life-change">
                    <div className="text-lg font-semibold text-gray-800">{story.afterText}</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{story.description}</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 rounded-lg animate-donation-glow"
                  onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  TRANSFORM A LIFE NOW
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Urgent Call to Action */}
        <div className="text-center animate-life-impact">
          <div className="modern-card p-12 bg-gradient-to-r from-red-600 to-pink-600 text-white">
            <div className="animate-heart-beat mb-6">
              <Users className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-4xl font-bold mb-4">Every Second Counts</h3>
            <p className="text-xl mb-8 opacity-90">
              Right now, children are waiting for your help. Your donation can change their life story today.
            </p>
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-12 py-6 text-2xl rounded-full shadow-2xl hover-lift animate-donation-glow"
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="h-6 w-6 mr-3 animate-heart-beat" />
              DONATE NOW - SAVE A LIFE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}