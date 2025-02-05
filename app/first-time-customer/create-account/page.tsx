"use client"

import React, { Suspense, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const CreateAccountPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const router = useRouter();
    const search = useSearchParams();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your submit logic here
        // redirect to waiver page
        const pricing = search.get('pricing');
        router.push(pricing 
            ? `/first-time-customer/create-account/waiver?pricing=${pricing}` 
            : '/first-time-customer/create-account/waiver');
        console.log('Form submitted:', { name, phone, dob, photo });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Enter Information</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            You consent that your phone number will only be used to send a verification text.
                        </p>
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                            Upload Photo of your face
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Sign Waiver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateAccountPage />
        </Suspense>
    )
}



export default Wrapper;