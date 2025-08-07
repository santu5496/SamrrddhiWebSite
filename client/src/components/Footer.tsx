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
    <footer className="bg-neutral text-white py-8 sm:py-12 lg:py-16 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-optimized">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Samruddhi Service Society</h3>
                <p className="text-xs sm:text-sm text-gray-300">Empowering since 1995</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 mobile-text">
              Dedicated to empowering underprivileged rural girls and differently-abled children through education, shelter, and comprehensive support services.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialMediaData?.facebook ? (
                <a 
                  href={socialMediaData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              ) : (
                <a 
                  href="https://facebook.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialMediaData?.twitter ? (
                <a 
                  href={socialMediaData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              ) : (
                <a 
                  href="https://twitter.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialMediaData?.instagram ? (
                <a 
                  href={socialMediaData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ) : (
                <a 
                  href="https://instagram.com/samruddhisociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors touch-target p-2 rounded-full hover:bg-white/10"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
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
