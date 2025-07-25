
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Play, Image as ImageIcon, Calendar, Users, Award, Heart } from 'lucide-react';

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState('photos');

  const photoGalleries = [
    {
      title: "Girls Education Program",
      date: "March 2024",
      count: 24,
      thumbnail: "/api/placeholder/300/200",
      category: "education"
    },
    {
      title: "Community Health Camp",
      date: "February 2024", 
      count: 18,
      thumbnail: "/api/placeholder/300/200",
      category: "health"
    },
    {
      title: "Skill Development Workshop",
      date: "January 2024",
      count: 32,
      thumbnail: "/api/placeholder/300/200",
      category: "skills"
    },
    {
      title: "Annual Day Celebration",
      date: "December 2023",
      count: 45,
      thumbnail: "/api/placeholder/300/200",
      category: "events"
    },
    {
      title: "Volunteer Training Program",
      date: "November 2023",
      count: 28,
      thumbnail: "/api/placeholder/300/200",
      category: "training"
    },
    {
      title: "Women Empowerment Session",
      date: "October 2023",
      count: 20,
      thumbnail: "/api/placeholder/300/200",
      category: "empowerment"
    }
  ];

  const videos = [
    {
      title: "Our Impact Story 2024",
      duration: "3:45",
      views: "2.1K",
      date: "March 2024",
      thumbnail: "/api/placeholder/300/200",
      category: "impact"
    },
    {
      title: "Girls Education Success Stories",
      duration: "5:20",
      views: "3.8K", 
      date: "February 2024",
      thumbnail: "/api/placeholder/300/200",
      category: "education"
    },
    {
      title: "Community Development Project",
      duration: "2:30",
      views: "1.5K",
      date: "January 2024",
      thumbnail: "/api/placeholder/300/200",
      category: "community"
    },
    {
      title: "Volunteer Testimonials",
      duration: "4:15",
      views: "2.9K",
      date: "December 2023",
      thumbnail: "/api/placeholder/300/200",
      category: "testimonials"
    }
  ];

  const newsArticles = [
    {
      title: "Samruddhi Society Receives State Award for Excellence",
      publication: "Times of India",
      date: "March 15, 2024",
      excerpt: "Recognition for outstanding contribution to girls' education in rural areas..."
    },
    {
      title: "Empowering Rural Girls Through Education",
      publication: "The Hindu",
      date: "February 28, 2024",
      excerpt: "How Samruddhi Service Society is transforming lives through quality education..."
    },
    {
      title: "Community Health Initiative Shows Remarkable Results",
      publication: "Indian Express",
      date: "January 20, 2024",
      excerpt: "Health camps organized by the society have benefited over 5000 people..."
    },
    {
      title: "Skill Development Program Creates New Opportunities",
      publication: "Economic Times",
      date: "December 10, 2023",
      excerpt: "Vocational training programs help women achieve financial independence..."
    }
  ];

  return (
    <section id="media" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Gallery</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our journey through photos, videos, and media coverage
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'photos' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="inline h-4 w-4 mr-2" />
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'videos' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Play className="inline h-4 w-4 mr-2" />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'news' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Award className="inline h-4 w-4 mr-2" />
              In The News
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoGalleries.map((gallery, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={gallery.thumbnail} 
                    alt={gallery.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {gallery.count} photos
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{gallery.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {gallery.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-colors">
                    <div className="bg-primary text-white p-3 rounded-full">
                      <Play className="h-6 w-6 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {video.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {video.views} views
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* News */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {newsArticles.map((article, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{article.publication}</span>
                          <span className="mx-2">•</span>
                          {article.date}
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
