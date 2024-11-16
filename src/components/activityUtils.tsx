import {
  UtensilsCrossed,
  Droplets,
  Biohazard,
  GlassWater,
  Pill,
  Footprints,
  Brain,
} from 'lucide-react';
import { Activity } from '../types';

const activityColorMap: Record<Activity['type'], string> = {
  meal: '#EF4444',
  pee: '#F59E0B',
  poop: '#78350F',
  water: '#3B82F6',
  medicine: '#EC4899',
  walk: '#10B981',
  training: '#8B5CF6',
};

export const getActivityColor = (type: Activity['type']): string => {
  return activityColorMap[type] || '#6B7280';
};

export function getActivityIcon(type: Activity['type']) {
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
    default:
      return null;
  }
}
