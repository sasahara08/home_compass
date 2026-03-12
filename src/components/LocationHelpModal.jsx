import React from 'react';
import '../styles/LocationHelpModal.css';

/**
 * 位置情報設定のヘルプモーダル
 */
const LocationHelpModal = ({ onClose }) => {
  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div
        className="help-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="help-modal-close-btn"
          onClick={onClose}
          aria-label="閉じる"
        >
          &times;
        </button>
        
        <h2 className="help-modal-title">位置情報が取得できない場合</h2>
        <p className="help-modal-desc">
          「User denied Geolocation」などのエラーが出る場合、スマートフォンの設定で位置情報がブロックされている可能性があります。以下の設定をご確認ください。
        </p>

        <div className="help-modal-section">
          <h3>🍎 iPhone (iOS) の場合</h3>
          <ol>
            <li>iPhoneの「設定」アプリを開く</li>
            <li>「プライバシーとセキュリティ」＞「位置情報サービス」を開き「オン」にする</li>
            <li>下にスクロールして、お使いのブラウザ（「Safari」など）を選択</li>
            <li>「このAppの使用中のみ許可」が選択されているか確認する<br/><small>※「正確な位置情報」のトグルもオンにしてください</small></li>
          </ol>
        </div>

        <div className="help-modal-section">
          <h3>🤖 Android の場合</h3>
          <ol>
            <li>Androidの「設定」アプリを開く</li>
            <li>「位置情報」をオンにする</li>
            <li>「アプリの権限」から、お使いのブラウザ（「Chrome」など）を選択</li>
            <li>「アプリの使用中のみ許可」になっているか確認する</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LocationHelpModal;
