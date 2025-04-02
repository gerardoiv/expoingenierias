
import React from 'react';
import CategoryCard from '@/components/CategoryCard';

const Categorias = () => {
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
    },
    {
      id: 4,
      title: 'Desarrollo de estancia de investigación o laboral',
      description: 'Investigación avanzada con aplicaciones reales',
      fullDescription: 'Investigación avanzada centrada en el desarrollo de metodologías novedosas para impulsar la ciencia o tecnología, con aplicaciones directas en beneficio de la comunidad, esferas comerciales o industriales. Innovaciones con potencial para generar cambios reales.'
    },
    {
      id: 5,
      title: 'Proyecto de fin de carrera',
      description: 'Prototipos o procesos de alto impacto',
      fullDescription: 'Prototipo o proceso destacado por su innovación y alto impacto, que combina competencias clave de la carrera y habilidades adicionales, diseñado por estudiantes en su último semestre. Para proyectos que aplican conocimientos de manera práctica y completa, ofreciendo una solución integradora y versátil ante desafíos profesionales.'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container-section">
        <h1 className="section-heading">Categorías</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700">
            Expo Ingenierías ofrece diversas categorías para que puedas presentar tu proyecto según sus características específicas. 
            Cada categoría tiene criterios de evaluación propios y premiaciones diferenciadas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
