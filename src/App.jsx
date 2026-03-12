import React, { useState, useEffect } from 'react';
import CompassView from './components/CompassView';
import PcWarning from './components/PcWarning';
import { isMobileDevice } from './utils/device';
import './styles/App.css';

function App() {
  const [isMobile, setIsMobile] = useState(true);
  console.log("test")

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

  return (
    <div className="app">
      {isMobile ? <CompassView /> : <PcWarning />}
    </div>
  );
}

export default App;
