import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await sgMail.send({
      to,
      from: 'your_verified_email@yourdomain.com', // must be verified in SendGrid
      subject,
      text
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response?.body || error.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
