import { useState } from "react";
import { Menu, X, Volume2, Type, Eye, ChevronDown, Heart, Users, Handshake, UserPlus, Building } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Accessibility Toolbar */}
      <div className="bg-neutral text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-4 text-sm">
          <button 
            onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Increase font size"
          >
            <Type className="h-4 w-4" />
            <span>A+</span>
          </button>
          <button 
            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Decrease font size"
          >
            <Type className="h-3 w-3" />
            <span>A-</span>
          </button>
          <button 
            onClick={() => setIsHighContrast(!isHighContrast)}
            className="flex items-center space-x-1 hover:text-secondary"
            aria-label="Toggle high contrast"
          >
            <Eye className="h-4 w-4" />
            <span>Contrast</span>
          </button>
          <span className="text-xs">Screen Reader Compatible</span>
        </div>
      </div>

      <header className={`bg-white shadow-md sticky top-0 z-50 ${isHighContrast ? 'high-contrast' : ''}`} style={{fontSize: `${fontSize}px`}}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral">Samruddhi Service Society</h1>
                <p className="text-sm text-gray-600">Empowering since 1995</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                ABOUT
              </button>
              
              <button 
                onClick={() => scrollToSection('programs')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                PROGRAMS
              </button>
              
              <button 
                onClick={() => scrollToSection('leadership')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                LEADERSHIP
              </button>
              
              <button 
                onClick={() => scrollToSection('news')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                NEWS
              </button>
              
              <button 
                onClick={() => scrollToSection('events')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                EVENTS
              </button>
              
              <button 
                onClick={() => scrollToSection('media')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                MEDIA
              </button>
              
              <button 
                onClick={() => scrollToSection('gallery')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                GALLERY
              </button>
              
              <button 
                onClick={() => scrollToSection('resources')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                RESOURCES
              </button>
              
              <button 
                onClick={() => scrollToSection('how-to-help')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                HOW TO HELP
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded"
              >
                CONTACT
              </button>
              
              <Button 
                onClick={() => scrollToSection('donate')} 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide transform hover:scale-110 transition-all duration-300 hover:shadow-lg animate-pulse-hover"
              >
                DONATE
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral hover:text-primary"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('what-we-do')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  What We Do
                </button>
                <button 
                  onClick={() => scrollToSection('how-to-help')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  How to Help
                </button>
                <button 
                  onClick={() => scrollToSection('programs')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Programs
                </button>
                <button 
                  onClick={() => scrollToSection('leadership')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Leadership
                </button>
                <button 
                  onClick={() => scrollToSection('news')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  News
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => scrollToSection('events')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Events
                </button>
                <button 
                  onClick={() => scrollToSection('media')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Media
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block px-3 py-2 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left"
                >
                  Contact Us
                </button>
                <button 
                  onClick={() => scrollToSection('donate')}
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md w-full text-left"
                >
                  Donate Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}