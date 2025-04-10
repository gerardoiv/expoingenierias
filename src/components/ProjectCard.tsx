import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  author: string;
  campus: string;
  image?: string;
  description: string;
}

const ProjectCard = ({
  id,
  title,
  category,
  author,
  campus,
  image,
  description
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-expo-lightblue/10 text-expo-lightblue">
            {category}
          </Badge>
          <Badge variant="outline" className="bg-expo-orange/10 text-expo-orange">
            {campus}
          </Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>Por {author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/proyectos/${id}`} className="w-full">
          <Button variant="outline" className="w-full flex items-center justify-between">
            <span>Ver detalles</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
