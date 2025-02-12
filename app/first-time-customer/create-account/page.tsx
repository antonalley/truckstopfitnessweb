"use client"

import React, { Suspense, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/firebase.config';
import useAuth from '@/hooks/useAuth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NavBar from '@/components/NavBar';

const CreateAccountPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const router = useRouter();
    const search = useSearchParams();
    const { user } = useAuth();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your submit logic here
        if (user){
            const didUpload = await uploadPhoto(photo, user.uid);
            if (didUpload) {
                const docref = doc(db, "user-information", user.uid);
                await setDoc(docref, {
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    photo: photo ? photo.name : null,
                    isWaiverSigned: false
                });

                router.push(`/first-time-customer/create-account/waiver?${search.toString()}`);
                console.log('Form submitted:', { name, dob, photo });
            }
            
        }
        
        // redirect to waiver page
        
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    return (
        <div className="h-[100%] flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Enter Information</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
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
            <NavBar />
            <CreateAccountPage />
        </Suspense>
    )
}



export default Wrapper;


async function uploadPhoto(photo: File | null, uid: string): Promise<string | null> {
    if (!photo) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `profile-photos/${uid}/${photo.name}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading photo:", error);
        return null;
    }
}
