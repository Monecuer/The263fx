'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutTeaser() {
  return (
    <section className="relative bg-white text-black py-16 px-6 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10">
        <Image
          src="/images/watermark.png"
          alt=""
          fill
          className="object-contain"
          priority
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-[auto,1fr] gap-10 items-center">
        {/* Profile */}
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden ring-2 ring-black/5 shadow-xl bg-gray-200">
          <Image
            src="/videos/ronald.jpg"
            alt="Ronald — The263Fx"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Who Am I? The263Fx</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-black/80">
            I’m Ronald from The263Fx. Since 2020 I’ve been through the ups and downs of the markets.
            I share insights, breakdowns, and the mindset it takes to win — again nevertheless.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 font-semibold hover:bg-black/90"
            >
              Read Full Story
            </Link>
            <a
              href="https://www.myfxbook.com/members/The263Fx"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-black/20 px-5 py-3 font-semibold hover:bg-black/5"
            >
              View Myfxbook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
