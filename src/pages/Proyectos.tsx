
import React, { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';

const Proyectos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample project data
  const projects = [
    {
      id: '1',
      title: 'Sistema de Monitoreo Ambiental IoT',
      category: 'Prototipo Físico',
      author: 'Equipo EcoTech',
      campus: 'CCM',
      description: 'Sistema de sensores IoT para monitorear condiciones ambientales en tiempo real, proporcionando datos sobre calidad del aire, humedad y temperatura.',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Aplicación para Gestión de Residuos Urbanos',
      category: 'Prototipo Digital',
      author: 'Equipo GreenCity',
      campus: 'CEM',
      description: 'Plataforma móvil que optimiza la recolección de residuos en zonas urbanas, rastreando rutas de camiones y alertando a usuarios sobre horarios de recolección.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Optimización de Cadena de Suministro para PyMEs',
      category: 'Propuesta de Mejora',
      author: 'Equipo SupplyChain',
      campus: 'CSF',
      description: 'Metodología para mejorar la eficiencia de cadenas de suministro en pequeñas y medianas empresas, reduciendo costos y tiempos de entrega.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Robot Asistencial para Adultos Mayores',
      category: 'Prototipo Físico',
      author: 'Equipo CareBot',
      campus: 'TOL',
      description: 'Robot diseñado para asistir a adultos mayores en tareas cotidianas, monitorear signos vitales y proporcionar compañía interactiva.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '5',
      title: 'Plataforma de Aprendizaje Adaptativo',
      category: 'Prototipo Digital',
      author: 'Equipo EduTech',
      campus: 'CCM',
      description: 'Sistema de aprendizaje en línea que adapta contenidos según el progreso y estilo de aprendizaje de cada estudiante, utilizando inteligencia artificial.',
      image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '6',
      title: 'Modelo de Eficiencia Energética para Edificios',
      category: 'Estancia de Investigación',
      author: 'Equipo EnergyPlus',
      campus: 'CEM',
      description: 'Investigación sobre optimización del consumo energético en edificios comerciales, con propuestas implementables de mejora y ahorro.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop'
    }
  ];

  // Filter projects based on search term and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const campuses = ['Todos', 'CCM', 'CEM', 'CSF', 'TOL'];

  return (
    <div className="pt-20 pb-16">
      <div className="container-section">
        <h1 className="section-heading">Proyectos</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700">
            Explora los proyectos presentados en Expo Ingenierías.
            Descubre soluciones innovadoras desarrolladas por estudiantes de ingeniería.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar proyectos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="Prototipo Físico">Prototipo Físico</SelectItem>
                  <SelectItem value="Prototipo Digital">Prototipo Digital</SelectItem>
                  <SelectItem value="Propuesta de Mejora">Propuesta de Mejora</SelectItem>
                  <SelectItem value="Estancia de Investigación">Estancia de Investigación</SelectItem>
                  <SelectItem value="Proyecto Fin de Carrera">Proyecto Fin de Carrera</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center justify-end">
              Mostrando {filteredProjects.length} proyecto(s)
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="Todos">
          <TabsList className="mb-6">
            {campuses.map(campus => (
              <TabsTrigger key={campus} value={campus}>
                {campus}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {campuses.map(campus => (
            <TabsContent key={campus} value={campus}>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No se encontraron proyectos que coincidan con tu búsqueda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter(project => campus === 'Todos' || project.campus === campus)
                    .map(project => (
                      <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        category={project.category}
                        author={project.author}
                        campus={project.campus}
                        image={project.image}
                        description={project.description}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Proyectos;
