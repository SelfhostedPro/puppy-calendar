import { Timestamp } from "firebase/firestore";

export type ActivityType = 'meal' | 'pee' | 'poop' | 'water' | 'medicine' | 'walk' | 'training';

interface BaseActivity {
  id: string;
  type: ActivityType;
  description: string;
  duration: number | null; // Duration in minutes
  userId: string;
}

export interface Activity extends BaseActivity {
  timestamp: Timestamp;
}
export interface ReadActivity extends BaseActivity {
  timestamp: Date
}

export interface ActivityLog {
  [date: string]: ReadActivity[];
}

export interface User {
  id: string;
  email: string;
}
