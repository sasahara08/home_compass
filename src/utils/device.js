import { BREAKPOINTS } from '../constants';

/**
 * デバイスがモバイルかどうかを判定
 * User-Agent と画面サイズの両方で判定
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // User-Agent によるモバイル判定
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);

  // 画面サイズによる判定
  const isMobileScreen = window.innerWidth <= BREAKPOINTS.MOBILE_MAX_WIDTH;

  // タッチサポートの確認
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobileUA || (isMobileScreen && hasTouch);
};
