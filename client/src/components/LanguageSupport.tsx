
import { Globe, Users, BookOpen, Heart } from "lucide-react";

export default function LanguageSupport() {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Multi-Language Access",
      description: "Content available in 4 regional languages for better accessibility"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Inclusive Communication",
      description: "Reaching communities in their native languages"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-accent" />,
      title: "Educational Materials",
      description: "Learning resources in multiple languages"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Cultural Sensitivity",
      description: "Respecting and preserving local languages and culture"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Bridging Language Barriers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making education and support accessible in native languages, ensuring no child is left behind due to language barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-neutral mb-6">Available Languages</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {languages.map((lang) => (
                <div key={lang.code} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-neutral">{lang.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-neutral mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
