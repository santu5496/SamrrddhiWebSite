import { useQuery } from "@tanstack/react-query";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { ContactInfo } from "@shared/schema";

export default function Footer() {
  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  // Parse social media data if it exists
  let socialMediaData = null;
  try {
    if (contactInfo?.socialMedia && typeof contactInfo.socialMedia === 'string') {
      socialMediaData = JSON.parse(contactInfo.socialMedia);
    } else if (contactInfo?.socialMedia && typeof contactInfo.socialMedia === 'object') {
      socialMediaData = contactInfo.socialMedia;
    }
  } catch (error) {
    console.warn('Failed to parse social media data:', error);
    socialMediaData = null;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-vibrant">
                S
              </div>
              <div>
                <h3 className="text-xl font-bold">Samruddhi Service Society</h3>
                <p className="text-sm text-gray-300 flex items-center">
                  ✨ Empowering since 1995 • 29 Years of Impact
                </p>
              </div>
            </div>
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              Dedicated to empowering underprivileged rural girls and differently-abled children through education, shelter, and comprehensive support services. Join us in making a lasting impact.
            </p>
            
            {/* Impact stats mini section */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">501+</div>
                <div className="text-xs text-gray-400">Children Helped</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">29</div>
                <div className="text-xs text-gray-400">Years Service</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">12</div>
                <div className="text-xs text-gray-400">Programs</div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {socialMediaData?.facebook ? (
                <a 
                  href={socialMediaData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-blue-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              ) : (
                <a 
                  href="https://facebook.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-blue-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              )}
              {socialMediaData?.twitter ? (
                <a 
                  href={socialMediaData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-sky-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              ) : (
                <a 
                  href="https://twitter.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-sky-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              )}
              {socialMediaData?.instagram ? (
                <a 
                  href={socialMediaData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-pink-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              ) : (
                <a 
                  href="https://instagram.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card text-gray-300 hover:text-pink-400 transition-all duration-300 p-3 rounded-xl hover:scale-110 transform group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-sm sm:text-base text-gray-300 hover:text-secondary transition-colors touch-target"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-sm sm:text-base text-gray-300 hover:text-secondary transition-colors touch-target"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('programs')}
                  className="text-sm sm:text-base text-gray-300 hover:text-secondary transition-colors touch-target"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('donate')}
                  className="text-sm sm:text-base text-gray-300 hover:text-secondary transition-colors touch-target"
                >
                  Donate
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-sm sm:text-base text-gray-300 hover:text-secondary transition-colors touch-target"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">📞</span>
                <p className="text-sm sm:text-base">{contactInfo?.phone || "+91 9876543210"}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">✉️</span>
                <p className="text-sm sm:text-base break-all">{contactInfo?.email || "contact@samruddhisociety.org"}</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sm sm:text-base mt-0.5">📍</span>
                <p className="text-sm sm:text-base leading-relaxed">
                  {contactInfo?.address || "Samruddhi Service Society, Village Nashik, Maharashtra, India - 422001"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-300 mobile-text">
            © 2024 Samruddhi Service Society. All rights reserved. | 
            <span className="text-secondary"> Registered NGO since 1995</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
