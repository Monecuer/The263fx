'use client';

import Image from 'next/image';
import CountUp from 'react-countup';

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-900 text-gray-400">
      {/* Animated Stats Section */}
      <section className="py-20 px-6 text-center bg-gray-950 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-400">Our Trading Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-5xl font-bold text-green-400">
              <CountUp end={100} duration={3} />+
            </h3>
            <p className="mt-2 text-gray-300">Profitable Traders</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-yellow-400">
              <CountUp end={240} duration={3} prefix="$" separator="," />K
            </h3>
            <p className="mt-2 text-gray-300">Total Profits Shared</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-purple-400">
              <CountUp end={30} duration={3} />+
            </h3>
            <p className="mt-2 text-gray-300">Countries Served</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-700 mt-10">
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="https://x.com/_The263fx_" aria-label="Twitter">
            <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="https://www.facebook.com/profile.php?id=61578267111312" aria-label="Facebook">
            <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="https://www.youtube.com/@The263Fx" aria-label="YouTube">
            <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="https://www.tiktok.com/@the263_fx" aria-label="TikTok">
            <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
