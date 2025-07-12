'use client';

import { useState, useEffect, useRef } from 'react';

export default function AIMLChat() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are The263Fx t, expert in forex trading.' },
    { role: 'assistant', content: 'Hello! Ask  forex trading.' },
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
      const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 84c456a0c5ed4ef3af82c67256d411ca', // Your API key here
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [...messages, userMessage],
          temperature: 0.7,
          max_tokens: 256,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'No response from AI.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('AI error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'AI failed. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>The263Fx AI Assistant</h2>
      <div
        style={{
          height: 300,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages
          .filter((m) => m.role !== 'system')
          .map((m, i) => (
            <div
              key={i}
              style={{
                margin: '8px 0',
                textAlign: m.role === 'user' ? 'right' : 'left',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: 12,
                  backgroundColor: m.role === 'user' ? '#dbeafe' : '#e5e7eb',
                  color: m.role === 'user' ? '#1e3a8a' : '#374151',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <textarea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about forex or The263Fx..."
        style={{ width: '100%', padding: 8, fontSize: 16 }}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ marginTop: 8, width: '100%' }}>
        {loading ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
}
