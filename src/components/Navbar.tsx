import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Categorías', path: '/categorias' },
    { name: 'Convocatoria FJ25', path: '/convocatoria' },
    { name: 'Proyectos', path: '/proyectos' },
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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/e5965530-7698-4137-9b1f-01fb9624fde0.png" 
            alt="Expo Ingenierías Logo" 
            className="h-16 md:h-20"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <NavigationMenu>
            <NavigationMenuList className="space-x-8">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium hover:text-expo-lightblue transition-colors ${
                      location.pathname === link.path ? 'text-expo-lightblue' : 'text-expo-blue'
                    }`}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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

      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base py-2 ${
                  location.pathname === link.path ? 'text-expo-lightblue font-semibold' : 'text-expo-blue'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="pt-2" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-expo-blue text-white hover:bg-expo-lightblue">Acceso</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
