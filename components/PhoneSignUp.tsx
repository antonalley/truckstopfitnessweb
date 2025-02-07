import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase.config'; // Import your Firebase config

interface PhoneSignUpProps {
  onSuccess: () => void;
}

const formatPhone = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    throw new Error('Phone number must be 10 digits.');
  }
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+1 ${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

const PhoneSignUp: React.FC<PhoneSignUpProps> = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const sendVerificationCode = async () => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, proceed with verification
        },
      });

      const response = await signInWithPhoneNumber(auth, formatPhone(phoneNumber), appVerifier);
      setVerificationId(response.verificationId);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const verifyCode = async () => {
    try {
      if (verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        await signInWithCredential(auth, credential);
        // User is signed in!
        console.log('User signed in successfully!');
        onSuccess();
      } else {
        setError('Verification ID is missing. Please resend the code.');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text:black">
      <h2 className="text-2xl font-bold mb-4">Phone Sign Up</h2>
      <div id="recaptcha-container"></div> {/* Container for reCAPTCHA */}
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
      />
      <button
        onClick={sendVerificationCode}
        disabled={!phoneNumber}
        className="mb-4 p-2 bg-blue-500 text-white rounded w-full max-w-xs disabled:bg-blue-300"
      >
        Send Verification Code
      </button>

      {verificationId && (
        <div className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={verifyCode}
            disabled={!verificationCode}
            className="p-2 bg-green-500 text-white rounded w-full disabled:bg-green-300"
          >
            Verify Code
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PhoneSignUp;
