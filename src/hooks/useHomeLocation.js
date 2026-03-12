import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';

/**
 * 自宅の位置情報をLocalStorageで管理するフック
 */
const useHomeLocation = () => {
  const [homeLocation, setHomeLocation] = useState(null);

  // 初回読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HOME_LOCATION);
      if (stored) {
        setHomeLocation(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load home location:', e);
    }
  }, []);

  // 自宅を登録
  const saveHomeLocation = useCallback((latitude, longitude) => {
    const location = { latitude, longitude };
    try {
      localStorage.setItem(STORAGE_KEYS.HOME_LOCATION, JSON.stringify(location));
      setHomeLocation(location);
    } catch (e) {
      console.error('Failed to save home location:', e);
    }
  }, []);

  // 自宅を削除
  const clearHomeLocation = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.HOME_LOCATION);
      setHomeLocation(null);
    } catch (e) {
      console.error('Failed to clear home location:', e);
    }
  }, []);

  return { homeLocation, saveHomeLocation, clearHomeLocation };
};

export default useHomeLocation;
