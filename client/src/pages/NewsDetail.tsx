
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  authorName?: string;
  category: string;
  tags?: string;
  featuredImageUrl?: string;
  publishedAt?: string;
  createdAt: string;
}

export default function NewsDetail() {
  const { slug } = useParams();
  
  const { data: news = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  // Find the article by matching the slug with generated slug from title
  const article = news.find(item => {
    const articleSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return articleSlug === slug;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
              <div className="w-full h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
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
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'healthcare':
        return 'bg-green-100 text-green-800';
      case 'empowerment':
        return 'bg-purple-100 text-purple-800';
      case 'community-development':
        return 'bg-orange-100 text-orange-800';
      case 'environment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back button */}
          <Button 
            variant="outline" 
            className="mb-8"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>

          <article>
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(article.publishedAt || article.createdAt)}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              {article.authorName && (
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <User className="h-4 w-4 mr-1" />
                  By {article.authorName}
                </div>
              )}

              {article.tags && (() => {
                try {
                  let parsedTags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags;
                  
                  if (!Array.isArray(parsedTags)) {
                    return null;
                  }
                  
                  return parsedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {parsedTags.map((tag, index) => (
                        <span key={index} className="flex items-center text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  );
                } catch (e) {
                  return null;
                }
              })()}
            </header>

            {/* Featured image */}
            {article.featuredImageUrl && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={article.featuredImageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
