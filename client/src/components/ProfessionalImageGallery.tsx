import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfessionalImageGallery() {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Education & Child Care",
      description: "Children in classroom learning environment",
      category: "Education"
    },
    {
      url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Women Empowerment Training",
      description: "Women learning tailoring and handicraft skills",
      category: "Women Empowerment"
    },
    {
      url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Healthcare Services",
      description: "Medical check-ups and healthcare support",
      category: "Healthcare"
    },
    {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Senior Care Facilities",
      description: "Caring for elderly with dignity and respect",
      category: "Senior Care"
    },
    {
      url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Skill Development",
      description: "Vocational training for sustainable livelihoods",
      category: "Skills"
    },
    {
      url: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Community Development",
      description: "Building stronger, self-reliant communities",
      category: "Community"
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Environmental Programs",
      description: "Tree plantation and environmental conservation",
      category: "Environment"
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Special Education",
      description: "Specialized care for differently-abled children",
      category: "Special Needs"
    }
  ];

  const categoryColors = {
    "Education": "bg-blue-500",
    "Women Empowerment": "bg-pink-500",
    "Healthcare": "bg-red-500",
    "Senior Care": "bg-green-500",
    "Skills": "bg-purple-500",
    "Community": "bg-orange-500",
    "Environment": "bg-emerald-500",
    "Special Needs": "bg-indigo-500"
  };

  return (
    <section className="py-16 bg-gray-50" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we're making a difference in the lives of children, women, seniors, and communities through our comprehensive programs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <Badge 
                  className={`absolute top-2 right-2 text-white ${categoryColors[image.category as keyof typeof categoryColors]}`}
                >
                  {image.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to see more of our work? Visit our programs or get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore Our Programs
            </button>
            <button 
              onClick={() => document.getElementById('how-to-help')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}