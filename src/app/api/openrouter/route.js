// src/app/api/openrouter/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { question } = await req.json();

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'The263fx',
        'HTTP-Referer': 'http://localhost:3000',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [{ role: 'user', content: question }],
        max_tokens: 500, // ✅ Lowered for free tier
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('OpenRouter error:', data);
      return NextResponse.json({ error: data.error.message }, { status: res.status });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error('Route error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
