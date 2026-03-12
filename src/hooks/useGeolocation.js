import { useState, useEffect, useCallback } from 'react';
import { GEOLOCATION } from '../constants';

/**
 * 現在地の位置情報を取得・監視するフック
 */
const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSuccess = useCallback((pos) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
    });
    setError(null);
    setLoading(false);
  }, []);

  const handleError = useCallback((err) => {
    setError(err.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }

    // 初回取得
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      GEOLOCATION.OPTIONS
    );

    // 継続的な監視
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      GEOLOCATION.OPTIONS
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [handleSuccess, handleError]);

  return { position, error, loading };
};

export default useGeolocation;
