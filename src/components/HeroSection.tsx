
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDownCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background image with darker overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/IMG_5737.JPG')",
        }}
      ></div>
      
      {/* Darker overlay for better contrast */}
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 p-8 rounded-2xl backdrop-blur-sm mb-8 inline-block">
            <img 
              src="/lovable-uploads/e5965530-7698-4137-9b1f-01fb9624fde0.png" 
              alt="Expo Ingenierías Logo" 
              className="w-full max-w-lg mx-auto"
            />
          </div>
          <p className="text-xl md:text-2xl font-light text-white mb-8 bg-expo-blue/80 py-4 px-6 rounded-xl backdrop-blur-sm inline-block">
            ¡La mayor experiencia vivencial donde la innovación y la ingeniería se encuentran!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/convocatoria">
              <Button className="bg-expo-lightblue hover:bg-expo-lightblue/90 text-white px-8 py-6 text-lg">
                Convocatoria AD24
              </Button>
            </Link>
            <Link to="/proyectos">
              <Button variant="outline" className="border-expo-blue text-expo-blue hover:bg-expo-blue/10 px-8 py-6 text-lg">
                Ver Proyectos
              </Button>
            </Link>
          </div>
          
          <div className="mt-12">
            <img 
              src="/lovable-uploads/5a8dc511-1d4d-4b9b-8d70-4470cbf1bc63.png" 
              alt="Tec Ingenierías Logo" 
              className="h-16 mx-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <Button 
          variant="ghost" 
          className="text-expo-blue rounded-full p-2 hover:bg-expo-blue/10"
          onClick={scrollToNextSection}
        >
          <ArrowDownCircle size={32} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
