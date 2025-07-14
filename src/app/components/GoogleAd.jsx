'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <>
      {/* 🟢 Must be a real approved ad slot from AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4437850977433689"
        data-ad-slot="2480789669"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </> 
  );
}
