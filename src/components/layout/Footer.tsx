'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold text-gold-500 mb-2">Poster</h3>
            <p className="text-gray-400 text-sm">Minimal portfolio for premium poster design.</p>
          </div>

          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-gold-500 transition text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gold-500 transition text-sm">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">© {currentYear} Poster. All rights reserved.</div>
      </div>
    </footer>
  );
}
