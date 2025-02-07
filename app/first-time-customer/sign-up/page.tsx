"use client";
import { useRouter } from 'next/navigation';
import PhoneSignUp from '../../../components/PhoneSignUp';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

const SignUpPage = () => {
    const search = useSearchParams();
    const router = useRouter();
    const NextStep = () => {
        const pricing = search.get('pricing');
        router.push(`/first-time-customer/create-account?pricing=${pricing}`);
    }
  return (
    <div>
      <PhoneSignUp onSuccess={NextStep}/>
    </div>
  );
};

const Wrapper: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
        </Suspense>
    )
}

export default Wrapper;
