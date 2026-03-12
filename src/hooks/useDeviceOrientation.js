import { useState, useEffect, useCallback } from 'react';

/**
 * デバイスの方位（コンパスヘディング）を取得するフック
 * iOS / Android 両対応
 */
const useDeviceOrientation = () => {
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  const handleOrientation = useCallback((event) => {
    let compassHeading = 0;

    if (event.webkitCompassHeading !== undefined) {
      // iOS Safari
      compassHeading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android Chrome
      compassHeading = 360 - event.alpha;
    }

    setHeading(compassHeading);
  }, []);

  const requestPermission = useCallback(async () => {
    // iOS 13+ requires explicit permission request
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError('方位センサーへのアクセスが拒否されました');
        }
      } catch (err) {
        setError('方位センサーの許可リクエストに失敗しました');
      }
    } else {
      // Android or older iOS — no permission needed
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }, [handleOrientation]);

  useEffect(() => {
    // Android なら自動でリスナー登録
    if (
      typeof DeviceOrientationEvent === 'undefined' ||
      typeof DeviceOrientationEvent.requestPermission !== 'function'
    ) {
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation]);

  return { heading, permissionGranted, error, requestPermission };
};

export default useDeviceOrientation;
