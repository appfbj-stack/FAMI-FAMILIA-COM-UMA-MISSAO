
import { useState, useEffect } from 'react';
import { isAdminLoggedIn, ADMIN_STATUS_CHANGED } from '../services/announcementService';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());

  useEffect(() => {
    const handleStatusChange = () => {
      setIsAdmin(isAdminLoggedIn());
    };

    window.addEventListener(ADMIN_STATUS_CHANGED, handleStatusChange);
    return () => {
      window.removeEventListener(ADMIN_STATUS_CHANGED, handleStatusChange);
    };
  }, []);

  return isAdmin;
};
