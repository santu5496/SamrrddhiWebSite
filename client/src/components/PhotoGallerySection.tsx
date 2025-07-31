import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Camera, Calendar, MapPin, X } from "lucide-react";
import { Button } from "./ui/button";

interface Photo {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  event?: string;
  date?: string;
  photographer?: string;
}

export default function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { data: photos = [], isLoading } = useQuery<Photo[]>({
    queryKey: ['/api/photo-gallery', selectedCategory !== 'all' ? { category: selectedCategory } : {}],
  });

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'education', label: 'Education' },
    { value: 'events', label: 'Events' },
    { value: 'programs', label: 'Programs' },
    { value: 'community', label: 'Community' },
  ];

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded w-24"></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <section className="py-16 bg-gray-50" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-neutral">Photo Gallery</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Capturing moments of joy, learning, and growth in our community programs.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  ${selectedCategory === category.value 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
                      {photo.event && (
                        <p className="text-xs opacity-90">{photo.event}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No photos available in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col lg:flex-row">
              <div className="lg:flex-1">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="lg:w-80 p-6 space-y-4">
                <h3 className="text-xl font-semibold text-neutral">{selectedPhoto.title}</h3>
                
                {selectedPhoto.description && (
                  <p className="text-gray-600">{selectedPhoto.description}</p>
                )}

                <div className="space-y-2 text-sm text-gray-500">
                  {selectedPhoto.event && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedPhoto.event}
                    </div>
                  )}
                  
                  {selectedPhoto.date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(selectedPhoto.date)}
                    </div>
                  )}

                  {selectedPhoto.photographer && (
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Photo by {selectedPhoto.photographer}
                    </div>
                  )}

                  {selectedPhoto.category && (
                    <div className="inline-block">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {selectedPhoto.category.charAt(0).toUpperCase() + selectedPhoto.category.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}