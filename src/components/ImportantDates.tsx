
import React from 'react';
import { Calendar, FileText, Monitor, Presentation } from 'lucide-react';

interface DateItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DateItem = ({ date, title, description, icon }: DateItemProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-expo-lightblue mb-2">{date}</h3>
      <p className="text-expo-blue font-medium">{title}</p>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <div className="w-full h-1 bg-expo-blue mt-4"></div>
    </div>
  );
};

const ImportantDates = () => {
  const dates = [
    {
      date: '31/10/2024',
      title: 'Apertura de sistema de registro.',
      description: '',
      icon: <FileText className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '21/11/2024',
      title: 'Cierre de registro CCM.',
      description: '28/11/2024 Cierre de registro CSF y TOL.',
      icon: <FileText className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '22/11/2024',
      title: 'Límite para entrega de póster',
      description: 'digital y video en CCM.',
      icon: <Monitor className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '29/11/2024',
      title: 'Límite para entrega de póster',
      description: 'digital y video en CSF y TOL.',
      icon: <Monitor className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '27/11/2024',
      title: '4ta Expo ingenierías región CDMX',
      description: 'Campus Ciudad de México',
      icon: <Presentation className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '29/11/2024',
      title: '4ta Expo ingenierías región CDMX',
      description: 'Campus Estado de México',
      icon: <Presentation className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '02/12/2024',
      title: '4ta Expo ingenierías región CDMX',
      description: 'Campus Santa Fe',
      icon: <Presentation className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '05/12/2024',
      title: '4ta Expo ingenierías región CDMX',
      description: 'Campus Toluca',
      icon: <Presentation className="w-10 h-10 text-expo-lightblue" />
    }
  ];

  return (
    <section className="container-section bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Calendar className="text-expo-lightblue w-12 h-12 mr-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-expo-blue">Fechas Importantes</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dates.slice(0, 4).map((item, index) => (
            <DateItem 
              key={index}
              date={item.date}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {dates.slice(4).map((item, index) => (
            <DateItem 
              key={index + 4}
              date={item.date}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
