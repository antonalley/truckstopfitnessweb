"use client";
import { useRouter } from 'next/navigation';
import PhoneSignUp from '../../components/PhoneSignUp';

const SignUpPage = () => {
    const router = useRouter();
    const NextStep = () => {
        router.push('/dashboard');
    }
  return (
    <div>
      <PhoneSignUp onSuccess={NextStep}/>
    </div>
  );
};

export default SignUpPage;
