
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EventCardProps {
  campus: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ campus, location, date, time }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-expo-blue mb-3">{campus}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-expo-orange" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-expo-orange" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-expo-orange" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
