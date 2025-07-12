'use client';

import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const AIML_API_KEY = '0576c22b2f834b638f0c2b3aaa65caa8'; // Your real API key
const AIML_API_URL = 'https://api.aimlapi.com/v1/chat/completions';

export default function AIPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        'You are The263Fx AI assistant, expert in forex trading education based on The263Fx and trusted brokers.',
    },
    {
      role: 'assistant',
      content: 'Hello! Ask me anything about forex trading.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Prepare the full messages array with system + previous + user
      const payloadMessages = [...messages, userMessage].filter(m => m.content.trim() !== '');

      const res = await fetch(AIML_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AIML_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: payloadMessages,
          temperature: 0.7,
          max_tokens: 512,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      const reply = data.choices?.[0]?.message?.content || 'No response.';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('AI error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'AI failed. Please try again later.' },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <button
        aria-label={open ? 'Close AI Chat' : 'Open AI Chat'}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-pulse"
        style={{ width: 56, height: 56 }}
      >
        {open ? <FaTimes size={28} /> : <FaRobot size={28} />}
      </button>

      {open && (
        <div className="fixed bottom-20 left-6 w-80 max-w-full h-96 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">The263Fx AI Assistant</h3>
            <button onClick={() => setOpen(false)} className="hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3 bg-gray-50">
            {messages
              .filter((m) => m.role !== 'system')
              .map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[80%] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-blue-100 text-blue-900 ml-auto text-right'
                      : 'bg-gray-200 text-gray-800 mr-auto text-left'
                  }`}
                >
                  {m.content}
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2 bg-white">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about forex or The263Fx..."
              className="flex-1 border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 rounded"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
