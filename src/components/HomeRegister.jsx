import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MESSAGES } from '../constants';
import '../styles/HomeRegister.css';

/**
 * 自宅登録画面
 * @param {object|null} currentPosition - 現在の位置情報
 * @param {function} onSave - 保存ハンドラ (latitude, longitude)
 * @param {function} onClear - 削除ハンドラ
 * @param {function} onClose - 画面を閉じるハンドラ
 * @param {boolean} hasHome - 既に家が登録されているか
 */
const HomeRegister = ({ currentPosition, onSave, onClear, onClose, hasHome }) => {
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [mode, setMode] = useState('current'); // 'current' | 'manual'

  // Map click handler to select coordinates
  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setManualLat(e.latlng.lat.toFixed(6));
        setManualLng(e.latlng.lng.toFixed(6));
      },
    });
    
    // Custom icon setup to avoid default leaflet icon issues (broken image path in bundled react apps)
    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    return manualLat && manualLng ? (
      <Marker position={[parseFloat(manualLat), parseFloat(manualLng)]} icon={icon} />
    ) : null;
  };

  // Set default initial center for the map
  const defaultCenter = currentPosition 
    ? [currentPosition.latitude, currentPosition.longitude] 
    : [35.6812, 139.7671]; // Default to Tokyo if position unknown

  const handleSaveCurrent = () => {
    if (currentPosition) {
      onSave(currentPosition.latitude, currentPosition.longitude);
      onClose();
    }
  };

  const handleSaveManual = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      onSave(lat, lng);
      onClose();
    }
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  return (
    <div className="home-register">
      <div className="home-register__overlay" onClick={onClose} />
      <div className="home-register__panel">
        <div className="home-register__header">
          <h2 className="home-register__title">{MESSAGES.REGISTER_TITLE}</h2>
          <button
            className="home-register__close"
            onClick={onClose}
            id="btn-close-register"
          >
            ✕
          </button>
        </div>

        <p className="home-register__description">
          {MESSAGES.REGISTER_DESCRIPTION}
        </p>

        {/* モード切り替えタブ */}
        <div className="home-register__tabs">
          <button
            className={`home-register__tab ${mode === 'current' ? 'home-register__tab--active' : ''}`}
            onClick={() => setMode('current')}
            id="tab-current-location"
          >
            現在地から登録
          </button>
          <button
            className={`home-register__tab ${mode === 'manual' ? 'home-register__tab--active' : ''}`}
            onClick={() => setMode('manual')}
            id="tab-manual-input"
          >
            手動入力
          </button>
        </div>

        {mode === 'current' ? (
          <div className="home-register__current">
            {currentPosition ? (
              <>
                <div className="home-register__coords">
                  <div className="home-register__coord">
                    <span className="home-register__coord-label">緯度</span>
                    <span className="home-register__coord-value">
                      {currentPosition.latitude.toFixed(6)}
                    </span>
                  </div>
                  <div className="home-register__coord">
                    <span className="home-register__coord-label">経度</span>
                    <span className="home-register__coord-value">
                      {currentPosition.longitude.toFixed(6)}
                    </span>
                  </div>
                </div>
                <button
                  className="home-register__save-btn"
                  onClick={handleSaveCurrent}
                  id="btn-save-current"
                >
                  この位置を自宅に設定
                </button>
              </>
            ) : (
              <p className="home-register__loading">位置情報を取得中...</p>
            )}
          </div>
        ) : (
          <div className="home-register__manual">
            <div className="home-register__input-group">
              <label className="home-register__input-label" htmlFor="input-lat">
                緯度 (-90 〜 90)
              </label>
              <input
                id="input-lat"
                className="home-register__input"
                type="number"
                step="any"
                placeholder="例: 35.6812"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
              />
            </div>
            <div className="home-register__input-group">
              <label className="home-register__input-label" htmlFor="input-lng">
                経度 (-180 〜 180)
              </label>
              <input
                id="input-lng"
                className="home-register__input"
                type="number"
                step="any"
                placeholder="例: 139.7671"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
              />
            </div>
            
            <div className="home-register__map-container">
              <p className="home-register__map-hint">地図をタップして座標を選択できます</p>
              <MapContainer center={defaultCenter} zoom={13} style={{ height: '240px', width: '100%', borderRadius: '8px', zIndex: 1 }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker />
              </MapContainer>
            </div>
            <button
              className="home-register__save-btn"
              onClick={handleSaveManual}
              id="btn-save-manual"
            >
              この座標を自宅に設定
            </button>
          </div>
        )}

        {hasHome && (
          <button
            className="home-register__clear-btn"
            onClick={handleClear}
            id="btn-clear-home"
          >
            自宅登録を解除
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeRegister;
