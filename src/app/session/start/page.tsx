'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SessionStart() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex bg-black overflow-hidden font-source-sans">
      
      {/* --- Main Video Content Area --- */}
      <main className="flex-grow relative h-full bg-black">
        
        {/* 1. Background Video / Poster Container */}
        <div className="relative w-full h-full overflow-hidden">
            {/* The video tag exactly as per HTML structure */}
            <video 
                className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                poster="/assets/ai-head.png" 
                playsInline 
                loop 
                muted
            >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay to darken video slightly for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
        </div>

        {/* 2. Top Left Navigation (Absolute over video) */}
        <div className="absolute top-0 left-0 p-8 z-20 w-full flex justify-between items-start">
            <div className="flex flex-col gap-1">
                {/* Logo from Home Page style */}
                <div className="text-2xl font-light tracking-wide text-white/90 mb-4">TechGuru</div>

                {/* Back Button */}
                <button 
                    onClick={() => router.back()} 
                    className="inline-flex items-center text-white hover:text-gray-300 transition-colors gap-2 text-sm font-medium drop-shadow-md"
                >
                    <ChevronLeft size={20} /> Back
                </button>
            </div>
        </div>

        {/* 3. Bottom Center Control Pill (Absolute over video) */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center z-20 px-4">
            <div className="bg-[#282828]/85 backdrop-blur-md border border-white/10 rounded-full p-2 pr-10 pl-2 flex items-center gap-8 shadow-2xl">
                
                {/* Start Session Button */}
                <Link 
                    href="/session/active" 
                    className="bg-[#3b46ff] hover:bg-blue-600 text-white font-medium px-10 py-3 rounded-full transition-all text-base whitespace-nowrap btn-glow"
                >
                    Start Session
                </Link>

                {/* Timer Display */}
                <div className="flex flex-col items-end justify-center leading-tight">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Total 25 Min</span>
                    <span className="text-xl font-light tracking-widest text-white font-mono">
                        00 : 25 : 00
                    </span>
                </div>

            </div>
        </div>
      </main>

      {/* --- Right Sidebar (Fixed Width) --- */}
      <aside className="w-20 h-full bg-[#0f0f0f] border-l border-gray-800 flex flex-col items-center py-8 z-30 flex-shrink-0">
        <button className="text-white hover:text-blue-500 transition-colors p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        </button>
      </aside>

    </div>
  );
}