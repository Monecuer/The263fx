'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="pub-4437850977433689" // your own AdSense ID
      data-ad-slot="2480789669" // your real ad slot from AdSense
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
