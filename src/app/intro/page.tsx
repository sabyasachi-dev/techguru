'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';

export default function IntroPage() {
  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden font-source-sans">
      
      {/* 1. Background Image with Blur Effect */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/ai-head.png" 
          alt="Background" 
          fill 
          className="object-cover filter blur-[8px] brightness-[0.35] scale-110"
          priority
        />
      </div>

      {/* 2. Standardized Header */}
      <Header />

      {/* 3. Main Content Overlay */}
      <div className="relative z-10 h-full flex flex-col pt-24 px-8">
        
        {/* Reusable Back Button (Aligned Left) */}
        <BackButton />

        {/* Centered Introduction Card */}
        <main className="flex-grow flex items-center justify-center pb-12">
            <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg p-10 max-w-2xl w-full shadow-2xl">
                
                {/* Label */}
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    INTRODUCTION
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-6">
                    Hi, I am Aira!
                </h1>

                {/* Paragraph Content */}
                <p className="text-gray-200 leading-relaxed font-light mb-10 text-lg text-left">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.
                </p>

                {/* Action Button */}
                <Link 
                    href="/session/start" 
                    className="inline-block bg-[#3b46ff] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full transition-all transform hover:scale-105 btn-glow cursor-pointer"
                >
                    Start Coaching
                </Link>

            </div>
        </main>
      </div>
    </div>
  );
}