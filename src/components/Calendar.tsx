import React from 'react';
import ReactCalendar from 'react-calendar';
import { format } from 'date-fns';
import { Activity } from '../types';
import 'react-calendar/dist/Calendar.css';

interface CalendarViewProps {
  activities: { [date: string]: Activity[] };
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function CalendarView({ activities, onDateSelect, selectedDate }: CalendarViewProps) {
  const tileContent = ({ date }: { date: Date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayActivities = activities[dateStr] || [];
    
    if (dayActivities.length === 0) return null;

    return (
      <div className="text-xs mt-1">
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
  };

  return (
    <div className="calendar-wrapper">
      <ReactCalendar
        onChange={onDateSelect}
        value={selectedDate}
        tileContent={tileContent}
        className="rounded-lg shadow-md border-0"
      />
    </div>
  );
}

function getActivityColor(type: Activity['type']): string {
  switch (type) {
    case 'meal': return '#EF4444';
    case 'pee': return '#F59E0B';
    case 'poop': return '#78350F';
    case 'water': return '#3B82F6';
    case 'medicine': return '#EC4899';
    case 'walk': return '#10B981';
    case 'training': return '#8B5CF6';
    default: return '#6B7280';
  }
}