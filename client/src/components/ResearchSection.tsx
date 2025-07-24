
import { BookOpen, FileText, Award, Download, ExternalLink, Users } from "lucide-react";
import { Button } from "./ui/button";

export default function ResearchSection() {
  const publications = [
    {
      title: "Inclusive Education Models for Rural India",
      authors: "Dr. Sarah Patel, Samruddhi Research Team",
      year: "2024",
      type: "Research Paper",
      description: "Comprehensive study on effective inclusive education strategies for children with disabilities in rural settings.",
      downloadUrl: "#",
      citations: 15
    },
    {
      title: "Impact Assessment: Girls' Education in Rural Communities",
      authors: "Samruddhi Service Society",
      year: "2023",
      type: "Annual Report",
      description: "Detailed analysis of our girls' hostel program impact on educational outcomes and community development.",
      downloadUrl: "#",
      citations: 8
    },
    {
      title: "Best Practices in NGO Management",
      authors: "Management Team, Samruddhi",
      year: "2023",
      type: "White Paper",
      description: "Guidelines and methodologies for effective NGO operations in rural development sector.",
      downloadUrl: "#",
      citations: 12
    }
  ];

  const researchAreas = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Inclusive Education",
      description: "Developing innovative teaching methods for children with disabilities"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Community Development",
      description: "Research on sustainable rural development practices"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Gender Equality",
      description: "Studies on women empowerment and girls' education impact"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Research & Knowledge Sharing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contributing to the broader understanding of inclusive education and rural development through research, documentation, and knowledge sharing.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {researchAreas.map((area, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">{area.icon}</div>
              <h3 className="text-xl font-semibold text-neutral mb-3">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div>
          <h3 className="text-2xl font-semibold text-neutral mb-8 text-center">Recent Publications</h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                        {pub.type}
                      </span>
                      <span className="text-sm text-gray-500">{pub.year}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-neutral mb-2">{pub.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">By: {pub.authors}</p>
                    <p className="text-gray-700">{pub.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-sm text-gray-500">Citations: {pub.citations}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-white rounded-xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Collaborate with Us</h3>
          <p className="text-lg mb-6 opacity-90">
            Interested in research collaboration or accessing our complete research repository?
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100">
            Contact Research Team
          </Button>
        </div>
      </div>
    </section>
  );
}
