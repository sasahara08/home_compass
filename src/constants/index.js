/**
 * アプリケーション全体で使用する定数
 */

// LocalStorage キー
export const STORAGE_KEYS = {
  HOME_LOCATION: 'home_compass_home_location',
};

// 画面モード
export const APP_MODES = {
  COMPASS: 'compass',
  REGISTER: 'register',
};

// コンパスのデザイン定数
export const COMPASS = {
  DIAL_SIZE: 280,
  CARDINAL_DIRECTIONS: [
    { label: 'N', degree: 0 },
    { label: 'E', degree: 90 },
    { label: 'S', degree: 180 },
    { label: 'W', degree: 270 },
  ],
  TICK_COUNT: 72, // 5度ごとのティックマーク
  MAJOR_TICK_INTERVAL: 6, // 30度ごとにメジャーティック
};

// 位置情報の設定
export const GEOLOCATION = {
  OPTIONS: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  },
};

// デバイス判定のブレークポイント
export const BREAKPOINTS = {
  MOBILE_MAX_WIDTH: 768,
};

// メッセージ
export const MESSAGES = {
  PC_WARNING_TITLE: 'スマートフォンでご利用ください',
  PC_WARNING_DESCRIPTION: 'このアプリはスマートフォンのセンサーを使用してコンパス機能を提供します。お手持ちのスマートフォンからアクセスしてください。',
  ORIENTATION_PERMISSION: 'コンパスを使用するには、デバイスの方位センサーへのアクセスを許可してください。',
  LOCATION_PERMISSION: '現在地を取得するには、位置情報へのアクセスを許可してください。',
  REGISTER_TITLE: '自宅を登録',
  REGISTER_DESCRIPTION: '現在地を自宅として登録するか、座標を手動で入力してください。',
  NO_HOME_REGISTERED: '自宅が未登録です',
  COMPASS_LABEL: 'ホームコンパス',
};
