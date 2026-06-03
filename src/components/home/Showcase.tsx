"use client";

import Link from 'next/link';

export default function Showcase() {
  const items = [
    { id: 1, title: 'Luxury Brand Identity', subtitle: 'Branding • Strategy' },
    { id: 2, title: 'Product Landing', subtitle: 'UI/UX • Visual Design' },
    { id: 3, title: 'Interactive Dashboard', subtitle: 'Data Viz • Design' },
    { id: 4, title: 'Mobile App Concept', subtitle: 'Mobile • Prototyping' },
  ];

  return (
    <section className="py-24 bg-dark-900/95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold-300 uppercase tracking-[0.35em] text-xs mb-3">Selected Projects</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-silver mb-3">Selected Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">A curated showcase highlighting craft, motion, and detail.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article key={it.id} className="glass-card relative overflow-hidden p-6">
              <div className="h-40 rounded-3xl mb-5 bg-gradient-to-br from-gold-500/30 via-purple-600/10 to-blue-600/10 flex items-end p-5 shadow-[0_40px_120px_-90px_rgba(255,255,255,0.3)]">
                <p className="text-sm text-gold-300 font-medium uppercase tracking-[0.35em]">Featured</p>
              </div>

              <h3 className="text-lg font-semibold text-silver mb-2">{it.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{it.subtitle}</p>

              <div className="flex items-center justify-between">
                <Link href="/portfolio" className="text-gold-400 font-medium hover:underline">View case</Link>
                <span className="text-gray-500 text-sm">2025</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
