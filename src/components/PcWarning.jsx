import React from 'react';
import { MESSAGES } from '../constants';
import '../styles/PcWarning.css';

/**
 * PC でアクセスした場合にスマホ利用を促す画面
 */
const PcWarning = () => {
  return (
    <div className="pc-warning">
      <div className="pc-warning__container">
        <div className="pc-warning__icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="22"
              y="10"
              width="36"
              height="60"
              rx="6"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <line
              x1="22"
              y1="20"
              x2="58"
              y2="20"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="22"
              y1="58"
              x2="58"
              y2="58"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="40" cy="64" r="3" fill="currentColor" />
          </svg>
        </div>
        <h1 className="pc-warning__title">{MESSAGES.PC_WARNING_TITLE}</h1>
        <p className="pc-warning__description">
          {MESSAGES.PC_WARNING_DESCRIPTION}
        </p>
        <div className="pc-warning__qr-hint">
          <p>このページのURLをスマートフォンで開いてください</p>
        </div>
      </div>
    </div>
  );
};

export default PcWarning;
