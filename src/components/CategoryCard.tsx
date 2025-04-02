
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryCardProps {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
}

const CategoryCard = ({ id, title, description, fullDescription }: CategoryCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-expo-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
            {id}
          </span>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {expanded ? (
          <p className="text-sm text-gray-600">{fullDescription}</p>
        ) : (
          <p className="text-sm text-gray-600 line-clamp-3">{fullDescription}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-center gap-1 text-expo-blue hover:text-expo-orange"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <span>Ver menos</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span>Ver más</span>
              <ChevronDown size={16} />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
