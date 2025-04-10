
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-expo-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/public/lovable-uploads/e5965530-7698-4137-9b1f-01fb9624fde0.png" 
            alt="Expo Ingenierías Logo" 
            className="h-16"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Expo Ingenierías</h3>
            <p className="text-gray-300">
              La mayor experiencia vivencial en el ámbito de la ingeniería, donde los estudiantes presentan soluciones innovadoras a problemas reales.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-expo-lightblue transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/categorias" className="text-gray-300 hover:text-expo-lightblue transition-colors">Categorías</Link>
              </li>
              <li>
                <Link to="/convocatoria" className="text-gray-300 hover:text-expo-lightblue transition-colors">Convocatoria</Link>
              </li>
              <li>
                <Link to="/proyectos" className="text-gray-300 hover:text-expo-lightblue transition-colors">Proyectos</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
            <p className="text-gray-300 mb-4">Mantente conectado en nuestras redes sociales para las últimas actualizaciones.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-expo-lightblue">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-expo-lightblue">
                <Facebook size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-expo-lightblue">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <img 
            src="/public/lovable-uploads/5a8dc511-1d4d-4b9b-8d70-4470cbf1bc63.png" 
            alt="Tec Ingenierías Logo" 
            className="h-10"
          />
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-300 text-sm">
          <p>Organizada y administrada por el grupo estudiantil Santa Fe is the way.</p>
          <p className="mt-2">© {new Date().getFullYear()} por Expo Ingenierías región CDMX.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
