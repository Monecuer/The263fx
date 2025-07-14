import './globals.css';
import Script from 'next/script';
import Head from 'next/head';

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
      <Head>
        {/* Metadata */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="google-adsense-account" content="ca-pub-4437850977433689" />
        <title>{metadata.title}</title>

        {/* Favicon (optional) */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-black text-white font-sans relative">
        {children}
        <GoogleAd />
        <WhatsappSupport />
        <AIPopup />

        {/* ✅ Load Google AdSense properly */}
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
