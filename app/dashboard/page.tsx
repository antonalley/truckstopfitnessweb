"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase.config';
import useUserData from '@/hooks/useUserData';
import { TTSF_Pricing } from '@/types/tsf_types';
import NavBar from '@/components/NavBar';


const Dashboard: React.FC = () => {
    const router = useRouter();
    const { userData } = useUserData();
    const search = useSearchParams();
    const logout = async () => {
        await signOut(auth);
        router.push('/');
    }
    const oneTimePayment = async () => {
        const pricing: TTSF_Pricing = 'one-time-use';
        const url =`/api/complete-purchase?pricing=${pricing}&uid=${userData?.uid}&container_location=${search.get('container_location')}`;
        // post to url, and follow the redirect url it returns if no error
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        if (data.url) {
            // window.location.href = data.url;
            router.push(data.url);
        }
    }
    const startSubscription = async () => {
        const pricing: TTSF_Pricing = 'subscription';
        const url =`/api/complete-purchase?pricing=${pricing}&uid=${userData?.uid}&container_location=${search.get('container_location')}`;
        // post to url, and follow the redirect url it returns if no error
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        if (data.url) {
            // window.location.href = data.url;
            router.push(data.url);
        }
    }

    const checkIn = async () => {
        router.push(`/check-in?${search.toString()}`);
    }
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold">Welcome, {userData?.firstName}!</h1>
            {!userData?.isSubscribed ? (
                <div className="space-y-2">
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={oneTimePayment}>
                        One Time Payment (4$)
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={startSubscription}>
                        Start Subscription (12$/month)
                    </button>
                    <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700' onClick={logout}>
                        SignOut
                    </button>
                </div>
            ) : (
                <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700" onClick={checkIn}>
                    Check In
                </button>
            )}
        </div>
    );
};


const Wrapper: React.FC = () => {

    return (
    <Suspense fallback={<div>Loading...</div>}>
    <NavBar />
    <Dashboard />
    </Suspense>
    );
}


export default ProtectedRoute(Wrapper);