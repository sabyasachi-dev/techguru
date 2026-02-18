'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Download, 
  PanelRightClose, 
  Plus, 
  Send, 
  Circle,
  Square
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActiveSession() {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden font-source-sans">
      
      {/* --- LEFT: VIDEO SECTION --- */}
      <main className="flex-grow relative h-full bg-black">
        
        {/* Video Player */}
        <div className="relative w-full h-full overflow-hidden">
            <video 
                className="w-full h-full object-cover" 
                poster="/assets/ai-head.png" 
                playsInline 
                loop 
                muted 
                autoPlay
            >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
        </div>

        {/* Top Left Navigation (Header style) */}
        <div className="absolute top-0 left-0 p-8 z-20">
            <div className="text-2xl font-light tracking-wide text-white/90 mb-4">TechGuru</div>
            <button 
                onClick={() => router.back()} 
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors gap-2 text-sm font-medium drop-shadow-md"
            >
                <ChevronLeft size={20} /> Back
            </button>
        </div>

        {/* Bottom Center Controls */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center z-20 px-4">
            <div className="bg-[#282828]/90 backdrop-blur-md border border-white/10 rounded-full p-2 pr-10 pl-2 flex items-center gap-6 shadow-2xl min-w-[350px] justify-between">
                
                {/* Stop Session Group */}
                <Link href="/session/summary" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[#3b46ff] rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-blue-500/30">
                        <Square size={14} className="fill-white text-white" />
                    </div>
                    <span className="text-lg font-normal text-white">Stop Session</span>
                </Link>

                {/* Timer Display */}
                <div className="flex flex-col items-end justify-center leading-tight">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Total 25 Min</span>
                    <span className="text-xl font-light tracking-widest text-white font-mono">
                        00 : 13 : 45
                    </span>
                </div>

            </div>
        </div>
      </main>

      {/* --- RIGHT: CHAT SIDEBAR --- */}
      <aside 
        className={`${chatOpen ? 'w-[450px]' : 'w-0'} bg-[#121212] border-l border-gray-800 transition-all duration-300 flex flex-col z-30 flex-shrink-0 relative overflow-hidden`}
      >
        {/* Toggle Button for when sidebar is hidden */}
        {!chatOpen && (
            <button 
                onClick={() => setChatOpen(true)}
                className="absolute top-6 left-[-40px] bg-[#121212] border border-gray-800 p-2 rounded-l-md text-white"
            >
                <PanelRightClose size={20} className="rotate-180" />
            </button>
        )}

        {/* Sidebar Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-gray-800 min-w-[450px]">
            <div className="flex items-center gap-3">
                <span className="text-blue-500 font-bold text-lg tracking-wide">AI.ERA</span>
                
                {/* Toggle Switch (A / Code) */}
                <div className="flex bg-[#2a2a2a] rounded-md p-1 gap-1">
                    <button className="w-6 h-6 bg-blue-600 rounded text-xs flex items-center justify-center font-bold text-white">A</button>
                    <button className="w-6 h-6 text-gray-400 hover:text-white rounded text-xs flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                    Download learnings
                    <Download size={16} />
                </button>
                <button onClick={() => setChatOpen(false)} className="text-white hover:text-gray-300">
                    <PanelRightClose size={20} />
                </button>
            </div>
        </header>

        {/* Chat Content Area */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-8 no-scrollbar min-w-[450px]">
            
            {/* AI Message */}
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">AI.</div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-300">Here's a clear summery of this answer, as requested.</p>
                </div>
            </div>

            {/* AI Long Text */}
            <div className="flex items-start gap-4 pl-12">
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...
                </p>
            </div>

            {/* User Message with Image Card */}
            <div className="flex items-start gap-4 flex-row-reverse">
                <div className="w-8 h-8 bg-[#d946ef] rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">Me</div>
                <div className="flex flex-col gap-3 max-w-[85%]">
                    <div className="bg-[#1e1e1e] border border-[#333] rounded-lg p-4">
                        {/* Summary Graphic Card */}
                        <div className="rounded-lg overflow-hidden mb-4 border border-[#333] bg-black">
                             <div className="h-32 w-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                                 <Circle size={40} className="text-blue-500/50" />
                             </div>
                             <div className="bg-[#2a2a2a] p-2 flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                                <span className="text-[10px] text-gray-400 uppercase">Generative AI summarised text</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis...
                        </p>
                    </div>
                </div>
            </div>

        </div>

        {/* Chat Input Footer */}
        <div className="p-4 bg-[#121212] border-t border-gray-800 min-w-[450px]">
            <div className="bg-[#2b2b2b] rounded-md flex items-center px-4 py-3 gap-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Plus size={20} />
                </button>
                <input 
                    type="text" 
                    placeholder="Type here" 
                    className="bg-transparent flex-grow text-sm text-white placeholder-gray-500 focus:outline-none" 
                />
                <button className="text-white hover:text-blue-500 transition-colors">
                    <Send size={20} />
                </button>
            </div>
        </div>
      </aside>

    </div>
  );
}