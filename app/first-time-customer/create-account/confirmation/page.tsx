"use client";
import React from 'react';

interface ConfirmationProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    onConfirms: () => void;
    onEdit: () => void;
}

const ConfirmationPage: React.FC<ConfirmationProps> = ({ firstName, lastName, email, phone, address, onConfirms, onEdit }) => {
    let onConfirm = () => {
        let search = new URLSearchParams(window.location.search);
        let pricing = search.get('pricing');
        if (pricing === 'one-time-use') {
            window.open('https://buy.stripe.com/test_5kA6ov8Li7Tb1lmaEE', '_blank');
        } else if (pricing === 'monthly-subscription') {
            window.open('https://buy.stripe.com/test_cN29AH9Pm2yR9RSbIJ', '_blank');
        }
    }
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

export default ConfirmationPage;