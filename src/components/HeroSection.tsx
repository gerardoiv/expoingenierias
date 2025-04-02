
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
    <div className="relative min-h-screen flex items-center bg-[#101a40]">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('/lovable-uploads/fbf73c34-f2c6-4e8d-afde-b534289c6d5a.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/a67a9f96-389e-44d4-b717-7db472f62633.png" 
              alt="Expo Ingenierías" 
              className="max-w-full h-auto w-3/4 md:w-1/2 mx-auto"
            />
          </div>
          
          <p className="text-xl md:text-3xl font-light text-white mb-8">
            ¡La mayor experiencia vivencial!
          </p>
          
          <Button 
            className="bg-[#00a3e0] hover:bg-[#0085b7] text-white px-10 py-6 text-xl rounded-md"
          >
            Ver más
          </Button>
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
