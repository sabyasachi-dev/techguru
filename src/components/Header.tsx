'use client';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      // Hide if scrolling down past 50px
      setHidden(current > lastScroll && current > 50);
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-transform duration-300 bg-black border-b border-white/10 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <Link href="/" className="text-2xl font-light tracking-wide text-white cursor-pointer">
        TechGuru
      </Link>
      <button className="text-white hover:text-gray-300 transition-colors cursor-pointer">
        <Menu className="w-8 h-8" strokeWidth={1.5} />
      </button>
    </nav>
  );
}