"use client"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
    const search = useSearchParams();
    const type = search.get('pricing');
    const router = useRouter();

    const isSubscription = type === 'monthly-subscription';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
            <p className="text-lg text-green-700 mb-8">
                {isSubscription ? 'Thank you for subscribing!' : 'Thank you for your one-time payment!'}
            </p>
            <button
                onClick={() => router.push('/qr-code')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
                Get QR Code to Enter
            </button>
        </div>
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