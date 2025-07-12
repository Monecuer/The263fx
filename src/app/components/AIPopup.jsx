async function sendMessage() {
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input.trim() };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setLoading(true);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 84c456a0c5ed4ef3af82c67256d411ca', // Your OpenRouter API key
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [...messages, userMessage],
        max_tokens: 300,
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

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
