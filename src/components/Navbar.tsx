
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { 
      name: 'Inicio', 
      path: '/',
      hasDropdown: false 
    },
    { 
      name: 'Medalleros', 
      path: '/medalleros',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Campus CCM', path: '/medalleros#ccm' },
        { name: 'Campus CEM', path: '/medalleros#cem' },
        { name: 'Campus CSF', path: '/medalleros#csf' },
        { name: 'Campus TOL', path: '/medalleros#tol' },
      ]
    },
    { 
      name: 'Ganadores', 
      path: '/ganadores',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Edición AD23', path: '/ganadores#ad23' },
        { name: 'Edición FJ23', path: '/ganadores#fj23' },
        { name: 'Edición AD22', path: '/ganadores#ad22' },
      ]
    },
    { 
      name: 'Categorías', 
      path: '/categorias',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Desarrollo de propuesta de mejora', path: '/categorias#mejora' },
        { name: 'Desarrollo de prototipo físico', path: '/categorias#fisico' },
        { name: 'Desarrollo de prototipo digital', path: '/categorias#digital' },
        { name: 'Desarrollo de estancia de investigación o laboral', path: '/categorias#investigacion' },
        { name: 'Proyecto de fin de carrera', path: '/categorias#fin-carrera' },
      ]
    },
    { 
      name: 'Convocatoria AD24', 
      path: '/convocatoria',
      hasDropdown: false 
    },
    { 
      name: 'Proyectos', 
      path: '/proyectos',
      hasDropdown: false 
    },
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
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-[#101a40]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/tec.png" 
            alt="Tec de Monterrey" 
            className="h-8 mr-3" 
          />
          <span className={`font-bold text-xl md:text-2xl ${isScrolled ? 'text-expo-blue' : 'text-white'}`}>
            EXPO INGENIERÍAS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger 
                        className={`font-medium ${isScrolled ? 'text-expo-blue hover:text-expo-orange' : 'text-white hover:text-expo-orange'}`}
                      >
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-2">
                          {link.dropdownItems?.map((item) => (
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
                      className={`text-sm font-medium hover:text-expo-orange transition-colors px-3 py-2 ${
                        location.pathname === link.path 
                          ? 'text-expo-orange' 
                          : isScrolled ? 'text-expo-blue' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex space-x-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 hover:text-expo-orange transition-colors ${
                  isScrolled ? 'text-expo-blue' : 'text-white'
                }`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <Link to="/login">
            <Button 
              variant={isScrolled ? "outline" : "secondary"} 
              className={isScrolled 
                ? "border-expo-blue text-expo-blue hover:bg-expo-blue hover:text-white" 
                : "bg-expo-orange text-white hover:bg-white hover:text-expo-orange"
              }
            >
              Acceso
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={isScrolled ? "text-expo-blue" : "text-white"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-base py-2 text-expo-blue font-medium w-full justify-between">
                      {link.name}
                      <ChevronDown size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {link.dropdownItems?.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link to={item.path} onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-base py-2 ${
                      location.pathname === link.path ? 'text-expo-orange font-semibold' : 'text-expo-blue'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
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
