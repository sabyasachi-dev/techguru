'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SessionSummary() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden font-source-sans">
      
      {/* 1. Background Image with Blur Effect (Matches Intro Page) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/ai-head.png" 
          alt="Background" 
          fill 
          className="object-cover filter blur-[8px] brightness-[0.35] scale-110"
          priority
        />
      </div>

      {/* 2. Header (Home Page Variant) */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6">
         <div className="text-2xl font-light tracking-wide text-white">TechGuru</div>
         <button className="text-white hover:text-gray-300 transition-colors">
            <Menu className="w-8 h-8" strokeWidth={1.5} />
         </button>
      </nav>

      {/* 3. Main Content Overlay */}
      <main className="relative z-10 h-full flex items-center justify-center px-4">
        
        <div className="bg-[#333333] border border-[#444444] rounded-lg p-10 max-w-2xl w-full shadow-2xl">
            
            {/* Label */}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                SUMMERY
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-white mb-6">
                Your session has ended
            </h1>

            {/* Paragraph Content (Left Aligned) */}
            <p className="text-gray-300 leading-relaxed font-light mb-10 text-lg text-left">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Exit Button */}
                <Link 
                    href="/" 
                    className="border border-[#6b7280] text-[#e5e7eb] hover:text-white hover:bg-white/5 font-medium px-8 py-3 rounded-full transition-all text-base min-w-[200px] text-center"
                >
                    Exit without download
                </Link>

                {/* Download Button */}
                <button 
                    className="bg-[#3b46ff] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full transition-all text-base flex items-center justify-center gap-2 min-w-[200px] btn-glow"
                >
                    Download Summery
                    <Download size={20} />
                </button>

            </div>

        </div>

      </main>
    </div>
  );
}