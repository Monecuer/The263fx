'use client';

import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && process.browser) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div className="flex justify-center my-6" style={{ minWidth: 320, minHeight: 50 }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '320px', minHeight: '50px' }}
        data-ad-client="ca-pub-4437850977433689"
        data-ad-slot="2480789669" // Your actual ad slot
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;
