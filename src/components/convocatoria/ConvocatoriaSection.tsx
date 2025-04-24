
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ConvocatoriaSectionProps {
  title: string;
  children: React.ReactNode;
}

const ConvocatoriaSection = ({ title, children }: ConvocatoriaSectionProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-expo-blue">{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        {children}
      </CardContent>
    </Card>
  );
};

export default ConvocatoriaSection;
