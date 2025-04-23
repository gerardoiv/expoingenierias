
import React from 'react';
import { Calendar, FileText, Monitor, Presentation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const DateItem = ({ date, title, description, icon, index }: DateItemProps) => {
  return (
    <div 
      className={cn(
        "group relative p-6 rounded-xl border border-gray-200 hover:border-expo-lightblue transition-all duration-300",
        "hover:shadow-lg hover:shadow-expo-lightblue/20 bg-white",
        "animate-fade-in [animation-delay:var(--delay)]"
      )}
      style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}
    >
      <div className="flex flex-col items-center text-center space-y-4 relative z-10">
        <div className="p-3 rounded-full bg-expo-lightblue/10 group-hover:bg-expo-lightblue/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-expo-blue to-expo-lightblue bg-clip-text text-transparent">
          {date}
        </h3>
        <p className="text-expo-blue font-semibold text-lg">{title}</p>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-expo-lightblue/5 to-expo-lightblue/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
    </div>
  );
};

const ImportantDates = () => {
  const dates = [
    {
      date: '05/05/2025',
      title: 'Apertura del sistema de registro',
      description: '',
      icon: <FileText className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '23/05/2025',
      title: 'Cierre de registro',
      description: 'Hasta las 23:59 pm',
      icon: <FileText className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '30/05/2025',
      title: 'Límite para entrega de póster',
      description: 'Hasta las 23:59 pm',
      icon: <Monitor className="w-10 h-10 text-expo-lightblue" />
    },
    {
      date: '10/06/2025',
      title: '5ta Expo Ingenierías Campus Santa Fe',
      description: 'Salón de Congresos, 16:00-19:30',
      icon: <Presentation className="w-10 h-10 text-expo-lightblue" />
    }
  ];

  return (
    <section className="container-section bg-gradient-to-b from-white via-white to-expo-lightblue/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12 animate-fade-in">
          <div className="p-4 rounded-full bg-expo-lightblue/10 mr-4">
            <Calendar className="text-expo-lightblue w-12 h-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-expo-blue to-expo-lightblue bg-clip-text text-transparent">
            Fechas Importantes
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dates.map((item, index) => (
            <DateItem 
              key={index}
              index={index}
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
