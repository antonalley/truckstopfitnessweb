"use client";

import React, { useState } from 'react';

const ReturningCustomer: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your backend verification logic here
        console.log('Phone number submitted for verification:', phoneNumber);

    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Verify Your Phone Number</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Verify</button>
            </form>
        </div>
    );
};

export default ReturningCustomer;