'use client';

import Link from 'next/link';

export default function Journey() {
  return (
    <section className="bg-dark-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-silver mb-6">Let us Create Together</h2>
          <p className="text-gray-400 text-lg mb-10">If you would like to collaborate, use the contact form to send a message.</p>

          <a href="/contact" className="inline-block px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-gold-500/50 transition">Start a Conversation</a>
        </div>
      </div>
    </section>
  );
}
