"use client"
import NavBar from "@/components/NavBar";
import { db } from "@/firebase.config";
import { getDocs, query, where, collection } from "firebase/firestore";
import useUserData from "@/hooks/useUserData";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TTSF_Pricing } from "@/types/tsf_types";

const PaymentSuccessPage = () => {
    const search = useSearchParams();
    const success = Boolean(search.get('success')) ?? false;
    const pricing = search.get('pricing') as TTSF_Pricing | null;
    const location = search.get('location');
    const router = useRouter();
    const { userData, loading } = useUserData();
    const [verifiedSuccess, setVerifiedSuccess] = useState<Boolean>(false);
    const [loadingVerified, setLoadingVerified] = useState<Boolean>(true);

    // verify payment success with firestore
    useEffect(() => {
        if (success){

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
        }

    }, [userData, loading])

    const isSubscription = pricing === 'subscription';
    
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

    
    else {
        return (
            <>
            
            
            <div className="flex flex-col items-center justify-center h-[100%] bg-green-100">
                <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
                <p className="text-lg text-green-700 mb-8">
                    {isSubscription ? 'Thank you for subscribing!' : 'Thank you for your one-time payment!'}
                </p>
                <button
                    onClick={() => router.push(`/check-in?${search.toString()}`)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Go To Check In at {location}
                </button>
            </div>
            </>
        );
    }
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <PaymentSuccessPage />
        </Suspense>
    )
}



export default Wrapper;