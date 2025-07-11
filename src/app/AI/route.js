export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o', // or "gpt-4.1" if preferred
      input: message,
      tools: [{ type: 'web_search_preview' }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  const reply = data?.output?.text || "Bo AI couldn't find a response.";

  return new Response(JSON.stringify({ reply }));
}
