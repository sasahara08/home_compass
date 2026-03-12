/**
 * 方位・距離計算ユーティリティ
 */

/**
 * 2点間の方位角を計算（度数法）
 * @param {number} lat1 - 始点の緯度
 * @param {number} lon1 - 始点の経度
 * @param {number} lat2 - 終点の緯度
 * @param {number} lon2 - 終点の経度
 * @returns {number} 方位角（0-360度、北が0）
 */
export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const dLon = toRad(lon2 - lon1);
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);

  const y = Math.sin(dLon) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

/**
 * 2点間の距離を計算（Haversine公式、メートル）
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} 距離（メートル）
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // 地球の半径（メートル）
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * 距離を読みやすい文字列にフォーマット
 * @param {number} meters - 距離（メートル）
 * @returns {string} フォーマット済み距離
 */
export const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * 角度を正規化（0-360度）
 * @param {number} angle
 * @returns {number}
 */
export const normalizeAngle = (angle) => {
  return ((angle % 360) + 360) % 360;
};
