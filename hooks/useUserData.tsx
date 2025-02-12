import { useState, useEffect } from 'react';
import { db } from '@/firebase.config'; // Adjust the import path as necessary
import useAuth from './useAuth';
import { doc, onSnapshot } from 'firebase/firestore';
import { TTSF_UserData } from '@/types/tsf_types';

const useUserData = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<TTSF_UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const docRef = doc(db, 'user-information', user.uid);
        const unsubscribe = onSnapshot(docRef, (d) => {
            // setUserData();
            const raw_data = d.data();
            if (!raw_data) {
                throw new Error('User data not found');

            }
            const newUserData: TTSF_UserData = {
                uid: user.uid,
                firstName: raw_data.firstName,
                lastName: raw_data.lastName,
                dob: raw_data.dob,
                photo: raw_data.photo,
                isWaiverSigned: raw_data.isWaiverSigned ?? false,
                phone: user.phoneNumber!,
                isSubscribed: raw_data.isSubscribed ?? false,
            };
            console.log("User Data:", newUserData);
            setUserData(newUserData);
            setLoading(false);
        },
        (err) => {
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return { userData, loading, error };
};

export default useUserData;