// hooks/useAuth.ts
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));  
    }
  }, []);

  return { user };
};

export default useAuth;
