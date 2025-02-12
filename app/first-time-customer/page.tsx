"use client"

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TTSF_Pricing } from '@/types/tsf_types';
import NavBar from '@/components/NavBar';

const PricingOptions: React.FC = () => {
    const router = useRouter();
    const search = useSearchParams();
    const handleOneTimeUseClick = () => {
        const pricing: TTSF_Pricing = 'one-time-use';
        router.push(`/first-time-customer/sign-up?pricing=${pricing}&` + search.toString());
    };

    const handleMonthlySubscriptionClick = () => {
        console.log('monthly subscription coming soon');
        // TODO: implement monthly subscription
        // router.push('/first-time-customer/sign-up?pricing=monthly-subscription&' + search.toString());
    };

    return (
        <>
        <NavBar />
        
        <div className="p-5 text-center bg-white text-black">
            <h1 className="text-2xl font-bold mb-5">Truck Stop Fitness Pricing Options</h1>
            <div className="mb-5" onClick={handleOneTimeUseClick}>
            <h2 className="text-xl font-semibold">One Time Use</h2>
            <p className="text-lg">$4</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Purchase</button>
            </div>
            <div className="mb-5" aria-disabled onClick={handleMonthlySubscriptionClick}>
            <h2 className="text-xl font-semibold">Monthly Subscription</h2>
            <p className="text-lg">$12</p>
            <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded" disabled>Coming Soon</button>
            </div>
        </div>
        </>
    );
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <PricingOptions />
        </Suspense>
    );
}

export default Wrapper;