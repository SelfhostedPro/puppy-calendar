import { format } from 'date-fns';
import { ReadActivity } from '../types';
import {
  Clock,
} from 'lucide-react';
import { getActivityIcon } from './activityUtils';

interface ActivityListProps {
  activities: ReadActivity[];
  onDelete: (id: string) => void;
}

export default function ActivityList({ activities, onDelete }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No activities recorded for this day</p>
      ) : (
        activities.map(({ id, type, timestamp, duration, description }) => (
          <div
            key={id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  {getActivityIcon(type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize">{type}</h3>
                  <p className="text-sm text-gray-500">
                    {format(timestamp, 'h:mm a')}
                    {duration && (
                      <span className="flex items-center ml-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {duration} min
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 text-gray-700">{description}</p>
          </div>
        ))
      )}
    </div>
  );
}
