// app/layout.js
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
        {/* SEO & AdSense Meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="google-adsense-account" content="ca-pub-4437850977433689" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-black text-white font-sans relative">
        {children}
        {/* Global Components */}
        <GoogleAd />
        <WhatsappSupport />
        <AIPopup />
        {/* Load AdSense once */}
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
