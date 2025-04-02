
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Ganadores = () => {
  const categories = [
    "Todas",
    "Propuesta de Mejora",
    "Prototipo Físico",
    "Prototipo Digital",
    "Estancia de Investigación",
    "Proyecto Fin de Carrera"
  ];

  const winnerProjects = [
    {
      id: 1,
      name: "Sistema de Monitoreo de Calidad del Aire Urbano",
      team: "AirGuardians",
      members: ["Ana Martínez", "Carlos López", "Diana Rodríguez", "Eduardo Torres"],
      category: "Prototipo Físico",
      description: "Sistema IoT para monitorear en tiempo real la calidad del aire en zonas urbanas, alertando sobre contaminantes y proporcionando datos para políticas públicas ambientales.",
      award: "Primer Lugar General",
      image: "https://images.unsplash.com/photo-1553825250-86c229c0de26?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Plataforma de Diagnóstico Médico con IA",
      team: "MedIA",
      members: ["Fernando Sánchez", "Gabriela Mendoza", "Hugo Ramírez"],
      category: "Prototipo Digital",
      description: "Aplicación que utiliza inteligencia artificial para asistir en el diagnóstico preliminar de condiciones médicas comunes, facilitando el acceso a información de salud en zonas remotas.",
      award: "Segundo Lugar General",
      image: "https://images.unsplash.com/photo-1586567412928-a014e77674ce?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Optimización de Rutas de Emergencia Metropolitanas",
      team: "RescueRoute",
      members: ["Isabel Vega", "Javier Ortiz", "Karla Mendez", "Luis Aguilar"],
      category: "Propuesta de Mejora",
      description: "Metodología avanzada para optimizar las rutas de emergencia en zonas metropolitanas considerando patrones de tráfico, obras viales y eventos especiales en tiempo real.",
      award: "Tercer Lugar General",
      image: "https://images.unsplash.com/photo-1580982327559-c1202864eb05?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "BioPlástico a base de Residuos Agrícolas",
      team: "EcoMaterial",
      members: ["Manuel Cruz", "Natalia Herrera", "Oscar Palma"],
      category: "Estancia de Investigación",
      description: "Desarrollo de un material biodegradable similar al plástico utilizando residuos agrícolas locales, ofreciendo una alternativa sostenible a los envases convencionales.",
      award: "Premio a la Innovación Sostenible",
      image: "https://images.unsplash.com/photo-1592561202402-593fa0df4875?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Sistema Autónomo de Detección de Incendios Forestales",
      team: "FireGuard",
      members: ["Patricia León", "Raúl Jiménez", "Sandra Vargas", "Tomás González"],
      category: "Proyecto Fin de Carrera",
      description: "Red de sensores y drones autónomos que detectan incendios forestales en etapas iniciales, alertando a autoridades y mapeando la propagación para optimizar la respuesta.",
      award: "Premio a la Excelencia Técnica",
      image: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Aplicación de Rehabilitación Física con Realidad Aumentada",
      team: "RehabTech",
      members: ["Uriel Domínguez", "Valeria Ríos", "Ximena Torres"],
      category: "Prototipo Digital",
      description: "Aplicación que utiliza realidad aumentada para guiar a pacientes en ejercicios de rehabilitación física, proporcionando retroalimentación en tiempo real y seguimiento de progreso.",
      award: "Premio al Impacto Social",
      image: "https://images.unsplash.com/photo-1576086135878-9a5080a72c4e?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container-section">
        <h1 className="section-heading">Ganadores</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700">
            Conoce los proyectos ganadores de la última edición de Expo Ingenierías.
            Estos proyectos han destacado por su excelencia, innovación e impacto en sus respectivas categorías.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <Trophy size={32} className="text-yellow-500" />
          <h2 className="text-2xl font-bold text-expo-blue">Ganadores Edición 2023</h2>
        </div>
        
        <Tabs defaultValue="Todas" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="flex flex-wrap justify-center">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {winnerProjects
                  .filter(project => category === "Todas" || project.category === category)
                  .map((project) => (
                    <Card key={project.id} className="overflow-hidden h-full">
                      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                        <div className="md:col-span-2 h-48 md:h-full relative">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 right-0 m-2">
                            <Badge className="bg-yellow-500 hover:bg-yellow-600">
                              {project.award}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="md:col-span-3 p-6 flex flex-col h-full">
                          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                          <Badge className="w-fit mb-3 bg-expo-blue/10 text-expo-blue hover:bg-expo-blue/20 border-none">
                            {project.category}
                          </Badge>
                          
                          <p className="text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>
                          
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Users size={16} className="text-expo-orange" />
                              <h4 className="font-semibold text-sm">Equipo {project.team}</h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {project.members.map((member, idx) => (
                                <Badge key={idx} variant="outline" className="bg-gray-100">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Ganadores;
