"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {QRCodeSVG} from 'qrcode.react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase.config';
import useUserData from '@/hooks/useUserData';
import { TTSF_CheckIn } from '@/types/tsf_types';
import { useSearchParams } from 'next/navigation';
import NavBar from '@/components/NavBar';


const CheckInPage: React.FC = () => {
    const [checkInId, setCheckInId] = useState<string | null>(null);
    const { userData } = useUserData();
    const search = useSearchParams();

    const handleCheckIn = async () => {
        const newCheckInId = uuidv4();
        
        const newCheckIn: TTSF_CheckIn = {
            location: search.get('location') ?? '',
            date: new Date(),
            wasIdGenerated: true,
            checkinId: newCheckInId,
            doorOpened: false
        }

        const docref = doc(db, "user-information", userData!.uid, 'check-ins', newCheckInId);
        await setDoc(docref, newCheckIn);

        setCheckInId(newCheckInId);
    };

    return (
        <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[100%] bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-black mb-4">Check-in to Location</h1>
            
            {checkInId ? (
            <div className="mt-8 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl text-center font-semibold mb-2">Scan at Door</h2>
            <QRCodeSVG value={`https://app.truckstopfitness.com/?userId=${userData?.uid}&checkInId=${checkInId}`} size={256} />
            </div>
            ) : <button 
            onClick={handleCheckIn} 
            className="px-4 py-2 bg-blue-500 text-gray rounded hover:bg-blue-600 transition duration-300"
            >
            Check-in
            </button>}
        </div>
        </>
    );
};


import { Suspense } from 'react';

const CheckInPageWrapper: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <CheckInPage />
    </Suspense>
);

export default CheckInPageWrapper;
// export default CheckInPage;