'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CRYPTO_API = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`;

export default function Blog() {
  const [newsData, setNewsData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(1);
  }, []);

  const fetchNews = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CRYPTO_API);
      if (!res.ok) throw new Error('Failed to fetch crypto news');
      const data = await res.json();
      const articles = data.Data || [];

      setNewsData((prev) =>
        pageNum === 1 ? articles : [...prev, ...articles]
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  const filteredNews = newsData.filter((item) =>
    (item.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-400">
         Live Crypto News
      </h1>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search crypto news..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* News Cards */}
      {loading && page === 1 ? (
        <p className="text-center text-gray-400">Loading crypto news...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredNews.map((item, index) => (
              <motion.a
                key={item.url || item.link || index}
                href={item.url || item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-blue-500/30 transition-transform hover:scale-[1.02] flex flex-col"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
              >
                {item.imageurl ? (
                  <img
                    src={item.imageurl}
                    alt="News"
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-40 bg-gray-700 flex items-center justify-center text-gray-500 text-sm italic">
                    No image
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h2>
                  <p className="text-gray-400 text-sm line-clamp-3 flex-grow">
                    {item.body || 'No description available'}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    {item.source || 'Unknown source'}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More */}
      {filteredNews.length > 0 && !loading && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
