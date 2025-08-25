'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import {
  FaUser,
  FaLock,
  FaArrowLeft,
  FaMailBulk,
} from 'react-icons/fa';

export function AuthForm({ type = 'login' }) {
  const router = useRouter();
  const isLogin = type === 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourapp.com/reset-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link.');
    }

    setLoading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage('');
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
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          const userId = data?.user?.id;

          if (userId) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([{
                id: userId,
                name: email,
                email,
                goal: '',
                created_at: new Date(),
              }]);

            if (profileError) {
              setError('Signup succeeded but profile creation failed.');
            } else {
              router.push('/profile-setup');
            }
          } else {
            setError('Signup successful but user ID not found.');
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const LoadingBars = () => (
    <div className="flex gap-1 justify-center items-center py-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2 rounded-sm bg-gradient-to-b from-green-400 to-blue-400 animate-bounce"
          style={{
            height: `${10 + Math.random() * 30}px`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black px-4 text-white">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Floating Effects */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-ping" />

        <h2 className="text-3xl font-bold mb-6 text-center">
          {resetMode
            ? 'Reset Password'
            : isLogin
            ? 'Login'
            : 'Sign Up'}
        </h2>

        {error && (
          <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
        )}
        {message && (
          <p className="mb-4 text-green-400 text-sm text-center">{message}</p>
        )}

        <form onSubmit={resetMode ? handleForgotPassword : handleSubmit}>
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

          {!resetMode && (
            <>
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
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl text-white font-semibold transition"
          >
            {loading ? (
              <LoadingBars />
            ) : resetMode ? (
              'Send Reset Link'
            ) : isLogin ? (
              'Login'
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-300 space-y-2">
          {isLogin && !resetMode && (
            <button
              onClick={() => setResetMode(true)}
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          )}

          {resetMode && (
            <button
              onClick={() => setResetMode(false)}
              className="text-blue-400 flex items-center gap-1 justify-center hover:underline"
            >
              <FaArrowLeft /> Back to Login
            </button>
          )}

          {!resetMode && (
            <p>
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
          )}
        </div>
      </div>
    </div>
  );
}
