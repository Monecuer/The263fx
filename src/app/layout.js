import './globals.css';
import Script from 'next/script';


export const metadata = {
  title: 'The263fx - Trading Academy',
  description: 'Learn to trade forex with real strategies and tools.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4437850977433689"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-black text-white font-sans">
        {children}
       
      </body>
    </html>
  );
}
