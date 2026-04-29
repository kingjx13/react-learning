import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { fetchUserDetail } from '../services/api';

export const useUserDetail = (userId: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadUserDetail = useCallback(async (id: string | undefined) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserDetail(id);
      setUser(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading user detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserDetail(userId);
  }, [userId, loadUserDetail]);

  return {
    user,
    loading,
    error,
    loadUserDetail
  };
};