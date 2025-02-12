"use client";
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {QRCodeSVG} from 'qrcode.react';
import { collection, doc, setDoc, where, query, getDocs} from 'firebase/firestore';
import { db } from '@/firebase.config';
import useUserData from '@/hooks/useUserData';
import { TTSF_CheckIn } from '@/types/tsf_types';
import { useSearchParams, useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';


const CheckInPage: React.FC = () => {
    const [checkInCode, setCheckInCode] = useState<string | null>(null);
    const { userData, loading } = useUserData();
    const search = useSearchParams();
    const location = search.get('location') ?? '';
    const router = useRouter();
    const [verifiedSuccess, setVerifiedSuccess] = useState<Boolean>(false);
    const [loadingVerified, setLoadingVerified] = useState<Boolean>(true);

    // verify payment success with firestore
    useEffect(() => {

            const checkRecentCheckIn = async () => {
                if (loading || !userData) return;
                // TODO: check for subscription first
                const paymentsRef = collection(db, 'user-information', userData.uid, 'payments');
                const last24hours = new Date();
                last24hours.setDate(last24hours.getDate() - 1);

                const q = query(
                    paymentsRef,
                    where('location', '==', location),
                    where('date', '>=', last24hours),
                    where('payment_status', '==', 'paid')
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Handle the case where there is a recent check-in with payment_status "paid"
                    console.log('Recent check-in found:', querySnapshot.docs[0].data());
                    setVerifiedSuccess(true);
                    setLoadingVerified(false);
                } else {
                    // Handle the case where there is no recent check-in with payment_status "paid"
                    console.log('No recent check-in found with payment_status "paid"');
                    setVerifiedSuccess(false);
                    setLoadingVerified(false);
                }
            };

            checkRecentCheckIn();
        

    }, [userData, loading])

    const handleCheckIn = async () => {
        if (!verifiedSuccess) throw Error("Tried to checkin without verified success");
        const newCheckInId = uuidv4();
        const checkInDate = new Date();
        const newCheckIn: TTSF_CheckIn = {
            location: search.get('location') ?? '',
            date: checkInDate,
            wasIdGenerated: true,
            checkinId: newCheckInId,
            doorOpened: false
        }

        const docref = doc(db, "user-information", userData!.uid, 'check-ins', newCheckInId);
        await setDoc(docref, newCheckIn);

        const new_check_in_code = `${userData!.uid}:${newCheckInId}:${location}:${checkInDate.getTime()}`;
        setCheckInCode(new_check_in_code);
    };

    if (!loadingVerified && !verifiedSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-[100%] bg-red-100">
                <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Failed!</h1>
                <p className="text-lg text-red-800 mb-8 text-center">
                    Please contact the front desk for assistance. Call: 630 943 0041
                </p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Go to Dashboard to Try Again
                </button>
            </div>
        )
    }

    else if (loadingVerified) {
        return (
            <div className="flex flex-col items-center justify-center h-[100%] bg-yellow-100">
                <h1 className="text-4xl font-bold text-yellow-800 mb-4">Verifying Payment...</h1>
                <p className="text-lg text-yellow-700 mb-8">
                    Please wait a moment...
                </p>
            </div>
        )
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center h-[100%] bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-black mb-4">Check-in to Location</h1>
            
            {checkInCode ? (
            <div className="mt-8 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl text-center font-semibold mb-2">Scan at Door</h2>
            <QRCodeSVG value={`https://app.truckstopfitness.com/?checkInCode=${checkInCode}`} size={256} />
            </div>
            ) : <button 
            onClick={handleCheckIn} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
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
        <NavBar />
        <CheckInPage />
    </Suspense>
);

export default CheckInPageWrapper;
// export default CheckInPage;