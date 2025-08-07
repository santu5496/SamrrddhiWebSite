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

      <header className={`bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-gray-100 ${isHighContrast ? 'high-contrast' : ''}`} style={{fontSize: `${fontSize}px`}}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-vibrant transform group-hover:scale-110 transition-all duration-300">
                S
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Samruddhi Service Society</h1>
                <p className="text-xs sm:text-sm text-gray-600">✨ Empowering since 1995</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/') ? 'text-primary' : ''}`}>
                  <span className="relative z-10 flex items-center">
                    <Home className="inline h-4 w-4 mr-2" />
                    HOME
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/about">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/about') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">ABOUT</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/about') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/programs">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/programs') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">PROGRAMS</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/programs') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/leadership">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/leadership') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">LEADERSHIP</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/leadership') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/news">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/news') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">NEWS</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/news') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/events">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/events') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">EVENTS</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/events') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/media">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/media') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">MEDIA</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/media') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/gallery">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/gallery') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">GALLERY</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/gallery') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/resources">
                <button className={`relative px-4 py-2 font-medium text-sm text-gray-700 hover:text-primary transition-all duration-300 rounded-lg group ${isActive('/resources') ? 'text-primary' : ''}`}>
                  <span className="relative z-10">RESOURCES</span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${isActive('/resources') ? 'scale-100' : ''}`}></div>
                </button>
              </Link>
              
              <Link href="/donate">
                <Button className="btn-gradient text-white px-6 py-2 text-sm font-medium rounded-lg shadow-vibrant shimmer">
                  ❤️ DONATE
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