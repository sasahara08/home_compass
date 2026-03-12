import React from 'react';
import '../styles/PermissionPrompt.css';

/**
 * センサー許可リクエストのプロンプト
 * iOS Safari で DeviceOrientation API を使用する際に必須
 * @param {function} onRequestPermission - 許可リクエスト関数
 */
const PermissionPrompt = ({ onRequestPermission }) => {
  return (
    <div className="permission-prompt">
      <div className="permission-prompt__container">
        <div className="permission-prompt__icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="32,12 36,28 32,24 28,28" fill="currentColor" />
            <circle cx="32" cy="32" r="4" fill="currentColor" />
          </svg>
        </div>
        <h2 className="permission-prompt__title">コンパスを有効にする</h2>
        <p className="permission-prompt__text">
          コンパス機能を使用するには、デバイスの方位センサーへのアクセスを許可してください。
        </p>
        <button
          className="permission-prompt__btn"
          onClick={onRequestPermission}
          id="btn-request-permission"
        >
          センサーを許可する
        </button>
      </div>
    </div>
  );
};

export default PermissionPrompt;
