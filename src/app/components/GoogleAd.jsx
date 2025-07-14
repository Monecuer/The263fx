'use client';

import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div className="flex justify-center my-10">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: 320, minHeight: 50 }}
        data-ad-client="ca-pub-4437850977433689" // ✅ Must match your AdSense ID
        data-ad-slot="2480789669" // ✅ Replace with your actual slot if needed
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;
