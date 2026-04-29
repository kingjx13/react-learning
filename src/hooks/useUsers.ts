import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { fetchUsers, updateUser, createUser, deleteUser } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleUpdateUser = useCallback(async (id: number, userData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === id ? updatedUser : user)
      );
      return updatedUser;
    } catch (err) {
      setError(err as Error);
      console.error('Error updating user:', err);
      throw err;
    }
  }, []);

  const handleAddUser = useCallback(async (userData: Partial<User>) => {
    try {
      const newUser = await createUser(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      setError(err as Error);
      console.error('Error adding user:', err);
      throw err;
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      return true;
    } catch (err) {
      setError(err as Error);
      console.error('Error deleting user:', err);
      throw err;
    }
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    handleUpdateUser,
    handleAddUser,
    handleDeleteUser
  };
};