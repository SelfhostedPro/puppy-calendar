import React, { useCallback, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = useCallback(async (e: React.FormEvent) => {
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [isSignUp, email, password]);

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  if (auth.currentUser) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <Button
          onClick={handleSignOut}
          className="items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
        <span className="text-sm text-gray-200">{auth.currentUser.email}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleAuth} className="flex flex-col gap-2 items-center">
      <button
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-200 text-sm hover:text-white"
      >
        {isSignUp ? 'Have an account? Login' : 'Need an account? Sign Up'}
      </button>
      <input
        type="email"
        value={email}
        autoComplete='email'
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
        autoComplete='current-password'
        className="px-2 py-2 w-full rounded text-gray-900 text-sm"
        required
      />
      {isSignUp && (
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete='confirm-password'
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

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
