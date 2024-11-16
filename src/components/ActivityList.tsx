import React from 'react';
import { format } from 'date-fns';
import { Activity } from '../types';
import { 
  UtensilsCrossed, 
  Droplets, 
  Biohazard, 
  GlassWater, 
  Pill, 
  Footprints, 
  Brain,
  Clock
} from 'lucide-react';

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'meal':
      return <UtensilsCrossed className="w-5 h-5" />;
    case 'pee':
      return <Droplets className="w-5 h-5" />;
    case 'poop':
      return <Biohazard className="w-5 h-5" />;
    case 'water':
      return <GlassWater className="w-5 h-5" />;
    case 'medicine':
      return <Pill className="w-5 h-5" />;
    case 'walk':
      return <Footprints className="w-5 h-5" />;
    case 'training':
      return <Brain className="w-5 h-5" />;
  }
};

export default function ActivityList({ activities, onDelete }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No activities recorded for this day</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize">{activity.type}</h3>
                  <p className="text-sm text-gray-500">
                    {format(activity.timestamp, 'h:mm a')}
                    {activity.duration && (
                      <span className="flex items-center ml-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration} min
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(activity.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 text-gray-700">{activity.description}</p>
          </div>
        ))
      )}
    </div>
  );
}