'use client';
import React, { Suspense } from 'react';
import NavBar from '@/components/NavBar';

function SurveyPage() {
  return (
    <>
      <div className="h-[100%] w-full flex flex-col">
        <div className="flex-grow overflow-hidden">
          <iframe 
            src="https://forms.gle/Hvok3bQeZSDxDiSeA" 
            className="w-full h-full border-none" 
            title="Truck Stop Fitness Survey"
            sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
          />
        </div>
      </div>
    </>
  );
}

export default function Wrapper() {
  return (
    <Suspense fallback={<div>Loading survey...</div>}>
      <NavBar />
      <SurveyPage />
    </Suspense>
  );
}