export default async function handler(req, res) {
  const { subject, body, emails } = JSON.parse(req.body);

  for (const email of emails) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'admin@the263fx.com',
        to: email,
        subject,
        html: `<p>${body}</p>`,
      }),
    });
  }

  res.status(200).json({ message: 'Sent' });
}
