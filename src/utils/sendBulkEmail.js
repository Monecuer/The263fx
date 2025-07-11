import emailjs from 'emailjs-com';

export async function sendBulkEmail(name, message) {
  const templateParams = {
    to_name: name,
    message,
    reply_to: 'your@email.com',
  };

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return result;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
}
