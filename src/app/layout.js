import './globals.css';
import Script from 'next/script';

import WhatsappSupport from './components/WhatsappSupport';
import AIPopup from './components/AIPopup';
import GoogleAd from './components/GoogleAd';

export const metadata = {
  title: 'The263Fx - Real Raw Trading',
  description: 'Stop losing. Start winning. Real raw trading education platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4437850977433689" />
      </head>
      <body className="bg-black text-white font-sans relative">
        {children}
        <GoogleAd />
        <WhatsappSupport />
        <AIPopup />
        {/* Load AdSense script only once in root layout */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4437850977433689"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
