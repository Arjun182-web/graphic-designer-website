'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AboutHero() {
  const [profile, setProfile] = useState<{
  name?: string;
  bio?: string;
  image_url?: string;
} | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
  fetch('/api/profile', {
    cache: 'no-store',
  })
    .then((r) => r.json())
    .then((data) => {
      console.log('PROFILE DATA:', data);
      setProfile(data);
    });
}, []);

  return (
    <section className="min-h-screen bg-dark-900 pt-32 pb-20 flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            {profile?.image_url ? (
              <div className={`rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/20 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative w-72 h-72 sm:w-96 sm:h-[520px]">
                  <Image  src={profile.image_url}
  alt={profile.name || 'Profile'} fill style={{ objectFit: 'cover' }} onLoad={() => setLoaded(true)} />
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gold-500 to-gold-400 rounded-2xl h-72 sm:h-[520px] w-full" />
            )}
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-silver mb-2 tracking-tight">
  {profile?.name || 'About Me'}
</h1>

<h2 className="text-gold-500 text-xl mb-6">
  Graphic Designer
</h2>
            <div className={`prose prose-invert max-w-none text-gray-300 transition-opacity duration-700 ${profile ? 'opacity-100' : 'opacity-70'}`}>
              <p>{profile?.bio ? profile.bio : 'No biography provided yet. Update your profile in the admin area.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
