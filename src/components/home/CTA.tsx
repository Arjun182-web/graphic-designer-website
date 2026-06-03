'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-dark-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-12 md:p-16 text-center">
          <p className="text-gold-300 uppercase tracking-[0.35em] text-xs mb-4">Let us create something luxurious</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-silver mb-6 leading-tight">Ready to Start a Project?</h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">Let us collaborate to create something extraordinary that resonates with your audience.</p>

          <Link href="/contact">
            <button className="btn-primary">Get In Touch</button>
          </Link>

          <p className="text-gray-500 text-sm mt-8">Available for freelance and full-time opportunities</p>
        </div>
      </div>
    </section>
  );
}
