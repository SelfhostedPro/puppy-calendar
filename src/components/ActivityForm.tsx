import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { ActivityType } from '../types';

interface ActivityFormProps {
  onSubmit: (type: ActivityType, description: string, duration: number | null) => void;
}

export default function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [type, setType] = useState<ActivityType>('meal');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(type, description, duration ? parseInt(duration) : null);
    setDescription('');
    setDuration('');
  };

  const showDurationField = ['walk', 'training'].includes(type);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Activity Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="meal">Meal</option>
            <option value="pee">Pee</option>
            <option value="poop">Poop</option>
            <option value="water">Water</option>
            <option value="medicine">Medicine</option>
            <option value="walk">Walk</option>
            <option value="training">Training</option>
          </select>
        </div>

        {showDurationField && (
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Enter activity details..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Activity
        </button>
      </div>
    </form>
  );
}