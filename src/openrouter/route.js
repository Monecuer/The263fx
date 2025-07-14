import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'The263fx',
        'HTTP-Referer': 'http://localhost:3000', // Change in production
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      throw new Error(data?.error || 'OpenRouter failed');
    }

    const reply = data?.choices?.[0]?.message?.content || 'Sorry, I have no answer.';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('❌ Internal API error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
