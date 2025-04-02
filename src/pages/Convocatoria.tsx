
import React from 'react';
import { Button } from '@/components/ui/button';
import Timeline from '@/components/Timeline';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

const Convocatoria = () => {
  const timelineEvents = [
    {
      date: '31/10/2024',
      title: 'Apertura de sistema de registro.'
    },
    {
      date: '21/11/2024',
      title: 'Cierre de registro CCM.'
    },
    {
      date: '28/11/2024',
      title: 'Cierre de registro CSF y TOL.'
    },
    {
      date: '22/11/2024',
      title: 'Límite para entrega de póster digital y video en CCM.'
    },
    {
      date: '29/11/2024',
      title: 'Límite para entrega de póster digital y video en CSF y TOL.'
    },
    {
      date: '27/11/2024',
      title: '4ta Expo ingenierías región CDMX - Campus Ciudad de México'
    },
    {
      date: '29/11/2024',
      title: '4ta Expo ingenierías región CDMX - Campus Estado de México'
    },
    {
      date: '02/12/2024',
      title: '4ta Expo ingenierías región CDMX - Campus Santa Fe'
    },
    {
      date: '05/12/2024',
      title: '4ta Expo ingenierías región CDMX - Campus Toluca'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container-section">
        <h1 className="section-heading">Convocatoria AD24</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Los grupos estudiantiles SANTA FE IS THE WAY, SAIBT CCM, SEEIC TOL, junto a la Escuela de Ingeniería y Ciencias, 
            invita a todas y todos sus estudiantes con el apoyo de docentes a postularse como expositores en la 4ta EXPO INGENIERÍAS región CDMX.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="flex items-center gap-2 bg-expo-blue hover:bg-expo-lightblue">
              <Download size={16} />
              Descargar convocatoria
            </Button>
            <Button variant="outline" className="border-expo-blue text-expo-blue hover:bg-expo-blue hover:text-white">
              Registrar proyecto
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-expo-blue mb-6">Requisitos para participar</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-expo-blue">Elegibilidad</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Ser estudiante activo de algún programa de la Escuela de Ingeniería y Ciencias.</li>
                  <li>El proyecto debe haberse desarrollado durante el semestre Agosto-Diciembre 2024.</li>
                  <li>Contar con el aval de un profesor vinculado al proyecto.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-expo-blue">Equipo</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Máximo 4 integrantes por equipo.</li>
                  <li>Todos los integrantes deben ser estudiantes activos.</li>
                  <li>Se permite la participación individual.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-expo-blue">Documentación</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Formato de registro completo.</li>
                  <li>Póster digital según la plantilla proporcionada.</li>
                  <li>Video explicativo de máximo 3 minutos.</li>
                  <li>Carta de consentimiento para uso de imagen.</li>
                </ul>
              </div>
            </div>
          </Card>
          
          <div>
            <h2 className="text-2xl font-bold text-expo-blue mb-6">Fechas Importantes</h2>
            <Timeline events={timelineEvents} />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-expo-blue mb-6 text-center">Proceso de evaluación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-expo-blue mb-4">Fase 1: Pre-evaluación</h3>
              <p className="text-gray-700">
                Revisión de documentación y materiales entregados. Los proyectos serán evaluados por su completitud y cumplimiento de requisitos básicos.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold text-expo-blue mb-4">Fase 2: Exposición</h3>
              <p className="text-gray-700">
                Presentación del proyecto durante el evento. Los jueces evaluarán la calidad de la presentación, dominio del tema y respuestas a preguntas.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold text-expo-blue mb-4">Fase 3: Deliberación</h3>
              <p className="text-gray-700">
                Los jueces deliberarán considerando criterios específicos para cada categoría. Los resultados serán anunciados al finalizar el evento.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convocatoria;
