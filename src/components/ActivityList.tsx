import { format } from 'date-fns';
import { ReadActivity } from '../types';
import {
  Clock,
} from 'lucide-react';
import { getActivityIcon } from './activityUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface ActivityListProps {
  activities: ReadActivity[];
  onDelete: (id: string) => void;
}
interface ActivityCardProps {
  activity: ReadActivity;
  onDelete: (id: string) => void;
}

function ActivityCard({ activity, onDelete }: ActivityCardProps) {
  const { id, type, timestamp, duration, description } = activity;
  return (
    <Card key={id} className="flex flex-row hover:shadow-md transition-shadow">
      <div className='flex flex-row gap-2 p-2 items-center justify-between w-full'>
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div className="p-2 bg-blue-100 rounded-full">
            {getActivityIcon(type)}
          </div>

          {/* Title */}
          <div className='flex flex-col'>
            <CardTitle className='flex flex-row capitalize font-semibold text-lg'>
              {type} {duration && (
                <span className="flex items-center ml-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {duration} min
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {format(timestamp, 'h:mm a')}
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center m-2 text-muted-foreground space-x-3">
          {description}
        </div>
        <div>
          <Button
            onClick={() => onDelete(id)}
            variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function ActivityList({ activities, onDelete }: ActivityListProps) {
  return (
    <div className='h-full'>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No activities recorded for this day</p>
      ) : (
        <ScrollArea className="rounded-lg h-full bg-accent p-2">
          <div className='flex flex-col gap-2 w-full h-[60vh] overflow-y-auto'>
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onDelete={onDelete} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div >
  );
}
