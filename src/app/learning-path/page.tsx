'use client';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

export default function LearningPath() {
  return (
    <div className="min-h-screen bg-[#2b2b2b] text-white flex flex-col font-source-sans">
      {/* 1. Standardized Black Header */}
      <Header />

      <div className="pt-24 px-8 pb-8 flex-grow flex flex-col">
        {/* 2. Break-out Back Button (Aligned Left) */}
        <BackButton />

        <main className="flex-grow flex flex-col justify-center items-center">
          {/* Main Content Container (Centered 2xl) */}
          <div className="max-w-2xl w-full">

            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Session
            </div>

            <h1 className="text-4xl font-bold mb-6">Select Learning Path</h1>

            <p className="text-gray-300 leading-7 mb-12 text-lg font-light text-left">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Pass 'continue' mode in the URL */}
              <Link
                href="/setup?mode=continue"
                className="border border-gray-500 text-white px-10 py-3 rounded-full font-medium transition-all hover:bg-white/10 hover:border-white min-w-[220px] cursor-pointer text-center"
              >
                Continue Previous Session
              </Link>

              {/* Standard New Session */}
              <Link
                href="/setup?mode=new"
                className="bg-[#3b46ff] hover:bg-blue-600 text-white px-10 py-3 rounded-full font-medium transition-all btn-glow min-w-[220px] text-center cursor-pointer"
              >
                Start New Session
              </Link>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
}