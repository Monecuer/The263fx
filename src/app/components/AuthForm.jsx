'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import { FaUser, FaLock } from 'react-icons/fa';

export function AuthForm({ type = 'login' }) {
  const router = useRouter();
  const isLogin = type === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!isLogin && password !== confirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
        } else {
          const isAdmin = email.toLowerCase() === 'the263fx@gmail.com';
          router.push(isAdmin ? '/admin-dashboard' : '/dashboard');
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          setMessage('Sign up successful. Please check your email to verify your account.');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black px-4 text-white">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Decorative bubbles */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-ping" />

        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && <p className="mb-4 text-red-400 text-sm text-center">{error}</p>}
        {message && <p className="mb-4 text-green-400 text-sm text-center">{message}</p>}

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
              Don’t have an account?{' '}
              <Link href="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
