"use client";

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-950 text-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-44 -left-32 w-[48rem] h-[48rem] rounded-full bg-gradient-to-tr from-black/50 via-transparent to-gold-800/5 blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-black/40 via-transparent to-purple-700/6 blur-2xl opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-silver font-extrabold mb-6">
          Welcome To My Creative Studio
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Professional poster designs for movies, brands, and social media creatives.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/portfolio" className="inline-block btn-primary px-6 py-3 text-lg">View Portfolio</Link>

          <Link href="/contact" className="inline-block btn-secondary px-6 py-3 text-lg">Contact Now</Link>
        </div>
      </div>
    </section>
  );
}
