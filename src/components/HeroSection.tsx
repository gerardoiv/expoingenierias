
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
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-expo-blue via-expo-blue/90 to-expo-lightblue">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            EXPO INGENIERÍAS
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-8">
            ¡La mayor experiencia vivencial donde la innovación y la ingeniería se encuentran!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/convocatoria">
              <Button className="bg-expo-orange hover:bg-expo-orange/90 text-white px-8 py-6 text-lg">
                Convocatoria AD24
              </Button>
            </Link>
            <Link to="/proyectos">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Ver Proyectos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <Button 
          variant="ghost" 
          className="text-white rounded-full p-2 hover:bg-white/10"
          onClick={scrollToNextSection}
        >
          <ArrowDownCircle size={32} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
