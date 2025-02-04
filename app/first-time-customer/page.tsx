"use client"

import React from 'react';

const PricingOptions: React.FC = () => {
    const handleOneTimeUseClick = () => {
        window.location.href = '/first-time-customer/create-account?pricing=one-time-use';
    };

    const handleMonthlySubscriptionClick = () => {
        window.location.href = '/first-time-customer/create-account?pricing=monthly-subscription';
    };

    return (
        <div className="p-5 text-center">
            <h1 className="text-2xl font-bold mb-5">Truck Stop Fitness Pricing Options</h1>
            <div className="mb-5" onClick={handleOneTimeUseClick}>
                <h2 className="text-xl font-semibold">One Time Use</h2>
                <p className="text-lg">$4</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Purchase</button>
            </div>
            <div className="mb-5" onClick={handleMonthlySubscriptionClick}>
                <h2 className="text-xl font-semibold">Monthly Subscription</h2>
                <p className="text-lg">$12</p>
                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Subscribe</button>
            </div>
        </div>
    );
};

export default PricingOptions;