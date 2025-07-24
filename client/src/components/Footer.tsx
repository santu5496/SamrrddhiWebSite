import { useQuery } from "@tanstack/react-query";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { ContactInfo } from "@shared/schema";

export default function Footer() {
  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <h3 className="text-xl font-bold">Samruddhi Service Society</h3>
                <p className="text-sm text-gray-300">Empowering since 1995</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dedicated to empowering underprivileged rural girls and differently-abled children through education, shelter, and comprehensive support services.
            </p>
            <div className="flex space-x-4">
              {contactInfo?.facebook && (
                <a 
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {contactInfo?.twitter && (
                <a 
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {contactInfo?.instagram && (
                <a 
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('programs')}
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('donate')}
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Donate
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>{contactInfo?.phone || "+91 12345 67890"}</p>
              <p>{contactInfo?.email || "info@samruddhisociety.org"}</p>
              <p className="whitespace-pre-line">
                {contactInfo?.address || "Village Name, District\nState, PIN Code"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Samruddhi Service Society. All rights reserved. | 
            <span className="text-secondary"> Registered NGO since 1995</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
