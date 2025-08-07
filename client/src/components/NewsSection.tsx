import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Button } from "./ui/button";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  authorName?: string;
  category: string;
  tags?: string[];
  featuredImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
}

export default function NewsSection() {
  const { data: news = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
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
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'news':
        return 'bg-blue-100 text-blue-800';
      case 'blog':
        return 'bg-green-100 text-green-800';
      case 'press-release':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-white" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral mb-4">Latest News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about our latest initiatives, success stories, and community impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.slice(0, 6).map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              {article.featuredImageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.featuredImageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {article.excerpt && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}

                {article.authorName && (
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <User className="h-3 w-3 mr-1" />
                    By {article.authorName}
                  </div>
                )}

                {article.tags && (() => {
                  try {
                    let parsedTags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags;
                    
                    // Ensure parsedTags is an array
                    if (!Array.isArray(parsedTags)) {
                      return null;
                    }
                    
                    return parsedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {parsedTags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    );
                  } catch (e) {
                    console.warn('Failed to parse tags:', e);
                    return null;
                  }
                })()}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group"
                  onClick={() => {
                    // Navigate to article detail page
                    window.open(`/news/${article.slug}`, '_blank');
                  }}
                >
                  Read More
                  <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {news.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="px-8 py-3"
              onClick={() => {
                // Navigate to full news page
                window.open('/news', '_blank');
              }}
            >
              View All News & Updates
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}