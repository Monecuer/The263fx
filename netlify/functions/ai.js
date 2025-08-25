// netlify/functions/ai.js

export async function handler(event) {
  const { messages } = JSON.parse(event.body || '{}');

  if (!messages || !Array.isArray(messages)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid messages array.' }),
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('AI function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'AI request failed.' }),
    };
  }
}
