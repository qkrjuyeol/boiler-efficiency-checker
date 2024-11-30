import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// API로부터 이미지를 가져와 표시하는 컴포넌트
const ImageDisplay = ({ apiEndpoint }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 백엔드로부터 이미지 데이터를 가져오는 함수
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:5000/${apiEndpoint}`) // 백엔드 API 요청
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setImageData(data.data); // Base64 형식의 이미지 데이터
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [apiEndpoint]);

  // 이미지 또는 상태 표시
  return (
    <div>
      <h2>{apiEndpoint} Result</h2>
      {loading ? (
        <p>이미지를 불러오는 중...</p>
      ) : error ? (
        <p>오류 발생: {error}</p>
      ) : (
        <img src={`data:image/jpeg;base64,${imageData}`} alt={`${apiEndpoint} 결과`} />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', marginLeft: '20px' }}>
        {/* 목차 */}
        <nav style={{ padding: '10px', backgroundColor: '#ffffff', width: '200px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/preprocessing">Preprocessing Result</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/rf">RF result</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/optimization">Optimization Result</Link>
            </li>
          </ul>
        </nav>

        {/* 페이지 내용 */}
        <main style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route
              path="/preprocessing"
              element={<ImageDisplay apiEndpoint="preprocessing" />}
            />
            <Route path="/rf" element={<ImageDisplay apiEndpoint="rf" />} 
            />
            <Route
              path="/optimization"
              element={<ImageDisplay apiEndpoint="optimization" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;