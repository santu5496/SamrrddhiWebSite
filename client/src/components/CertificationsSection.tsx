import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, Calendar, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface Certification {
  id: number;
  title: string;
  issuingAuthority: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  description?: string;
  category?: string;
  certificateUrl?: string;
}

export default function CertificationsSection() {
  const { data: certifications = [], isLoading } = useQuery<Certification[]>({
    queryKey: ['/api/certifications'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                  <div className="h-12 w-12 bg-gray-300 rounded"></div>
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
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'tax-exemption':
        return Shield;
      case 'registration':
        return Award;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'tax-exemption':
        return 'bg-green-100 text-green-800';
      case 'registration':
        return 'bg-blue-100 text-blue-800';
      case 'accreditation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Certifications & Recognition</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our official certifications and recognition that demonstrate our credibility and commitment to transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => {
            const IconComponent = getCategoryIcon(cert.category);
            return (
              <div key={cert.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  {cert.category && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(cert.category)}`}>
                      {cert.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-neutral mb-2">
                  {cert.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Issued by:</span> {cert.issuingAuthority}
                </p>

                {cert.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {cert.description}
                  </p>
                )}

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  {cert.certificateNumber && (
                    <div>
                      <span className="font-medium">Certificate No:</span> {cert.certificateNumber}
                    </div>
                  )}
                  
                  {cert.issueDate && (
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="font-medium">Issued:</span> {formatDate(cert.issueDate)}
                    </div>
                  )}

                  {cert.expiryDate && (
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="font-medium">Expires:</span> {formatDate(cert.expiryDate)}
                    </div>
                  )}
                </div>

                {cert.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group"
                    onClick={() => window.open(cert.certificateUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    View Certificate
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Certification information will be available soon.</p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-neutral mb-4 text-center">Why Our Certifications Matter</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-neutral mb-1">Legal Compliance</h4>
              <p className="text-sm text-gray-600">All our operations comply with government regulations and standards.</p>
            </div>
            <div>
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-neutral mb-1">Tax Benefits</h4>
              <p className="text-sm text-gray-600">Donations to our organization are eligible for tax exemptions under 80G.</p>
            </div>
            <div>
              <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-neutral mb-1">Transparency</h4>
              <p className="text-sm text-gray-600">Our certifications ensure accountability and transparent use of funds.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}