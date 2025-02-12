"use client";
import { useRouter } from 'next/navigation';
import PhoneSignUp from '../../components/PhoneSignUp';
import { useEffect } from 'react';
import useUserData from '@/hooks/useUserData';
import NavBar from '@/components/NavBar';

const SignUpPage = () => {
    const router = useRouter();
    const { userData, loading } = useUserData();
    const NextStep = () => {
        router.push('/dashboard');
    }
    useEffect(() => {
        if(!loading && userData) {
            router.push('/dashboard');
        }
    }, [userData]);
  return (
    <>
    <NavBar />
    <div>
      <PhoneSignUp onSuccess={NextStep}/>
    </div>
    </>
    
  );
};

export default SignUpPage;
