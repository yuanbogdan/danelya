import { useState } from 'react';
import { ref, set, get, push } from 'firebase/database';
import { database } from '../config/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      console.log('Starting registration with:', { email, name });

      // Создаем нового пользователя
      const newUserRef = push(ref(database, 'users'));
      const userData = {
        id: newUserRef.key,
        name,
        email,
        password, // В реальном приложении пароль должен быть хэширован
        createdAt: new Date().toISOString()
      };

      await set(newUserRef, userData);
      console.log('User data saved to database');

      return userData;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login with:', email);

      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);

      if (!snapshot.exists()) {
        throw new Error('auth/user-not-found');
      }

      // Ищем пользователя с указанным email
      const users = snapshot.val();
      const userData = Object.values(users).find(
        (user: any) => user.email === email
      ) as User;

      if (!userData) {
        throw new Error('auth/user-not-found');
      }

      if (userData.password !== password) {
        throw new Error('auth/wrong-password');
      }

      console.log('Login successful:', userData.id);
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    register,
    login
  };
}; 