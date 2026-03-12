import React from 'react';
import '../styles/HomeInfo.css';

/**
 * 家までの距離・方角情報パネル
 * @param {string} distance - フォーマット済み距離文字列
 * @param {number} bearing - 家への方位角
 * @param {function} onRegisterClick - 登録画面遷移ハンドラ
 * @param {boolean} hasHome - 家が登録されているか
 */
const HomeInfo = ({ distance, bearing, onRegisterClick, hasHome }) => {
  return (
    <div className="home-info">
      {hasHome ? (
        <div className="home-info__details">
          <div className="home-info__distance">
            <span className="home-info__label">自宅までの距離</span>
            <span className="home-info__value">{distance}</span>
          </div>
          <button
            className="home-info__btn home-info__btn--secondary"
            onClick={onRegisterClick}
            id="btn-change-home"
          >
            自宅を変更
          </button>
        </div>
      ) : (
        <div className="home-info__empty">
          <p className="home-info__empty-text">自宅が未登録です</p>
          <button
            className="home-info__btn home-info__btn--primary"
            onClick={onRegisterClick}
            id="btn-register-home"
          >
            自宅を登録する
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeInfo;
