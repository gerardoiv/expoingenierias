
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Medal } from 'lucide-react';

const Medalleros = () => {
  const campuses = ['CCM', 'CEM', 'CSF', 'TOL'];
  const [activeCampus, setActiveCampus] = useState('CCM');

  const medalleroData = {
    CCM: [
      { position: 1, project: "Smart City Traffic Control", category: "Prototipo Digital", team: "CodeCrafters", points: 98 },
      { position: 2, project: "EcoFilter", category: "Prototipo Físico", team: "EcoInnovators", points: 95 },
      { position: 3, project: "Healthcare Analytics Platform", category: "Prototipo Digital", team: "DataDoctors", points: 93 },
      { position: 4, project: "Sustainable Energy Grid", category: "Propuesta de Mejora", team: "GreenPower", points: 91 },
      { position: 5, project: "Automated Recycling System", category: "Prototipo Físico", team: "RecycleRevolution", points: 90 }
    ],
    CEM: [
      { position: 1, project: "Drone Delivery Network", category: "Prototipo Físico", team: "SkyLogistics", points: 97 },
      { position: 2, project: "AR Learning Platform", category: "Prototipo Digital", team: "EduTech", points: 94 },
      { position: 3, project: "Smart Agriculture System", category: "Prototipo Físico", team: "AgriTech", points: 92 },
      { position: 4, project: "Urban Planning Tool", category: "Propuesta de Mejora", team: "CityPlanners", points: 89 },
      { position: 5, project: "Water Purification System", category: "Prototipo Físico", team: "AquaPure", points: 87 }
    ],
    CSF: [
      { position: 1, project: "AI Medical Diagnosis", category: "Prototipo Digital", team: "HealthAI", points: 99 },
      { position: 2, project: "Renewable Energy Storage", category: "Prototipo Físico", team: "EnerStore", points: 96 },
      { position: 3, project: "Supply Chain Optimization", category: "Propuesta de Mejora", team: "LogisticsMasters", points: 94 },
      { position: 4, project: "Smart Home Ecosystem", category: "Prototipo Digital", team: "HomeTech", points: 92 },
      { position: 5, project: "Biodegradable Packaging", category: "Prototipo Físico", team: "EcoPackage", points: 90 }
    ],
    TOL: [
      { position: 1, project: "Autonomous Agricultural Robot", category: "Prototipo Físico", team: "FarmBot", points: 98 },
      { position: 2, project: "Disaster Response System", category: "Prototipo Digital", team: "RescueTech", points: 95 },
      { position: 3, project: "Sustainable Construction Materials", category: "Propuesta de Mejora", team: "EcoBuild", points: 92 },
      { position: 4, project: "Public Transport Optimization", category: "Prototipo Digital", team: "TransitFlow", points: 90 },
      { position: 5, project: "Waste Management Solution", category: "Prototipo Físico", team: "WasteWise", points: 88 }
    ]
  };

  // Helper function to get medal icon and color
  const getMedalDisplay = (position: number) => {
    switch (position) {
      case 1:
        return { icon: <Award size={24} className="text-yellow-500" />, color: "bg-yellow-100 border-yellow-500" };
      case 2:
        return { icon: <Award size={24} className="text-gray-400" />, color: "bg-gray-100 border-gray-400" };
      case 3:
        return { icon: <Award size={24} className="text-amber-700" />, color: "bg-amber-100 border-amber-700" };
      default:
        return { icon: <Medal size={24} className="text-blue-500" />, color: "bg-blue-50 border-blue-300" };
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container-section">
        <h1 className="section-heading">Medalleros</h1>
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700">
            Conoce los proyectos destacados de la última edición de Expo Ingenierías por campus.
            Estos proyectos han sobresalido por su innovación, impacto y excelencia técnica.
          </p>
        </div>
        
        <Tabs defaultValue="CCM" className="w-full" onValueChange={(value) => setActiveCampus(value)}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              {campuses.map(campus => (
                <TabsTrigger key={campus} value={campus}>Campus {campus}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {campuses.map(campus => (
            <TabsContent key={campus} value={campus} className="space-y-4">
              <Card>
                <CardHeader className="bg-expo-blue text-white">
                  <CardTitle className="text-center">Medallero Campus {campus} - Edición 2023</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-expo-lightgray">
                          <th className="py-4 px-6 text-left">Posición</th>
                          <th className="py-4 px-6 text-left">Proyecto</th>
                          <th className="py-4 px-6 text-left">Categoría</th>
                          <th className="py-4 px-6 text-left">Equipo</th>
                          <th className="py-4 px-6 text-left">Puntuación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medalleroData[campus as keyof typeof medalleroData].map((entry, index) => {
                          const medalStyle = getMedalDisplay(entry.position);
                          return (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${medalStyle.color}`}>
                                    {medalStyle.icon}
                                  </div>
                                  <span className="font-semibold">{entry.position}°</span>
                                </div>
                              </td>
                              <td className="py-4 px-6 font-medium">{entry.project}</td>
                              <td className="py-4 px-6">{entry.category}</td>
                              <td className="py-4 px-6">{entry.team}</td>
                              <td className="py-4 px-6 font-semibold">{entry.points}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                Los resultados corresponden a la edición anterior de Expo Ingenierías.
                La edición actual se encuentra en proceso de evaluación.
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Medalleros;
