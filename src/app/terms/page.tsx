'use client';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Terms() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#2b2b2b] text-white flex flex-col font-source-sans">
      <Header />

      <div className="pt-24 px-8 pb-8 flex-grow flex flex-col">
        {/* Back Button sits here, outside the main text block */}
        <BackButton />

        <main className="flex-grow flex flex-col justify-center items-center">
          {/* Main Content Container (Centered) */}
          <div className="max-w-2xl w-full">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Terms of Use
            </div>

            <h1 className="text-4xl font-bold mb-6">Welcome!</h1>

            <p className="text-gray-300 leading-7 mb-12 text-lg font-light text-left">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/')}
                  className="border border-gray-500 text-white px-10 py-3 rounded-full font-medium transition-all hover:bg-white/10 hover:border-white min-w-[160px] cursor-pointer"
                >
                    I disagree
                </button>

                <Link 
                  href="/learning-path" 
                  className="bg-[#3b46ff] hover:bg-blue-600 text-white px-10 py-3 rounded-full font-medium transition-all btn-glow min-w-[160px] text-center cursor-pointer"
                >
                    I agree
                </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}