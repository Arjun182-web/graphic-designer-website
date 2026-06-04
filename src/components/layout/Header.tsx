'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dark-700 bg-dark-900/90 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-[0.16em] text-gold-500 hover:text-gold-400 transition duration-300">
            Poster
          </Link>

          <div className="hidden md:flex items-center gap-8">
  {navItems.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="text-silver/85 hover:text-gold-500 transition duration-300 text-sm uppercase tracking-[0.22em]"
    >
      {item.name}
    </Link>
  ))}
</div>

<div className="flex items-center gap-4">
  <Link
    href="/contact"
    className="btn-primary hidden md:inline-flex"
  >
    Contact
  </Link>

  <button
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle menu"
    className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-dark-900/90 text-gold-400 shadow-lg shadow-black/30 transition duration-300 hover:bg-dark-800 focus:outline-none focus:ring-4 focus:ring-gold-500/20"
  >
    <span className={`block h-0.5 w-5 bg-gold-500 transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
    <span className={`block h-0.5 w-5 bg-gold-500 my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
    <span className={`block h-0.5 w-5 bg-gold-500 transition-transform duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
  </button>
</div>
        </div>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navItems={navItems} />
      </nav>
    </header>
  );
}
