"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';

const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const token = Cookies.get('token'); 
    
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY || ''); 
        
        if (!secret.length) {
          setError('JWT secret is not configured');
          return;
        }

        jwtVerify(token, secret)
          .then(({ payload }) => {
            setUser({
              id: payload.id,
              name: payload.name,
              email: payload.email,
              role: payload.role,
            });
            setError(null);
          })
          .catch((verifyError) => {
            console.error('Error verifying token:', verifyError);
            setError('Invalid token');
            setUser(null);
          });
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
        setError('Token decoding failed');
        setUser(null);
      }
    }
  }, []); 

  return { user, error };
};

export default useAuth;
