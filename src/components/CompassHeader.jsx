import React from 'react';
import '../styles/CompassHeader.css';

/**
 * コンパスのヘッダー（現在の方角表示）
 * @param {number} heading - 現在のデバイスヘディング（度数法）
 */
const CompassHeader = ({ heading }) => {
  const getDirectionName = (deg) => {
    const directions = [
      '北', '北北東', '北東', '東北東',
      '東', '東南東', '南東', '南南東',
      '南', '南南西', '南西', '西南西',
      '西', '西北西', '北西', '北北西',
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="compass-header">
      <div className="compass-header__heading">
        <span className="compass-header__degree">{Math.round(heading)}°</span>
        <span className="compass-header__direction">{getDirectionName(heading)}</span>
      </div>
    </div>
  );
};

export default CompassHeader;
