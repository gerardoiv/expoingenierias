import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ImportantDates from '@/components/ImportantDates';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, Clock } from 'lucide-react';
const Index = () => {
  const categories = [{
    id: 1,
    title: 'Propuestas de mejora',
    description: 'Solución a un problema o necesidad',
    fullDescription: 'Solución a un problema o necesidad de investigación y desarrollo de una propuesta de solución aplicando la teoría. Resultado típico: reporte, propuesta de mejora, diseño de solución o método nuevo. Evidencia: Póster.'
  }, {
    id: 2,
    title: 'Prototipo físico',
    description: 'Desarrollo de prototipos funcionales',
    fullDescription: 'Desarrollo de un prototipo físico funcional para demostrar la solución a un problema o necesidad. Resultado típico: Prototipo funcional de máquina, mecanismo, dispositivo, artefacto o similar. Evidencia: Prototipo físico y póster.'
  }, {
    id: 3,
    title: 'Prototipo digital',
    description: 'Soluciones digitales innovadoras',
    fullDescription: 'Desarrollo de software, app, página web, simulador, etc. para solucionar un problema. Resultado típico: Prototipo funcional de aplicación web/móvil, software, simulador. Evidencia: póster y prototipo de software o aplicación de TI funcional.'
  }, {
    id: 4,
    title: 'Estancia de investigación/profesional',
    description: 'Proyectos de investigación',
    fullDescription: 'Desarrollo de metodología científica para abordar y presentar proyectos de investigación. Resultado: Artículo o ponencia. Evidencia: póster.'
  }, {
    id: 5,
    title: 'Proyecto de fin de carrera',
    description: 'Proyectos integradores',
    fullDescription: 'Únicamente alumnos de último semestre en bloques integradores o multidisciplinarios. Desarrollo de un prototipo o proceso que integre las competencias disciplinares de carrera. Resultado: Nuevo producto o proceso mejorado, prototipo funcional que resuelva una necesidad industrial o comercial. Evidencia: Prototipo físico y póster.'
  }];
  return <>
      <HeroSection />
      
      <section id="about-section" className="container-section bg-white">
        <h2 className="section-heading">¿Qué es Expo Ingenierías?</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            Es un evento sobre inspirar, desafiar y empujar a los estudiantes más allá de sus límites fuera del aula. Se les alienta a aplicar lo aprendido en situaciones reales y a superar obstáculos con determinación. Con la próxima 5ta Expo ingenierías región CDMX edición Febrero-Junio 2025, tenemos la magnífica oportunidad de fomentar el aprendizaje práctico, fortalecer competencias, promover colaboración y liderazgo, y dejar que el potencial de los participantes resplandezca. ¡Les invitamos a ser parte de esto!
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
      
      <section className="container-section bg-white">
        <h2 className="section-heading">Categorías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => <div key={category.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-expo-lightblue transition-all duration-300">
              <h3 className="text-xl font-semibold text-expo-blue mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <p className="text-gray-700 text-sm">{category.fullDescription}</p>
            </div>)}
        </div>
      </section>
      
      <section className="relative py-24 bg-expo-blue text-white">
        <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Listo para participar?</h2>
            <p className="text-xl md:text-2xl mb-8 font-light">La escuela de ingeniería y ciencias de campus santa fe invita a Expo Ingenierías.</p>
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
    </>;
};
export default Index;
