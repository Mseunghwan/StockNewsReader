import React from 'react';                      // React 라이브러리 import
import { createRoot } from 'react-dom/client';  // React 18의 새로운 렌더링 방식
import './index.css';                          // 전역 스타일
import App from './App';                       // 최상위 컴포넌트

// DOM에서 'root' id를 가진 요소를 찾아 React 앱을 렌더링
const root = createRoot(document.getElementById('root'));

// React.StrictMode는 개발 모드에서 잠재적인 문제를 찾아주는 도구
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);