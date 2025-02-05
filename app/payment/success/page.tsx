"use client"

const PaymentSuccessPage = () => {
    let search = new URLSearchParams(window.location.search);
    const type = search.get('pricing');

    const isSubscription = type === 'monthly-subscription';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
            <p className="text-lg text-green-700 mb-8">
                {isSubscription ? 'Thank you for subscribing!' : 'Thank you for your one-time payment!'}
            </p>
            <button
                onClick={() => window.location.href = '/qr-code'}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
                Get QR Code to Enter
            </button>
        </div>
    );
};

export default PaymentSuccessPage;