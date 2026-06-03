'use client';

import PortfolioGallery from '../../components/portfolio/PortfolioGallery';
import PortfolioFilter from '../../components/portfolio/PortfolioFilter';
import { useState } from 'react';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <div className="min-h-screen bg-dark-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-silver mb-6 animate-fadeIn">
              Designs 
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn">
              Explore my latest projects and creative work
            </p>
          </div>

          <PortfolioFilter filter={filter} setFilter={setFilter} />
          <PortfolioGallery filter={filter} />
        </div>
      </div>
    </div>
  );
}
