'use client';

export default function Skills() {
  const skillCategories = [
    {
      category: 'Design',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch'],
    },
    {
      category: 'Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Framer Motion', 'Webflow', 'WordPress', 'CI/CD'],
    },
  ];

  return (
    <section className="bg-dark-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-silver mb-4">Skills & Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={category.category} className="bg-dark-900 p-8 rounded-lg border border-dark-700 hover:border-gold-500/50 transition">
              <h3 className="text-2xl font-bold text-gold-500 mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-dark-800 text-silver rounded-full text-sm border border-dark-700 hover:border-gold-500/50 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
