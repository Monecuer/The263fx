export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  const { courseId, amount, method, receiptUrl, status } = req.body;

  try {
    // Save to Supabase or DB
    // Replace this with your actual DB logic
    console.log('Save payment record:', { courseId, amount, method, receiptUrl, status });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record payment' });
  }
}
