"use client";
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import useUserData from '@/hooks/useUserData';
import { TTSF_Pricing } from '@/types/tsf_types';
import NavBar from '@/components/NavBar';

interface ConfirmationProps {
    firstName: string;
    lastName: string;
    phone: string;
    onEdit: () => void;
    goToPay: (e: React.FormEvent) => void;
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

const ConfirmationPage: React.FC = () => {
    const router = useRouter();
    const search = useSearchParams();
    const pricing = search.get('pricing') as TTSF_Pricing | null;
    const container_location = search.get('location');
    const { userData } = useUserData();

    const goToPay = async (e: React.FormEvent) => {
        e.preventDefault();
        const url =`/api/complete-purchase?pricing=${pricing}&uid=${userData?.uid}&location=${container_location}`;
        // post to url, and follow the redirect url it returns if no error
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        if (data.url) {
            // window.location.href = data.url;
            router.push(data.url);
        }
        
    }

    return (
        <Confirmation 
            firstName={userData?.firstName ?? ''} 
            lastName={userData?.lastName ?? ''}
            phone={userData?.phone ?? ''}
            onEdit={() => {}} 
            goToPay={goToPay}
        />
    );
};

const Confirmation: React.FC<ConfirmationProps> = ({ firstName, lastName, phone, onEdit, goToPay }) => {
    
    
    
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg text-black">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Information</h1>
            <div className="mb-4">
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>Phone:</strong> {phone}</p>
            </div>
            <div className="flex justify-between">
                {/* <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onEdit}>Edit</button> */}
                <form onSubmit={goToPay}>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm & Pay</button>
                </form>
            </div>
        </div>
    );
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <ConfirmationPage />
        </Suspense>
    )
}



export default Wrapper;
