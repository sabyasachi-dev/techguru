'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuestionOne() {
  const router = useRouter();
  const [activeToggle, setActiveToggle] = useState<'domain' | 'technical'>('technical');

  return (
    <div className="min-h-screen bg-[#2b2b2b] text-white flex flex-col font-source-sans">
      
      {/* --- Header from Home Page --- */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-[#2b2b2b]/95 backdrop-blur-sm border-b border-white/5">
         <div className="text-2xl font-light tracking-wide text-gray-100">TechGuru</div>
         <button className="text-white hover:text-gray-300 transition-colors">
            <Menu className="w-8 h-8" strokeWidth={1.5} />
         </button>
      </nav>

      {/* Main Container */}
      <div className="pt-28 px-8 pb-8 flex-grow flex flex-col">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center text-white hover:text-gray-300 transition-colors gap-2 text-sm font-medium mb-8 w-fit"
        >
          <ChevronLeft size={20} /> Back
        </button>

        {/* Content Wrapper */}
        <main className="flex-grow w-full max-w-3xl mx-auto pb-20">
            
            {/* Label */}
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                CONTEXT SETUP
            </div>

            {/* Profile Section (Repeated from Page 4) */}
            <h2 className="text-2xl font-semibold mb-4">Learner profile</h2>
            
            <div className="bg-[#3a3a3a] rounded-lg p-6 relative shadow-lg mb-12">
                <button className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <Edit2 size={18} />
                </button>
                <h3 className="text-lg font-bold text-white mb-4">Rajan V. Sahatrabudhe</h3>
                <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm">
                    <div className="text-[#9ca3af]">Role:</div><div>Backend Developer</div>
                    <div className="text-[#9ca3af]">Domain:</div><div>BFS</div>
                    <div className="text-[#9ca3af]">Tech Stack:</div><div>Java, Spring, Kafka</div>
                </div>
            </div>

            {/* Questions Header with Toggle */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-white">Questions</h2>
                    
                    {/* Domain / Technical Toggle */}
                    <div className="bg-[#1f1f1f] rounded-[4px] p-[2px] flex">
                        <button 
                            onClick={() => setActiveToggle('domain')}
                            className={`px-6 py-1.5 text-sm rounded-[4px] transition-all ${activeToggle === 'domain' ? 'bg-[#3b46ff] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                        >
                            Domain
                        </button>
                        <button 
                            onClick={() => setActiveToggle('technical')}
                            className={`px-6 py-1.5 text-sm rounded-[4px] transition-all ${activeToggle === 'technical' ? 'bg-[#3b46ff] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                        >
                            Technical
                        </button>
                    </div>
                </div>

                {/* Question Card */}
                <div className="border border-[#4a4a4a] rounded-lg p-8 md:p-12 min-h-[300px] flex flex-col justify-between bg-[#2b2b2b]">
                    
                    <p className="text-lg text-gray-200 leading-relaxed font-light">
                        1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat?
                    </p>

                    <div className="flex gap-4 mt-10 w-full max-w-md">
                        <button className="border border-[#4a4a4a] text-gray-300 py-2 px-10 rounded-full flex-1 hover:text-white hover:bg-white/5 text-sm transition-all">
                            No
                        </button>
                        <button className="border border-[#4a4a4a] text-gray-300 py-2 px-10 rounded-full flex-1 hover:text-white hover:bg-white/5 text-sm transition-all">
                            Yes
                        </button>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-8 relative">
                    <div className="w-20"></div>

                    <div className="text-white font-medium tracking-widest text-sm">
                        1 / 4
                    </div>

                    <Link 
                        href="/setup/questions/final" 
                        className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors w-20 justify-end font-medium text-sm"
                    >
                        Next
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
      </div>
    </div>
  );
}