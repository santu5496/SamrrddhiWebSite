import { useState } from "react";
import { Menu, X, Type, Eye, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [location] = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location === path;

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
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-neutral">Samruddhi Service Society</h1>
                <p className="text-xs sm:text-sm text-gray-600">Empowering since 1995</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <Link href="/">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/') ? 'text-primary bg-primary/10' : ''}`}>
                  <Home className="inline h-4 w-4 mr-1" />
                  HOME
                </button>
              </Link>
              
              <Link href="/about">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/about') ? 'text-primary bg-primary/10' : ''}`}>
                  ABOUT
                </button>
              </Link>
              
              <Link href="/programs">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/programs') ? 'text-primary bg-primary/10' : ''}`}>
                  PROGRAMS
                </button>
              </Link>
              
              <Link href="/leadership">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/leadership') ? 'text-primary bg-primary/10' : ''}`}>
                  LEADERSHIP
                </button>
              </Link>
              
              <Link href="/news">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/news') ? 'text-primary bg-primary/10' : ''}`}>
                  NEWS
                </button>
              </Link>
              
              <Link href="/events">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/events') ? 'text-primary bg-primary/10' : ''}`}>
                  EVENTS
                </button>
              </Link>
              
              <Link href="/media">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/media') ? 'text-primary bg-primary/10' : ''}`}>
                  MEDIA
                </button>
              </Link>
              
              <Link href="/gallery">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/gallery') ? 'text-primary bg-primary/10' : ''}`}>
                  GALLERY
                </button>
              </Link>
              
              <Link href="/resources">
                <button className={`text-neutral hover:text-primary transition-all duration-300 font-medium uppercase text-xs tracking-wide transform hover:scale-105 hover:shadow-lg px-2 py-1 rounded ${isActive('/resources') ? 'text-primary bg-primary/10' : ''}`}>
                  RESOURCES
                </button>
              </Link>
              
              <Link href="/donate">
                <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide transform hover:scale-110 transition-all duration-300 hover:shadow-lg animate-pulse-hover">
                  DONATE
                </Button>
              </Link>
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
            <div className="lg:hidden absolute left-0 right-0 top-full z-40">
              <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t shadow-lg max-h-screen overflow-y-auto">
                <Link href="/" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/') ? 'text-primary bg-primary/10' : ''}`}>
                    <Home className="inline h-4 w-4 mr-2" />
                    Home
                  </div>
                </Link>
                <Link href="/about" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/about') ? 'text-primary bg-primary/10' : ''}`}>
                    About Us
                  </div>
                </Link>
                <Link href="/programs" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/programs') ? 'text-primary bg-primary/10' : ''}`}>
                    Programs
                  </div>
                </Link>
                <Link href="/leadership" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/leadership') ? 'text-primary bg-primary/10' : ''}`}>
                    Leadership
                  </div>
                </Link>
                <Link href="/news" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/news') ? 'text-primary bg-primary/10' : ''}`}>
                    News
                  </div>
                </Link>
                <Link href="/events" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/events') ? 'text-primary bg-primary/10' : ''}`}>
                    Events
                  </div>
                </Link>
                <Link href="/media" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/media') ? 'text-primary bg-primary/10' : ''}`}>
                    Media
                  </div>
                </Link>
                <Link href="/gallery" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/gallery') ? 'text-primary bg-primary/10' : ''}`}>
                    Gallery
                  </div>
                </Link>
                <Link href="/resources" onClick={closeMenu}>
                  <div className={`block px-3 py-3 text-base font-medium text-neutral hover:text-primary hover:bg-gray-50 w-full text-left rounded-md transition-colors ${isActive('/resources') ? 'text-primary bg-primary/10' : ''}`}>
                    Resources
                  </div>
                </Link>
                <Link href="/donate" onClick={closeMenu}>
                  <div className="block px-3 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md w-full text-left transition-colors">
                    Donate Now
                  </div>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}