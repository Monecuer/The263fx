import './globals.css';
import WhatsappSupport from './components/WhatsappSupport';
import AIPopup from './components/AIPopup';

export const metadata = {
  title: 'The263Fx - Real Raw Trading',
  description: 'Stop losing. Start winning. Real raw trading education platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans relative">
        {children}
        <WhatsappSupport />
        <AIPopup/>
      </body>
    </html>
  );
}
