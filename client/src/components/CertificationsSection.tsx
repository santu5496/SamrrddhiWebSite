
import { Shield, Award, FileCheck, Building2, Star, CheckCircle } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "80G Tax Exemption",
      issuer: "Income Tax Department",
      validUntil: "2025",
      description: "Donations are 100% tax deductible under Section 80G"
    },
    {
      icon: <FileCheck className="h-12 w-12 text-blue-600" />,
      title: "12A Registration",
      issuer: "Income Tax Department",
      validUntil: "Permanent",
      description: "Registered as a charitable trust with tax exemption benefits"
    },
    {
      icon: <Building2 className="h-12 w-12 text-purple-600" />,
      title: "FCRA Registration",
      issuer: "Ministry of Home Affairs",
      validUntil: "2026",
      description: "Authorized to receive foreign donations for charitable activities"
    },
    {
      icon: <Award className="h-12 w-12 text-yellow-600" />,
      title: "NGO Darpan Registration",
      issuer: "NITI Aayog",
      validUntil: "Active",
      description: "Registered on government's NGO portal for transparency"
    }
  ];

  const recognitions = [
    {
      title: "Best NGO Award 2023",
      issuer: "State Government",
      category: "Education Sector"
    },
    {
      title: "Excellence in Rural Development",
      issuer: "District Administration",
      category: "Community Service"
    },
    {
      title: "Women Empowerment Recognition",
      issuer: "Women & Child Development",
      category: "Social Impact"
    }
  ];

  const compliance = [
    "Annual audit by Chartered Accountant",
    "Regular financial reporting to authorities",
    "Compliance with Foreign Contribution Regulation Act",
    "Transparent utilization certificate submission",
    "Regular board meetings and governance",
    "Public disclosure of annual reports"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Government Recognition & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fully registered and compliant NGO with all necessary government certifications and recognition for transparent operations.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-neutral mb-8 text-center">Official Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="mb-4 flex justify-center">{cert.icon}</div>
                <h4 className="text-lg font-semibold text-neutral mb-2">{cert.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Issued by: {cert.issuer}</p>
                <p className="text-sm font-medium text-green-600 mb-3">Valid until: {cert.validUntil}</p>
                <p className="text-xs text-gray-700">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Awards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-neutral mb-8 text-center">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recognitions.map((recognition, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Star className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-neutral mb-2">{recognition.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{recognition.issuer}</p>
                <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs">
                  {recognition.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Governance */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-neutral mb-6 text-center">Compliance & Governance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compliance.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              All documents and certificates are available for verification
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View All Documents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
