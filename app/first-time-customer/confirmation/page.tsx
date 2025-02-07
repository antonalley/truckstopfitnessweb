"use client";
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { useSearchParams } from "next/navigation";

interface ConfirmationProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    onConfirm: () => void;
    onEdit: () => void;
}

const ConfirmationPage: React.FC = () => {
    const router = useRouter();
    const search = useSearchParams();
    const pricing = search.get('pricing');

    const onConfirm = () => {
        if (pricing === 'one-time-use') {
            router.push('https://buy.stripe.com/test_5kA6ov8Li7Tb1lmaEE');
        } else if (pricing === 'monthly-subscription') {
            router.push('https://buy.stripe.com/test_cN29AH9Pm2yR9RSbIJ');
        }
    };

    return (
        <Confirmation 
            firstName="John" 
            lastName="Doe" 
            email="x.x@x.com" 
            phone="1234567890" 
            address="123 Main St" 
            onConfirm={onConfirm} 
            onEdit={() => {}} 
        />
    );
};

const Confirmation: React.FC<ConfirmationProps> = ({ firstName, lastName, email, phone, address, onConfirm, onEdit }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg text-black">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Information</h1>
            <div className="mb-4">
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Address:</strong> {address}</p>
            </div>
            <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onEdit}>Edit</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onConfirm}>Confirm & Pay</button>
            </div>
        </div>
    );
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationPage />
        </Suspense>
    )
}



export default Wrapper;
