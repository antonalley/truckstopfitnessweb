"use client";
import React, { Suspense, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



const WaiverPage: React.FC = () => {
    const [isSigned, setIsSigned] = useState(false);
    const router = useRouter();
    const search= useSearchParams();

    const handleSignWaiver = () => {
        setIsSigned(true);
        // Add logic to handle waiver signing, e.g., API call
    };

    const goToConfirm = () => {
        router.push('/first-time-customer/create-account/confirmation?pricing=' + search.get('pricing'));
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-black">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Waiver Agreement</h1>
                <p className="mb-4 text-center">Please read and sign the waiver below:</p>
                <div className="waiver-text bg-gray-50 p-4 rounded-lg mb-4">
                    <p>
                    <p>
                        By signing this waiver, I acknowledge that I am voluntarily participating in physical exercise activities at the micro-gym provided by TruckStopFitness. I understand that there will not be an employee present to supervise or assist with my workouts.
                    </p>
                    <p>
                        I am aware that physical exercise can be strenuous and subject to risk of serious injury. I agree that I am voluntarily participating in these activities and assume all risks of injury, illness, or death.
                    </p>
                    <p>
                        I hereby release, discharge, and hold harmless TruckStopFitness, its owners, agents, and employees from any and all claims, demands, damages, rights of action, or causes of action, present or future, arising out of or connected with my participation in any exercise program, including any injuries resulting therefrom.
                    </p>
                    <p>
                        I acknowledge that I have read this waiver and fully understand its terms. I understand that I am giving up substantial rights, including my right to sue. I acknowledge that I am signing this waiver freely and voluntarily, and intend by my signature to be a complete and unconditional release of all liability to the greatest extent allowed by law.
                    </p>
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
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

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WaiverPage />
        </Suspense>
    )
}



export default Wrapper;