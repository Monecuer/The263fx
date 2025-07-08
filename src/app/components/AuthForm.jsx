'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { FaUser, FaLock } from 'react-icons/fa';

export function AuthForm({ type = 'login' }) {
  const router = useRouter();
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isLogin && password !== confirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push(isLogin ? '/dashboard' : '/login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black text-white px-4">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        {/* Bubble glow effects */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-ping"></div>

        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && <p className="mb-4 text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center bg-white/20 p-3 rounded-xl">
            <FaUser className="mr-3 text-white" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-transparent border-none outline-none text-white w-full placeholder-white/60"
            />
          </div>

          <div className="mb-4 flex items-center bg-white/20 p-3 rounded-xl">
            <FaLock className="mr-3 text-white" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-transparent border-none outline-none text-white w-full placeholder-white/60"
            />
          </div>

          {!isLogin && (
            <div className="mb-6 flex items-center bg-white/20 p-3 rounded-xl">
              <FaLock className="mr-3 text-white" />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm Password"
                required
                className="bg-transparent border-none outline-none text-white w-full placeholder-white/60"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl text-white font-semibold transition"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-300">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
