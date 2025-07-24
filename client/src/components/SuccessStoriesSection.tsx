import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStory {
  id: number;
  name: string;
  age: number;
  program: string;
  story: string;
  achievement: string;
  imageUrl: string;
  quote: string;
}

export default function SuccessStoriesSection() {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories: SuccessStory[] = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 16,
      program: "Free Girls' Hostel",
      story: "Priya came to us from a remote village where girls often drop out of school. With our hostel program, she has excelled in her studies and dreams of becoming a doctor.",
      achievement: "Scored 95% in Class 10 boards",
      imageUrl: "https://images.unsplash.com/photo-1544944664-2c2d8c059b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      quote: "Samruddhi gave me wings to fly. Here, I learned that being a girl from a village doesn't limit my dreams."
    },
    {
      id: 2,
      name: "Arjun Kumar",
      age: 14,
      program: "IDC - Integrated Education",
      story: "Arjun, who has hearing impairment, joined our IDC program. With specialized support and inclusive education methods, he has discovered his talent for art and mathematics.",
      achievement: "Won district-level art competition",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      quote: "My disability doesn't define me. At Samruddhi, I found my strengths and learned that I can achieve anything."
    },
    {
      id: 3,
      name: "Meera Devi",
      age: 18,
      program: "Complete Support Program",
      story: "Meera graduated from our program and is now pursuing higher education. She has become a role model in her community, inspiring other girls to continue their education.",
      achievement: "First girl from her village to attend college",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      quote: "I am proof that with the right support, any girl can break barriers and create her own path to success."
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the inspiring children whose lives have been transformed through our programs. Their success is our greatest achievement.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image and basic info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img 
                    src={story.imageUrl}
                    alt={`${story.name} success story`}
                    className="w-64 h-64 rounded-full object-cover mx-auto lg:mx-0 shadow-lg"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-3 rounded-full shadow-lg">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-neutral">{story.name}</h3>
                  <p className="text-lg text-gray-600 mb-2">Age: {story.age}</p>
                  <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    {story.program}
                  </div>
                  <div className="mt-4 bg-accent text-white px-4 py-2 rounded-lg inline-block">
                    <strong>Achievement:</strong> {story.achievement}
                  </div>
                </div>
              </div>

              {/* Story content */}
              <div>
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-secondary mb-4" />
                  <blockquote className="text-lg italic text-gray-700 mb-4">
                    "{story.quote}"
                  </blockquote>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-neutral mb-3">Her Journey</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button 
                onClick={prevStory}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Story
              </Button>
              
              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStory ? 'bg-secondary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                onClick={nextStory}
                variant="outline"
                className="flex items-center gap-2"
              >
                Next Story
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Your support can create more success stories like these.
          </p>
          <Button 
            onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            Help Create More Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
}