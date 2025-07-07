'use client';

import { useEffect, useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// Map currencies to flag emojis
const flags = {
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  CHF: '🇨🇭',
  USD: '🇺🇸',
};

// Helper to format timestamps for X axis
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Blog() {
  const [rates, setRates] = useState({});
  const [history, setHistory] = useState([]); // array of { time, EUR, GBP, CHF }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store interval id so we can clean up on unmount
  const intervalRef = useRef(null);

  // Fetch function
  const fetchRates = async () => {
    try {
      const res = await fetch(
        'https://api.beta.fastforex.io/fetch-multi?from=USD&to=EUR,GBP,CHF&api_key=7c13bca86e-92d4db372a-sz18ak'
      );

      if (!res.ok) throw new Error('API error ' + res.status);

      const data = await res.json();
      setRates(data.results);

      // Add new data point to history
      setHistory((prev) => [
        ...prev,
        {
          time: new Date(),
          EUR: data.results.EUR,
          GBP: data.results.GBP,
          CHF: data.results.CHF,
        },
      ]);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('⚠️ Failed to load exchange rates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    intervalRef.current = setInterval(fetchRates, 60000); // refresh every 60s

    return () => clearInterval(intervalRef.current);
  }, []);

  // Format history for chart with time labels
  const chartData = history.map(({ time, EUR, GBP, CHF }) => ({
    time: formatTime(time),
    EUR,
    GBP,
    CHF,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white text-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Forex News & Rates</h1>

      {loading ? (
        <p>⏳ Loading rates...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          {/* Rates display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {Object.entries(rates).map(([symbol, value]) => (
              <div
                key={symbol}
                className="bg-gray-100 p-4 rounded-lg shadow text-center hover:scale-105 transition"
              >
                <div className="text-4xl">{flags[symbol]}</div>
                <h2 className="text-xl font-bold text-blue-600">{symbol}</h2>
                <p className="text-2xl mt-2 font-semibold">{value}</p>
                <p className="text-xs text-gray-500">USD → {symbol}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <h2 className="text-xl font-semibold mb-4">Rate History (last {history.length} mins)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="EUR" stroke="#3b82f6" dot={false} />
              <Line type="monotone" dataKey="GBP" stroke="#2563eb" dot={false} />
              <Line type="monotone" dataKey="CHF" stroke="#1e40af" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      {/* Placeholder for News section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Latest Forex News</h2>
        <ForexNews />
      </div>
    </div>
  );
}

// Simple news component with static news (replace with real API)
function ForexNews() {
  const sampleNews = [
    {
      id: 1,
      title: 'Forex Market Volatility Expected This Week',
      url: '#',
      date: '2025-07-07',
      source: 'ForexNews',
    },
    {
      id: 2,
      title: 'USD Strengthens Against Euro Amid Economic Recovery',
      url: '#',
      date: '2025-07-06',
      source: 'Financial Times',
    },
    {
      id: 3,
      title: 'How Central Banks Influence Currency Rates',
      url: '#',
      date: '2025-07-05',
      source: 'Investopedia',
    },
  ];

  return (
    <ul className="space-y-4">
      {sampleNews.map((news) => (
        <li key={news.id} className="border-b pb-2">
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            {news.title}
          </a>
          <p className="text-xs text-gray-500">
            {news.date} | {news.source}
          </p>
        </li>
      ))}
    </ul>
  );
}
