
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search,
  Users,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

interface Publication {
  id: number;
  title: string;
  type: string;
  authors: string[];
  abstract: string;
  publishedDate: string;
  journal: string;
  fileUrl: string;
  tags: string[];
}

export default function ResourcesSection() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch('/api/publications');
      const data = await response.json();
      setPublications(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'research': return <BookOpen className="h-4 w-4" />;
      case 'case-study': return <Users className="h-4 w-4" />;
      case 'report': return <TrendingUp className="h-4 w-4" />;
      case 'guide': return <Target className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'case-study': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-purple-100 text-purple-800';
      case 'guide': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || pub.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeStats = {
    research: publications.filter(p => p.type === 'research').length,
    'case-study': publications.filter(p => p.type === 'case-study').length,
    report: publications.filter(p => p.type === 'report').length,
    guide: publications.filter(p => p.type === 'guide').length,
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Resources & Publications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our research papers, case studies, and educational resources on rural development and child welfare.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{typeStats.research}</div>
              <div className="text-sm text-gray-600">Research Papers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{typeStats['case-study']}</div>
              <div className="text-sm text-gray-600">Case Studies</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{typeStats.report}</div>
              <div className="text-sm text-gray-600">Reports</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
                <Target className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{typeStats.guide}</div>
              <div className="text-sm text-gray-600">Guides</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
              size="sm"
            >
              All Resources
            </Button>
            <Button
              variant={selectedType === "research" ? "default" : "outline"}
              onClick={() => setSelectedType("research")}
              size="sm"
            >
              Research Papers
            </Button>
            <Button
              variant={selectedType === "case-study" ? "default" : "outline"}
              onClick={() => setSelectedType("case-study")}
              size="sm"
            >
              Case Studies
            </Button>
            <Button
              variant={selectedType === "report" ? "default" : "outline"}
              onClick={() => setSelectedType("report")}
              size="sm"
            >
              Reports
            </Button>
            <Button
              variant={selectedType === "guide" ? "default" : "outline"}
              onClick={() => setSelectedType("guide")}
              size="sm"
            >
              Guides
            </Button>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((publication) => (
            <Card key={publication.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getTypeColor(publication.type)} flex items-center gap-1`}>
                    {getTypeIcon(publication.type)}
                    {publication.type.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    {new Date(publication.publishedDate).getFullYear()}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {publication.title}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  {Array.isArray(publication.authors) ? publication.authors.join(', ') : publication.authors}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
                  {publication.abstract}
                </p>
                
                {publication.journal && (
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Published in:</span> {publication.journal}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {Array.isArray(publication.tags) && publication.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {Array.isArray(publication.tags) && publication.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{publication.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Contributing to Knowledge
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Our research and publications contribute to the broader understanding of effective rural development 
              strategies and inclusive education practices. We share our learnings to help other organizations 
              and researchers build upon our experiences.
            </p>
            <Button size="lg">
              Request Collaboration
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
