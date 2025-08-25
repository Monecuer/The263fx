// app/layout.js or layout.jsx
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
        {/* SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="Forex, Trading, The263Fx, Learn Forex, Zimbabwe" />
        <meta name="author" content="The263Fx Academy" />
        <meta name="robots" content="index, follow" />
        <meta name="google-adsense-account" content="ca-pub-4437850977433689" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </head>

      <body className="bg-black text-white font-sans antialiased">
        {children}
        <GoogleAd />
        <WhatsappSupport />
        <AIPopup />

        {/* ✅ AdSense script - no data attributes here! */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4437850977433689"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

