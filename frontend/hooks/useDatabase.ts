import { useState } from 'react';
import { database } from '../config/firebase';
import { ref, onValue, push, set, remove, get } from 'firebase/database';

export const useDatabase = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получение данных
  const fetchData = async (path: string) => {
    try {
      const dbRef = ref(database, path);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  // Подписка на изменения данных
  const subscribeToData = (path: string) => {
    const dbRef = ref(database, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  };

  // Добавление данных
  const addData = async (path: string, data: any) => {
    try {
      const dbRef = ref(database, path);
      const newRef = push(dbRef);
      await set(newRef, data);
      return newRef.key;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  // Обновление данных
  const updateData = async (path: string, data: any) => {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, data);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // Удаление данных
  const deleteData = async (path: string) => {
    try {
      const dbRef = ref(database, path);
      await remove(dbRef);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    subscribeToData,
    addData,
    updateData,
    deleteData
  };
}; 