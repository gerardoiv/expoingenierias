import React from 'react';
import HeroSection from '@/components/HeroSection';
import EventCard from '@/components/EventCard';
import CategoryCard from '@/components/CategoryCard';
import ImportantDates from '@/components/ImportantDates';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const events = [
    {
      campus: 'Campus Ciudad de México (CCM)',
      location: 'CEDETEC',
      date: '27 de Noviembre, 2024',
      time: '16:00 hrs'
    },
    {
      campus: 'Campus Estado de México (CEM)',
      location: 'Centro de Congresos',
      date: '29 de Noviembre, 2024',
      time: '10:00 hrs'
    },
    {
      campus: 'Campus Santa Fe (CSF)',
      location: 'SUM',
      date: '2 de Diciembre, 2024',
      time: '16:00 hrs'
    },
    {
      campus: 'Campus Toluca (TOL)',
      location: 'IGLÚ 2',
      date: '5 de Diciembre, 2024',
      time: '13:00 hrs'
    }
  ];

  const categories = [
    {
      id: 1,
      title: 'Desarrollo de propuesta de mejora',
      description: 'Soluciones teóricas para problemas específicos',
      fullDescription: 'Esta categoría se centra en soluciones teóricas para problemas específicos, sin requerir prototipos físicos o digitales. Las participaciones deben basarse en propuestas o uso de metodología sólida, mostrando cómo la teoría aplicada contribuye a la solución. Se valora la innovación, viabilidad y el impacto en situaciones reales.'
    },
    {
      id: 2,
      title: 'Desarrollo de prototipo físico',
      description: 'Diseño y construcción de prototipos funcionales',
      fullDescription: 'Esta categoría desafía a los participantes a diseñar, construir y demostrar prototipos funcionales que ofrezcan soluciones innovadoras a problemas actuales o necesidades insatisfechas. Los proyectos pueden abarcar una amplia gama de campos de la ingeniería, desde dispositivos médicos hasta sistemas de automatización y más allá.'
    },
    {
      id: 3,
      title: 'Desarrollo de prototipo digital',
      description: 'Soluciones digitales innovadoras',
      fullDescription: 'Esta categoría premia la creación innovadora de soluciones digitales, tales como software, aplicaciones, sitios web, o simuladores, todas diseñadas meticulosamente para abordar desafíos concretos. Se valora la innovación técnica, funcionalidad superior, y el impacto positivo potencial de los prototipos presentados.'
    }
  ];

  return (
    <>
      <HeroSection />
      
      <section id="about-section" className="container-section bg-white">
        <h2 className="section-heading">¿Qué es Expo Ingenierías?</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            Es un evento sobre inspirar, desafiar y empujar a los estudiantes más allá de sus límites fuera del aula. Se les alienta a aplicar lo aprendido en situaciones reales y a superar obstáculos con determinación. Con la próxima 4ta Expo ingenierías región CDMX edición Agosto - Diciembre 24, tenemos la magnífica oportunidad de fomentar el aprendizaje práctico, fortalecer competencias, promover colaboración y liderazgo, y dejar que el potencial de los participantes resplandezca. ¡Les invitamos a ser parte de esto!
          </p>
          <div className="flex justify-center">
            <Link to="/convocatoria">
              <Button className="bg-expo-blue hover:bg-expo-lightblue text-white">
                Conoce más
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <ImportantDates />
      
      <section className="container-section bg-expo-lightgray">
        <h2 className="section-heading">Exposición</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>
      
      <section className="container-section bg-white">
        <h2 className="section-heading">Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/categorias">
            <Button variant="outline" className="border-expo-blue text-expo-blue hover:bg-expo-blue hover:text-white">
              Ver todas las categorías
            </Button>
          </Link>
        </div>
      </section>
      
      <section className="relative py-24 bg-expo-blue text-white">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Listo para participar?</h2>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Los grupos estudiantiles SANTA FE IS THE WAY, SAIBT CCM, SEEIC TOL, junto a la Escuela de Ingeniería y Ciencias, invita a todas y todos sus estudiantes con el apoyo de docentes a postularse como expositores.
            </p>
            <div className="flex justify-center">
              <Link to="/convocatoria">
                <Button className="bg-expo-lightblue hover:bg-expo-lightblue/90 text-white text-lg px-8 py-6">
                  Consultar convocatoria
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
