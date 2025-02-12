"use client";
import { useRouter } from 'next/navigation';
import PhoneSignUp from '../../../components/PhoneSignUp';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import NavBar from '@/components/NavBar';

const SignUpPage = () => {
    const search = useSearchParams();
    const router = useRouter();
    const NextStep = () => {
        router.push(`/first-time-customer/create-account?` + search.toString());
    }
  return (
    <>
    <NavBar />
      <PhoneSignUp onSuccess={NextStep}/>
    </>
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
