import { useEffect, useState } from 'react';

export default function ForexQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = '5804a837b4-2d8c18776f-sz17m4';

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.primeapi.io/fx/quote?pairs=EUR/USD', {
          headers: {
            'X-API-Key': API_KEY,
          },
        });
        const data = await res.json();
        setQuote(data['EUR/USD']);
      } catch (err) {
        console.error('Error fetching quote:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow text-black max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">EUR/USD Quote</h2>
      {loading ? (
        <p>Loading...</p>
      ) : quote ? (
        <div>
          <p><strong>Bid:</strong> {quote.bid}</p>
          <p><strong>Ask:</strong> {quote.ask}</p>
          <p><strong>Price:</strong> {quote.price}</p>
          <p className="text-sm text-gray-500 mt-2">Updated at: {new Date(quote.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Unable to fetch quote.</p>
      )}
    </div>
  );
}
