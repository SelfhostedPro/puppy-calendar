export type ActivityType = 'meal' | 'pee' | 'poop' | 'water' | 'medicine' | 'walk' | 'training';

export interface Activity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  description: string;
  duration?: number; // Duration in minutes
  userId: string;
}

export interface ActivityLog {
  [date: string]: Activity[];
}

export interface User {
  id: string;
  email: string;
}