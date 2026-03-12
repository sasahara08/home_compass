import React, { useMemo } from 'react';
import { COMPASS } from '../constants';
import '../styles/CompassDial.css';

/**
 * iPhoneコンパス風のダイアル（方位盤）
 * @param {number} rotation - ダイアル全体の回転角度（デバイスの向きの逆）
 * @param {number|null} homeBearing - 家の方角（度数法）
 * @param {boolean} hasHome - 家が登録済みかどうか
 */
const CompassDial = ({ rotation, homeBearing, hasHome }) => {
  // ティックマーク生成
  const ticks = useMemo(() => {
    return Array.from({ length: COMPASS.TICK_COUNT }, (_, i) => {
      const degree = i * (360 / COMPASS.TICK_COUNT);
      const isMajor = i % COMPASS.MAJOR_TICK_INTERVAL === 0;
      return { degree, isMajor };
    });
  }, []);

  return (
    <div className="compass-dial" style={{ transform: `rotate(${rotation}deg)` }}>
      {/* ティックマーク */}
      {ticks.map((tick, i) => (
        <div
          key={i}
          className={`compass-dial__tick ${tick.isMajor ? 'compass-dial__tick--major' : ''}`}
          style={{ transform: `rotate(${tick.degree}deg)` }}
        >
          <div className="compass-dial__tick-line" />
        </div>
      ))}

      {/* 方位ラベル (N, E, S, W) */}
      {COMPASS.CARDINAL_DIRECTIONS.map((dir) => (
        <div
          key={dir.label}
          className={`compass-dial__cardinal ${dir.label === 'N' ? 'compass-dial__cardinal--north' : ''}`}
          style={{ transform: `rotate(${dir.degree}deg)` }}
        >
          <span
            className="compass-dial__cardinal-label"
            style={{ transform: `rotate(${-dir.degree - rotation}deg)` }}
          >
            {dir.label}
          </span>
        </div>
      ))}

      {/* 角度ラベル (30, 60, 120, 150, 210, 240, 300, 330) */}
      {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
        <div
          key={deg}
          className="compass-dial__degree-label-wrapper"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <span
            className="compass-dial__degree-label"
            style={{ transform: `rotate(${-deg - rotation}deg)` }}
          >
            {deg}
          </span>
        </div>
      ))}

      {/* 家の方向マーカー */}
      {hasHome && homeBearing !== null && (
        <div
          className="compass-dial__home-marker"
          style={{ transform: `rotate(${homeBearing}deg)` }}
        >
          <div className="compass-dial__home-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3L4 10V20C4 20.55 4.45 21 5 21H9V14H15V21H19C19.55 21 20 20.55 20 20V10L12 3Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompassDial;
