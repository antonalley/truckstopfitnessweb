'use client';
import React, { Suspense } from 'react';
import NavBar from '@/components/NavBar';

function SurveyPage() {
  return (
    <>
      <div className="h-[100%] w-full flex flex-col">
        <div className="flex-grow overflow-hidden">
          <iframe 
            src="https://forms.otternautcrm.com/f0c1b357-1aad-4a26-bf67-12495e0ddee0/cff5ca94-a5c3-4577-b931-e790ec9a14e1" 
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