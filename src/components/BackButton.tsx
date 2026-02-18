'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  return (
    /* This wrapper ensures the button is on its own line and stays far left */
    <div className="w-full max-w-[1600px] mx-auto mb-6">
      <button 
        onClick={() => router.back()} 
        className="inline-flex items-center text-white hover:text-gray-300 transition-colors gap-2 text-sm font-medium cursor-pointer"
      >
        <ChevronLeft size={20} /> Back
      </button>
    </div>
  );
}