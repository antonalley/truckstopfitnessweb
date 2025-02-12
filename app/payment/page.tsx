"use client"
import NavBar from "@/components/NavBar";
import useUserData from "@/hooks/useUserData";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
    const search = useSearchParams();
    const success = Boolean(search.get('success')) ?? false;
    const pricing = search.get('pricing');
    const location = search.get('location');
    const router = useRouter();
    const { userData, loading } = useUserData();

    // TODO: verify payment success with firestore

    const isSubscription = pricing === 'monthly-subscription';

    return (
        <>
        <NavBar />
        
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
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessPage />
        </Suspense>
    )
}



export default Wrapper;