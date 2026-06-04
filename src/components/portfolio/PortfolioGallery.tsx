"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PortfolioGalleryProps {
  filter?: string;
}

type Item = {
  id: string;
  title: string;
  category: string;
  src: string;
  alt?: string;
  createdAt?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  posters: 'Movie Posters',
  flex: 'Flex Designs',
  branding: 'Branding',
  social: 'Social Media',
};

export default function PortfolioGallery({ filter = 'all' }: PortfolioGalleryProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(filter);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setItems(data || []);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const visible = activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-gold-300 uppercase tracking-[0.3em] text-xs mb-3">Designs </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-silver max-w-3xl leading-tight">Premium poster gallery.</h2>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setActiveFilter('all')} className={`text-sm px-3 py-1 rounded-full ${activeFilter === 'all' ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-gray-300'}`}>All</button>
          {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
            <button key={k} onClick={() => setActiveFilter(k)} className={`text-sm px-3 py-1 rounded-full ${activeFilter === k ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-gray-300'}`}>{label}</button>
          ))}
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : (
          <div className="masonry-columns">
            {visible.map((it) => (
              <article key={it.id} className="masonry-item rounded-[24px] overflow-hidden mb-6 cursor-zoom-in" onClick={() => setSelected(it)}>
                <div className="relative w-full h-72 sm:h-96 transition-transform duration-500 hover:scale-105">
                  <Image src={it.image_url} alt={it.alt || it.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={false} />
                </div>
                <div className="p-4 bg-dark-900 border border-white/6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-silver">{it.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{CATEGORY_LABELS[it.category] || it.category}</p>
                    </div>
                    <span className="text-gray-500 text-xs">{it.createdAt ? new Date(it.createdAt).getFullYear() : ''}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-6xl h-[80vh] rounded-[28px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full bg-black">
              <Image src={selected.src} alt={selected.alt || selected.title} fill style={{ objectFit: 'contain' }} sizes="100vw" />
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 rounded-full border border-white/10 bg-dark-900/80 px-3 py-2 text-sm text-silver">Close</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .masonry-columns {
          column-count: 1;
          column-gap: 1rem;
        }
        @media (min-width: 640px) { .masonry-columns { column-count: 2; } }
        @media (min-width: 1280px) { .masonry-columns { column-count: 3; } }
        .masonry-item { display: inline-block; width: 100%; }
      `}</style>
    </div>
  );
}
