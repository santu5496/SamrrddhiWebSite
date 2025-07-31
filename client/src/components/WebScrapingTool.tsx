
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Globe, Search, Download, Copy } from "lucide-react";

interface ScrapedData {
  organizationName?: string;
  mission?: string;
  vision?: string;
  programs?: string[];
  achievements?: string[];
  leadership?: string[];
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  impactNumbers?: string[];
  testimonials?: string[];
}

export default function WebScrapingTool() {
  const [url, setUrl] = useState("https://www.vidyaranya.org/");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleScrape = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to scrape.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/scrape-ngo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to scrape website');
      }

      setScrapedData(result.data);
      toast({
        title: "Scraping Complete",
        description: "Website data has been successfully extracted.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Scraping Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  const downloadData = () => {
    if (!scrapedData) return;
    
    const dataStr = JSON.stringify(scrapedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scraped-ngo-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span>NGO Website Data Scraper</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example-ngo.org"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleScrape} 
                disabled={isLoading}
                className="px-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Scraping...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scrape Data
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {scrapedData && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Scraped Data</CardTitle>
            <Button onClick={downloadData} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                {scrapedData.organizationName && (
                  <div>
                    <Label className="font-semibold">Organization Name</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-lg">{scrapedData.organizationName}</p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(scrapedData.organizationName!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {scrapedData.mission && (
                  <div>
                    <Label className="font-semibold">Mission</Label>
                    <div className="flex items-start space-x-2 mt-1">
                      <p className="text-gray-700">{scrapedData.mission}</p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(scrapedData.mission!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {scrapedData.vision && (
                  <div>
                    <Label className="font-semibold">Vision</Label>
                    <div className="flex items-start space-x-2 mt-1">
                      <p className="text-gray-700">{scrapedData.vision}</p>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(scrapedData.vision!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="programs" className="space-y-4">
                {scrapedData.programs && scrapedData.programs.length > 0 && (
                  <div>
                    <Label className="font-semibold">Programs & Services</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {scrapedData.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="p-2 justify-start">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {scrapedData.achievements && scrapedData.achievements.length > 0 && (
                  <div>
                    <Label className="font-semibold">Achievements</Label>
                    <div className="space-y-1 mt-2">
                      {scrapedData.achievements.map((achievement, index) => (
                        <p key={index} className="text-sm text-gray-600">• {achievement}</p>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                {scrapedData.impactNumbers && scrapedData.impactNumbers.length > 0 && (
                  <div>
                    <Label className="font-semibold">Impact Numbers</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {scrapedData.impactNumbers.map((number, index) => (
                        <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{number}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {scrapedData.testimonials && scrapedData.testimonials.length > 0 && (
                  <div>
                    <Label className="font-semibold">Testimonials</Label>
                    <div className="space-y-2 mt-2">
                      {scrapedData.testimonials.map((testimonial, index) => (
                        <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                          "{testimonial}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                {scrapedData.contactInfo && (
                  <div className="space-y-3">
                    {scrapedData.contactInfo.address && (
                      <div>
                        <Label className="font-semibold">Address</Label>
                        <p className="text-gray-700 mt-1">{scrapedData.contactInfo.address}</p>
                      </div>
                    )}
                    {scrapedData.contactInfo.phone && (
                      <div>
                        <Label className="font-semibold">Phone</Label>
                        <p className="text-gray-700 mt-1">{scrapedData.contactInfo.phone}</p>
                      </div>
                    )}
                    {scrapedData.contactInfo.email && (
                      <div>
                        <Label className="font-semibold">Email</Label>
                        <p className="text-gray-700 mt-1">{scrapedData.contactInfo.email}</p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                {scrapedData.socialLinks && (
                  <div className="space-y-2">
                    <Label className="font-semibold">Social Media Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(scrapedData.socialLinks).map(([platform, link]) => (
                        link && (
                          <div key={platform} className="flex items-center justify-between p-2 border rounded">
                            <span className="capitalize">{platform}</span>
                            <a 
                              href={link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              View Profile
                            </a>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>1. Enter the URL of any NGO website you want to analyze</p>
          <p>2. Click "Scrape Data" to extract information</p>
          <p>3. Review the organized data in the tabs above</p>
          <p>4. Copy individual pieces of content or download the complete JSON file</p>
          <p>5. Use this information to enhance your own NGO website</p>
        </CardContent>
      </Card>
    </div>
  );
}
