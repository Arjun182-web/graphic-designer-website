'use client';

import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

export default function MobileMenu({ isOpen, setIsOpen, navItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-6 rounded-[20px] border border-white/8 bg-dark-900/95 backdrop-blur p-4 shadow-lg">
      <div className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-4 py-3 text-center text-silver hover:bg-white/5 hover:text-gold-300 transition duration-200 text-sm uppercase tracking-[0.2em]"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <Link href="/contact" className="mt-4 block w-full text-center rounded-full bg-gold-500 px-4 py-3 text-dark-900 font-semibold">
        Contact
      </Link>
    </div>
  );
}
