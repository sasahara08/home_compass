import React, { useState, useMemo } from 'react';
import CompassDial from './CompassDial';
import CompassHeader from './CompassHeader';
import HomeInfo from './HomeInfo';
import HomeRegister from './HomeRegister';
import PermissionPrompt from './PermissionPrompt';
import useGeolocation from '../hooks/useGeolocation';
import useDeviceOrientation from '../hooks/useDeviceOrientation';
import useHomeLocation from '../hooks/useHomeLocation';
import { calculateBearing, calculateDistance, formatDistance } from '../utils/geo';
import '../styles/CompassView.css';

/**
 * メインコンパス画面
 */
const CompassView = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { position, error: geoError, loading: geoLoading } = useGeolocation();
  const {
    heading,
    permissionGranted,
    error: orientError,
    requestPermission,
  } = useDeviceOrientation();
  const { homeLocation, saveHomeLocation, clearHomeLocation } = useHomeLocation();

  // 家への方位角を計算
  const homeBearing = useMemo(() => {
    if (!position || !homeLocation) return null;
    return calculateBearing(
      position.latitude,
      position.longitude,
      homeLocation.latitude,
      homeLocation.longitude
    );
  }, [position, homeLocation]);

  // 家までの距離を計算
  const homeDistance = useMemo(() => {
    if (!position || !homeLocation) return null;
    return calculateDistance(
      position.latitude,
      position.longitude,
      homeLocation.latitude,
      homeLocation.longitude
    );
  }, [position, homeLocation]);

  // iOS permission が必要な場合
  if (!permissionGranted && !orientError) {
    return <PermissionPrompt onRequestPermission={requestPermission} />;
  }

  return (
    <div className="compass-view">
      {/* ヘッダー：現在の方角表示 */}
      <CompassHeader heading={heading} />

      {/* メインコンパスエリア */}
      <div className="compass-view__main">
        {/* 固定の北マーカー（赤三角） */}
        <div className="compass-view__north-indicator">
          <div className="compass-view__north-triangle" />
        </div>

        {/* コンパスダイアル */}
        <CompassDial
          rotation={-heading}
          homeBearing={homeBearing}
          hasHome={!!homeLocation}
        />

        {/* 中央のクロスヘア */}
        <div className="compass-view__center-dot" />
      </div>

      {/* 家情報パネル */}
      <HomeInfo
        distance={homeDistance ? formatDistance(homeDistance) : '--'}
        bearing={homeBearing}
        onRegisterClick={() => setShowRegister(true)}
        hasHome={!!homeLocation}
      />

      {/* 位置情報エラー表示 */}
      {geoError && (
        <div className="compass-view__error">
          <p>位置情報エラー: {geoError}</p>
        </div>
      )}

      {/* 登録モーダル */}
      {showRegister && (
        <HomeRegister
          currentPosition={position}
          onSave={saveHomeLocation}
          onClear={clearHomeLocation}
          onClose={() => setShowRegister(false)}
          hasHome={!!homeLocation}
        />
      )}
    </div>
  );
};

export default CompassView;
