import ReactCalendar, { TileContentFunc } from 'react-calendar';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ReadActivity } from '../types';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { getActivityColor } from './activityUtils';

interface CalendarViewProps {
  activities: { [date: string]: ReadActivity[] };
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function CalendarView({ activities, onDateSelect, selectedDate }: CalendarViewProps) {
  const tileContent = useMemo<TileContentFunc>(
    () => ({ date }) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayActivities = activities[dateStr] || [];

      if (dayActivities.length === 0) return null;

      return (
        <div className="text-xs mt-1 hover:bg-slate-100 rounded-lg p-2 flex flex-col">
          <div className="flex gap-1 flex-wrap justify-center">
            {Array.from(new Set(dayActivities.map(a => a.type))).map(type => (
              <span
                key={type}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: getActivityColor(type)
                }}
              />
            ))}
          </div>
        </div>
      );
    },
    [activities]
  );

  return (
    <div className='flex flex-col w-full h-full'>
      <div className="calendar-wrapper h-full">
        <ReactCalendar
          onChange={(e) => onDateSelect(e as Date)}
          value={selectedDate}
          tileContent={tileContent}
          className="rounded-lg shadow-md border-0"
        />
      </div>
    </div>
  );
}
