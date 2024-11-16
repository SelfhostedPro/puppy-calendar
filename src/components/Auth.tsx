import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LogIn, LogOut, UserPlus } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  if (auth.currentUser) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-200">{auth.currentUser.email}</span>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleAuth} className="flex flex-col gap-2 items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="px-2 py-2 w-full rounded text-gray-900 text-sm"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="px-2 py-2 w-full rounded text-gray-900 text-sm"
        required
      />
      {isSignUp && (
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="confirm"
          className="px-2 py-2 w-full rounded text-gray-900 text-sm"
          required
        />
      )}
      <button
        type="submit"
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-blue-700 hover:bg-blue-800"
      >
        {isSignUp ? (
          <UserPlus className="w-4 h-4 mr-1" />
        ) : (
          <LogIn className="w-4 h-4 mr-1" />
        )}
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-200 text-sm hover:text-white"
      >
        {isSignUp ? 'Have an account? Login' : 'Need an account? Sign Up'}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
