import './globals.css';
import WhatsAppButton from '../components/WhatsappSupport';
import AIChatbotButton from '../components/AIPopup';

export const metadata = {
  title: 'The263fx - Trading Academy',
  description: 'Learn to trade forex with real strategies and tools.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
