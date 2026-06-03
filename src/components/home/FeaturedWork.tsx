'use client';

import Link from 'next/link';

export default function FeaturedWork() {
  const projects = [
    {
      id: 1,
      title: 'Modern Dashboard',
      category: 'UI/UX Design',
      image: 'bg-gradient-to-br from-gold-500 to-gold-400',
      description: 'A sophisticated analytics dashboard with real-time data visualization',
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      category: 'Full Stack Dev',
      image: 'bg-gradient-to-br from-blue-600 to-blue-400',
      description: 'High-performance online store with advanced inventory management',
    },
    {
      id: 3,
      title: 'Brand Identity',
      category: 'Branding',
      image: 'bg-gradient-to-br from-purple-600 to-purple-400',
      description: 'Complete brand redesign including logo and style guide',
    },
  ];

  return (
    <section className="bg-dark-900/95 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold-300 uppercase tracking-[0.35em] text-xs mb-3">Signature Works</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-silver mb-6">
            Featured Work
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Selected projects that showcase my expertise and premium design approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="glass-card cursor-pointer overflow-hidden">
              <div className={`${project.image} h-60 sm:h-72 rounded-[28px] transition-transform duration-500`} />
              <div className="p-6">
                <p className="text-gold-500 text-xs uppercase tracking-[0.36em] mb-3">{project.category}</p>
                <h3 className="text-2xl font-semibold text-silver mb-4">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/portfolio" className="btn-secondary">View All Projects</Link>
        </div>
      </div>
    </section>
  );
}
