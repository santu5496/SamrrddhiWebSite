import { Play, Image as ImageIcon, Newspaper, Video, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface MediaItem {
  id: number;
  type: 'video' | 'image' | 'article';
  title: string;
  description?: string;
  thumbnailUrl: string;
  mediaUrl?: string;
  publishedDate: string;
  source?: string;
}

export default function MediaSection() {
  // Sample media data - in real app this would come from API
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'video',
      title: 'Transforming Lives Through Education',
      description: 'Watch how our residential education program is changing the lives of rural girls.',
      thumbnailUrl: '/api/placeholder/400/300',
      mediaUrl: 'https://example.com/video/transforming-lives',
      publishedDate: '2024-01-15',
      source: 'Samruddhi Documentary'
    },
    {
      id: 2,
      type: 'article',
      title: 'Featured in Rural Development Magazine',
      description: 'Our innovative approach to girls\' education highlighted in national publication.',
      thumbnailUrl: '/api/placeholder/400/300',
      publishedDate: '2024-01-10',
      source: 'Rural Development Today'
    },
    {
      id: 3,
      type: 'image',
      title: 'Annual Sports Day 2024',
      description: 'Celebrating achievements and fostering team spirit among our students.',
      thumbnailUrl: '/api/placeholder/400/300',
      publishedDate: '2024-02-20',
      source: 'Event Gallery'
    },
    {
      id: 4,
      type: 'video',
      title: 'Success Story: Priya\'s Journey',
      description: 'Former student Priya shares how education changed her life and community.',
      thumbnailUrl: '/api/placeholder/400/300',
      mediaUrl: 'https://example.com/video/priya-story',
      publishedDate: '2024-01-05',
      source: 'Impact Stories'
    },
    {
      id: 5,
      type: 'article',
      title: 'Award Recognition Ceremony',
      description: 'Samruddhi Service Society honored for excellence in rural education.',
      thumbnailUrl: '/api/placeholder/400/300',
      publishedDate: '2023-12-20',
      source: 'Award Coverage'
    },
    {
      id: 6,
      type: 'image',
      title: 'Skill Development Workshop',
      description: 'Students learning valuable vocational skills for future employment.',
      thumbnailUrl: '/api/placeholder/400/300',
      publishedDate: '2024-01-30',
      source: 'Program Gallery'
    }
  ];

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play;
      case 'image':
        return ImageIcon;
      case 'article':
        return Newspaper;
      default:
        return Video;
    }
  };

  const getMediaTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'article':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gray-50" id="media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Media & Coverage</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our media coverage, documentaries, and visual stories that showcase our impact and recognition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item) => {
            const IconComponent = getMediaIcon(item.type);
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <div className="p-3 bg-white bg-opacity-90 rounded-full">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMediaTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{formatDate(item.publishedDate)}</span>
                    {item.source && (
                      <span className="font-medium">{item.source}</span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group"
                    onClick={() => {
                      if (item.mediaUrl) {
                        window.open(item.mediaUrl, '_blank');
                      } else {
                        // Handle other media types or show modal
                        console.log('View media item:', item.id);
                      }
                    }}
                  >
                    {item.type === 'video' ? 'Watch Video' : 
                     item.type === 'article' ? 'Read Article' : 'View Gallery'}
                    <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Statistics */}
        <div className="mt-16 bg-white rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-neutral text-center mb-8">Our Media Presence</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Documentary Features</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600">Media Mentions</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <p className="text-gray-600">Video Views</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <p className="text-gray-600">Awards Covered</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-neutral mb-4">
            Want to Feature Our Work?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Media professionals and content creators are welcome to collaborate with us to showcase 
            the impact of our educational programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Media Team
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                // Navigate to full media gallery
                window.open('/gallery', '_blank');
              }}
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}