import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { 
      name: 'Medalleros', 
      path: '/medalleros',
      dropdown: [
        { name: 'Medallero 2023', path: '/medalleros/2023' },
        { name: 'Medallero 2022', path: '/medalleros/2022' },
        { name: 'Medallero 2021', path: '/medalleros/2021' },
      ]
    },
    { 
      name: 'Ganadores', 
      path: '/ganadores',
      dropdown: [
        { name: 'Ganadores 2023', path: '/ganadores/2023' },
        { name: 'Ganadores 2022', path: '/ganadores/2022' },
        { name: 'Ganadores 2021', path: '/ganadores/2021' },
      ]
    },
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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/e5965530-7698-4137-9b1f-01fb9624fde0.png" 
            alt="Expo Ingenierías Logo" 
            className="h-12"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <div className="hidden md:flex space-x-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-expo-gray hover:text-expo-lightblue transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  {link.dropdown ? (
                    <>
                      <NavigationMenuTrigger className={`text-sm font-medium hover:text-expo-lightblue transition-colors ${
                        location.pathname === link.path ? 'text-expo-lightblue' : 'text-expo-blue'
                      }`}>
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-2">
                          {link.dropdown.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={item.path}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{item.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-sm font-medium hover:text-expo-lightblue transition-colors ${
                        location.pathname === link.path ? 'text-expo-lightblue' : 'text-expo-blue'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <div key={link.name} className="py-1">
                {link.dropdown ? (
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between py-1">
                      <span className={`text-base ${
                        location.pathname === link.path ? 'text-expo-lightblue font-semibold' : 'text-expo-blue'
                      }`}>
                        {link.name}
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="text-sm text-expo-blue hover:text-expo-lightblue"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-base py-2 ${
                      location.pathname === link.path ? 'text-expo-lightblue font-semibold' : 'text-expo-blue'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" className="pt-2" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-expo-blue text-white hover:bg-expo-lightblue">Acceso</Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-expo-gray hover:text-expo-lightblue"
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
