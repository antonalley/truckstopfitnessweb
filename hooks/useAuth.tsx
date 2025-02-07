// filepath: /c:/Users/User/Programming/truckstopfitness/truckstopfitnessweb/hooks/useAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase.config';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User:", user)
        setUser(user);
        setAuthenticated(true);
      } else {
        console.log("User:", user)
        setAuthenticated(false);
      }
      console.log("stop loading")
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace('/');
    }
  }, [loading, authenticated, router]);

  return { loading, authenticated, user };
};

export default useAuth;