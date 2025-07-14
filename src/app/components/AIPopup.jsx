'use client';
import { useEffect, useState, useRef } from 'react';

const AIPopup = () => {
  const [visible, setVisible] = useState(true);
  const [messages, setMessages] = useState([{ from: 'ai', text: '📈 Hi! Ready to trade smarter today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newMessage.text }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      // Simulate typing effect (optional)
      let i = 0;
      const reply = data.reply || "Sorry, no response.";
      const interval = setInterval(() => {
        i++;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.from === 'ai_typing') {
            return [...prev.slice(0, -1), { from: 'ai_typing', text: reply.slice(0, i) }];
          } else {
            return [...prev, { from: 'ai_typing', text: reply.slice(0, i) }];
          }
        });
        if (i >= reply.length) {
          clearInterval(interval);
          setMessages((prev) => [...prev.slice(0, -1), { from: 'ai', text: reply }]);
        }
      }, 20);
    } catch {
      setMessages((prev) => [...prev, { from: 'ai', text: '⚠️ Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {visible && (
        <div className="ai-popup">
          <div className="popup-header">📊 The263fx Assistant</div>
          <div className="popup-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.from}`}>{msg.text}</div>
            ))}
            {loading && <div className="msg ai loading">Typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="popup-input">
            <input
              type="text"
              placeholder="Ask about trading, e.g., market trends..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>➤</button>
            <button onClick={toggleVoice}>{listening ? '🎙️...' : '🎤'}</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .ai-popup {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 320px;
          background: #121212;
          border-radius: 12px;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          z-index: 9999;
        }
        .popup-header {
          background: #004aad;
          color: #fff;
          padding: 14px;
          font-weight: 600;
          font-size: 16px;
        }
        .popup-body {
          background: #1a1a1a;
          color: #e0e0e0;
          max-height: 300px;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .msg {
          padding: 8px 12px;
          border-radius: 8px;
          max-width: 90%;
          word-wrap: break-word;
        }
        .msg.user {
          align-self: flex-end;
          background: #004aad;
          color: white;
          text-align: right;
        }
        .msg.ai, .msg.ai_typing {
          align-self: flex-start;
          background: #2e2e2e;
        }
        .msg.loading {
          font-style: italic;
          color: #aaa;
        }
        .popup-input {
          display: flex;
          gap: 6px;
          padding: 10px;
          background: #222;
        }
        .popup-input input {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          background: #333;
          color: white;
        }
        .popup-input button {
          background: #004aad;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AIPopup;
