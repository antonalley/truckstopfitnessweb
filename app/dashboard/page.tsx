"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase.config';

interface DashboardProps {
    userName: string;
    hasSubscription: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, hasSubscription }) => {
    const router = useRouter();
    const logout = async () => {
        await signOut(auth);
        router.push('/');
    }
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold">Welcome, {userName}!</h1>
            {!hasSubscription ? (
                <div className="space-y-2">
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => router.push('https://buy.stripe.com/test_5kA6ov8Li7Tb1lmaEE')}>
                        One Time Payment (4$)
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={() => router.push('https://buy.stripe.com/test_cN29AH9Pm2yR9RSbIJ')}>
                        Start Subscription (12$/month)
                    </button>
                    <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700' onClick={logout}>
                        SignOut
                    </button>
                </div>
            ) : (
                <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
                    Check In
                </button>
            )}
        </div>
    );
};


const Wrapper: React.FC = () => {

    return <Dashboard userName="John Doe" hasSubscription={false} />;
}


export default ProtectedRoute(Wrapper);