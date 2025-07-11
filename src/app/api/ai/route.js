export async function POST(req) {
  const { messages } = await req.json();

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 300,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
