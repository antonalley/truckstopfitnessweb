'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const search = useSearchParams();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center w-full">
          <img src="/logo.png" alt="Truck Stop Fitness" className="w-3/4 sm:w-1/2" />
        </div>
         
        <div className="flex flex-col gap-4 w-full items-center">
          <button 
            onClick={() => router.push('/first-time-customer?' + search.toString())} 
            className="w-full px-4 py-8 bg-blue-500 text-white text-2xl rounded hover:bg-blue-700"
          >
            First Time Customer
          </button>
          <button 
            onClick={() => router.push('/sign-in?' + search.toString())} 
            className="w-full px-4 py-8 bg-green-500 text-white text-2xl rounded hover:bg-green-700"
          >
            Returning Customer
          </button>
        </div>
      </main>
    </div>
  );
}
