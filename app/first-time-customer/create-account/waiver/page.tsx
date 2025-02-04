"use client";
import React, { useState } from 'react';

const WaiverPage: React.FC = () => {
    const [isSigned, setIsSigned] = useState(false);

    const handleSignWaiver = () => {
        setIsSigned(true);
        // Add logic to handle waiver signing, e.g., API call
    };

    const goToConfirm = () => {
        window.location.href = '/first-time-customer/create-account/confirmation';
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Waiver Agreement</h1>
                <p className="mb-4 text-center">Please read and sign the waiver below:</p>
                <div className="waiver-text bg-gray-50 p-4 rounded-lg mb-4">
                    <p>
                        [Insert waiver text here]
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                        placeholder="Enter your name" 
                    />
                </div>
                <button 
                    onClick={handleSignWaiver} 
                    disabled={isSigned} 
                    className={`w-full py-2 px-4 rounded-lg text-white ${isSigned ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isSigned ? 'Waiver Signed' : 'Sign Waiver'}
                </button>
                {isSigned && <button className="w-full py-2 px-4 mt-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white" onClick={goToConfirm}>Continue</button>}
            </div>
        </div>
    );
};


export default WaiverPage;