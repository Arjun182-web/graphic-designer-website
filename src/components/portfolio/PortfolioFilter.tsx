"use client";

interface PortfolioFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'posters', label: 'Movie Posters' },
  { key: 'flex', label: 'Flex Designs' },
  { key: 'branding', label: 'Branding' },
  { key: 'social', label: 'Social Media' },
];

export default function PortfolioFilter({ filter, setFilter }: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => setFilter(category.key)}
          className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
            filter === category.key
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 shadow-[0_16px_40px_-24px_rgba(245,158,11,0.8)]'
              : 'bg-dark-800 text-silver border border-white/10 hover:border-gold-500/40 hover:bg-white/5'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
