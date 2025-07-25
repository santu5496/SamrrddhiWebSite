
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, ExternalLink, FileText, Video, BookOpen, Users } from 'lucide-react';

export default function ResourcesSection() {
  const resources = [
    {
      category: "Annual Reports",
      items: [
        { title: "Annual Report 2023-24", type: "PDF", size: "2.5 MB", icon: FileText },
        { title: "Annual Report 2022-23", type: "PDF", size: "2.1 MB", icon: FileText },
        { title: "Financial Summary 2023", type: "PDF", size: "1.8 MB", icon: FileText }
      ]
    },
    {
      category: "Educational Materials",
      items: [
        { title: "Girls Education Handbook", type: "PDF", size: "4.2 MB", icon: BookOpen },
        { title: "Health & Hygiene Guide", type: "PDF", size: "3.1 MB", icon: BookOpen },
        { title: "Skill Development Modules", type: "PDF", size: "5.6 MB", icon: BookOpen }
      ]
    },
    {
      category: "Research Papers",
      items: [
        { title: "Impact of Education on Rural Girls", type: "PDF", size: "1.9 MB", icon: FileText },
        { title: "Community Development Study", type: "PDF", size: "2.3 MB", icon: FileText },
        { title: "Healthcare Access Report", type: "PDF", size: "1.7 MB", icon: FileText }
      ]
    },
    {
      category: "Training Materials",
      items: [
        { title: "Volunteer Training Kit", type: "PDF", size: "3.8 MB", icon: Users },
        { title: "Teacher Training Manual", type: "PDF", size: "4.5 MB", icon: Users },
        { title: "Community Leader Guide", type: "PDF", size: "2.9 MB", icon: Users }
      ]
    }
  ];

  const externalLinks = [
    { title: "Ministry of Women & Child Development", url: "#", icon: ExternalLink },
    { title: "National Education Portal", url: "#", icon: ExternalLink },
    { title: "Rural Development Resources", url: "#", icon: ExternalLink },
    { title: "NGO Partnership Network", url: "#", icon: ExternalLink }
  ];

  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Resources & Downloads</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive collection of reports, educational materials, and research papers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {resources.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category.category}</CardTitle>
                <CardDescription>Download the latest {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.type} • {item.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary">Useful Links</CardTitle>
            <CardDescription>External resources and partner organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {externalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group"
                >
                  <span className="font-medium">{link.title}</span>
                  <link.icon className="h-4 w-4 group-hover:text-white" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
