'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

export default function Home() {
  const [hidden, setHidden] = useState(false);
  
  // Handle Scroll to hide header
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
        const current = window.scrollY;
        // Hide if scrolling down more than 50px
        setHidden(current > lastScroll && current > 50);
        lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-[#020408] text-white overflow-x-hidden">
      
      {/* 1. Header (Fixed & Hides on Scroll) */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
         <div className="text-2xl font-light tracking-wide text-gray-100">TechGuru</div>
         <button className="text-white hover:text-gray-300">
            <Menu className="w-8 h-8" strokeWidth={1.5} />
         </button>
      </nav>

      {/* 2. Background Graphic (Fixed Position) */}
      <div className="fixed top-0 left-0 h-screen w-full md:w-[60%] z-0 pointer-events-none opacity-90">
         <div className="relative w-full h-full">
            {/* Make sure 'ai-head.png' is in your public/assets folder */}
            <Image 
              src="/assets/ai-head2.png" 
              alt="AI Graphic" 
              fill 
              className="object-cover object-left scale-125 origin-top-left transition-transform duration-700 ease-out opacity-90"
              style={{ objectPosition: '-40%' }}
              priority
            />
            {/* Gradient Overlay to blend image into black background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020408]"></div>
         </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20">
        
        {/* Section A: Hero (Top Part) */}
        <section className="min-h-screen flex items-center justify-end pb-20">
            <div className="w-full md:w-1/2 lg:w-[45%] pl-4 md:pl-10">
                <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-6">
                    Guidance <br/> 
                    <span className="font-light">Beyond Limits</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 font-light mb-10 max-w-md leading-relaxed">
                    Your real-time AI guide for smarter <br/> 
                    solutions and seamless support
                </p>

                <Link 
                  href="/terms" 
                  className="inline-block bg-[#3b46ff] hover:bg-blue-700 text-white font-bold text-sm tracking-wider px-10 py-4 rounded-full transition-all btn-glow uppercase"
                >
                    Get Started
                </Link>
            </div>
        </section>

        {/* Section B: Welcome (Bottom Part) */}
        <section className="min-h-[80vh] flex flex-col justify-center items-end pb-20">
            <div className="w-full md:w-1/2 lg:w-[45%] pl-8 md:pl-10 border-l-4 border-blue-600">
                <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                    Welcome to a New Era <br/>
                    of Associates Engagement
                </h2>
                
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
                    Alra is designed to assist associates with their technical and domain queries or challenges. This real time avatar based virtual assistant acts as a knowledgeable guide, providing coaching and support tailored to your specific learning needs.
                    <br/><br/>
                    With the avatar’s interactive capabilities, associates can receive real-time assistance, fostering greater efficiency.
                </p>
            </div>
        </section>

      </div>
    </main>
  );
}