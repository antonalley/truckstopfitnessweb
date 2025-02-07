// filepath: /c:/Users/User/Programming/truckstopfitness/truckstopfitnessweb/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const RedirectHome = () => {
  const router = useRouter();
    useEffect(() => {
    () => {
        router.replace('/');
    };
    });
  return null;
}

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
    
  return (props: any) => {
    const { loading, authenticated } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <RedirectHome />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;