
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ConvocatoriaSectionProps {
  title: string;
  children: React.ReactNode;
}

const ConvocatoriaSection = ({ title, children }: ConvocatoriaSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-8 border-2 border-expo-blue/10 hover:shadow-lg transition-all duration-300">
      <CardHeader 
        className="bg-expo-blue/5 cursor-pointer flex flex-row justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-expo-blue text-2xl">{title}</CardTitle>
        {isExpanded ? <ChevronUp className="text-expo-blue" /> : <ChevronDown className="text-expo-blue" />}
      </CardHeader>
      {isExpanded && (
        <CardContent className="prose max-w-none p-6 bg-white">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default ConvocatoriaSection;
