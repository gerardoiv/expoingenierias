
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Medalleros', path: '/medalleros' },
    { name: 'Ganadores', path: '/ganadores' },
    { name: 'Categorías', path: '/categorias' },
    { name: 'Convocatoria AD24', path: '/convocatoria' },
    { name: 'Proyectos', path: '/proyectos' },
  ];

  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com' },
    { icon: Facebook, url: 'https://facebook.com' },
    { icon: Youtube, url: 'https://youtube.com' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl md:text-2xl text-expo-blue">EXPO INGENIERÍAS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <div className="hidden md:flex space-x-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-expo-gray hover:text-expo-blue transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium hover:text-expo-orange transition-colors ${
                  location.pathname === link.path ? 'text-expo-orange' : 'text-expo-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/login">
            <Button variant="outline" className="border-expo-blue text-expo-blue hover:bg-expo-blue hover:text-white">
              Acceso
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-expo-blue">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base py-2 ${
                  location.pathname === link.path ? 'text-expo-orange font-semibold' : 'text-expo-blue'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="pt-2" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-expo-blue text-white hover:bg-expo-orange">Acceso</Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-expo-gray hover:text-expo-blue"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
