import { useQuery } from "@tanstack/react-query";
import { BookOpen, FileText, Download, ExternalLink, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Publication {
  id: number;
  title: string;
  type: string;
  authors?: string[];
  abstract?: string;
  publishedDate?: string;
  journal?: string;
  fileUrl?: string;
  tags?: string[];
}

export default function ResourcesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const { data: publications = [], isLoading } = useQuery<Publication[]>({
    queryKey: ['/api/publications', selectedType !== 'all' ? { type: selectedType } : {}],
  });

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.abstract?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const publicationTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'research', label: 'Research Papers' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'report', label: 'Reports' },
    { value: 'guide', label: 'Guides' },
  ];

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            <div className="h-10 bg-gray-300 rounded w-full max-w-md mx-auto mb-8"></div>
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded w-24"></div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'research':
        return 'bg-blue-100 text-blue-800';
      case 'case-study':
        return 'bg-green-100 text-green-800';
      case 'report':
        return 'bg-purple-100 text-purple-800';
      case 'guide':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Resources & Publications</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our research papers, case studies, and educational resources on rural development and child welfare.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {publicationTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type.value)}
              className={`
                ${selectedType === type.value 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((publication) => (
            <div key={publication.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(publication.type)}`}>
                  {publication.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-neutral mb-2 line-clamp-2">
                {publication.title}
              </h3>

              {publication.authors && publication.authors.length > 0 && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Authors:</span> {publication.authors.join(', ')}
                </p>
              )}

              {publication.abstract && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {publication.abstract}
                </p>
              )}

              <div className="space-y-2 text-xs text-gray-500 mb-4">
                {publication.publishedDate && (
                  <div>
                    <span className="font-medium">Published:</span> {formatDate(publication.publishedDate)}
                  </div>
                )}
                
                {publication.journal && (
                  <div>
                    <span className="font-medium">Journal:</span> {publication.journal}
                  </div>
                )}
              </div>

              {publication.tags && publication.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {publication.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {publication.fileUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 group"
                    onClick={() => window.open(publication.fileUrl, '_blank')}
                  >
                    <Download className="h-3 w-3 mr-2 group-hover:animate-bounce" />
                    Download
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 group"
                  onClick={() => {
                    // Navigate to detailed view
                    console.log('View details for:', publication.id);
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? 'No resources found matching your search.' : 'Resources will be available soon.'}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-neutral mb-2">Collaborate with Us</h3>
            <p className="text-gray-600 text-sm mb-4">
              Interested in contributing to our research or accessing our complete resource library? 
              Get in touch with our research team.
            </p>
            <Button variant="outline">
              Contact Research Team
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}