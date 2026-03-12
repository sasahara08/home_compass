import React, { useState, useEffect } from 'react';
import CompassView from './components/CompassView';
import PcWarning from './components/PcWarning';
import { isMobileDevice } from './utils/device';
import './styles/App.css';
import { FiSun, FiMoon } from 'react-icons/fi'; // To be installed if needed, or fallback symbols


function App() {
  const [isMobile, setIsMobile] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // 初回ロード時にデバイス判定
    setIsMobile(isMobileDevice());

    // リサイズ時にも再判定 (開発時のDevToolsリサイズ対応など)
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // テーマ変更時にbodyクラスを適用
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app theme-${theme}`}>
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="テーマ切り替え">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      {isMobile ? <CompassView /> : <PcWarning />}
    </div>
  );
}

export default App;
