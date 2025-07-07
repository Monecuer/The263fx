'use client';

import Image from 'next/image';

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col justify-end bg-gray-900 text-gray-400">
      {/* Main content could go here, above footer */}

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-700">
       
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
