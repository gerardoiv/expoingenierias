
import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-expo-lightblue"></div>
      
      {/* Timeline events */}
      <div className="space-y-8 ml-6">
        {events.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="timeline-dot"></div>
            
            {/* Event content */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-expo-orange">
              <h3 className="font-bold text-lg text-expo-blue">{event.date}</h3>
              <p className="mt-2 text-gray-700">{event.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
