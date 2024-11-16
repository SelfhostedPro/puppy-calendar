import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Dog } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import CalendarView from './components/Calendar';
import Auth from './components/Auth';
import { Activity, ActivityType, ActivityLog } from './types';
import { auth, db } from './firebase';

function App() {
  const [activityLog, setActivityLog] = useState<ActivityLog>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(auth.currentUser);
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        loadActivities(user.uid);
      } else {
        setActivityLog({});
      }
    });

    return () => unsubscribe();
  }, []);

  const loadActivities = async (userId: string) => {
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const activities: ActivityLog = {};
    querySnapshot.forEach((doc) => {
      const activity = {
        ...doc.data(),
        id: doc.id,
        timestamp: new Date(doc.data().timestamp.seconds * 1000)
      } as Activity;
      
      const dateStr = format(activity.timestamp, 'yyyy-MM-dd');
      if (!activities[dateStr]) {
        activities[dateStr] = [];
      }
      activities[dateStr].push(activity);
    });

    setActivityLog(activities);
  };

  const handleAddActivity = async (type: ActivityType, description: string, duration?: number) => {
    if (!user) return;

    const newActivity: Omit<Activity, 'id'> = {
      type,
      timestamp: new Date(),
      description,
      duration,
      userId: user.uid
    };

    const docRef = await addDoc(collection(db, 'activities'), newActivity);
    const activity = { ...newActivity, id: docRef.id } as Activity;

    setActivityLog((prev) => ({
      ...prev,
      [selectedDateStr]: [...(prev[selectedDateStr] || []), activity],
    }));
  };

  const handleDeleteActivity = async (id: string) => {
    if (!user) return;

    await deleteDoc(doc(db, 'activities', id));
    setActivityLog((prev) => ({
      ...prev,
      [selectedDateStr]: prev[selectedDateStr].filter((activity) => activity.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Dog className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Puppy Daily Tracker</h1>
                <p className="text-blue-100">Keep track of your puppy's daily activities</p>
              </div>
            </div>
            <Auth />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Add New Activity</h2>
                  <ActivityForm onSubmit={handleAddActivity} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Activities</h2>
                    <span className="text-gray-600">
                      {format(selectedDate, 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <ActivityList
                    activities={activityLog[selectedDateStr] || []}
                    onDelete={handleDeleteActivity}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Calendar Overview</h2>
              <CalendarView
                activities={activityLog}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Welcome to Puppy Daily Tracker
            </h2>
            <p className="text-gray-600 mb-8">
              Please sign in or create an account to start tracking your puppy's activities.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Keep your puppy healthy and happy by tracking their daily activities!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;