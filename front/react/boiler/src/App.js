import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Bar, Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

// API로부터 데이터를 가져와 표시하는 컴포넌트
const ApiDisplay = ({ apiEndpoint }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 요청 처리
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:5000/${apiEndpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [apiEndpoint]);

  if (loading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error}</p>;
  }

  // API 결과 렌더링
  switch (apiEndpoint) {
    case 'preprocessing':
      return (
        <div>
          <h2>Preprocessing Result</h2>
          <img src={`data:image/jpeg;base64,${data.data}`} alt="Preprocessing 결과" />
        </div>
      );

    case 'rf':
      return (
        <div>
          <h2>RF Result</h2>
          <Bar
            data={{
              labels: data.index, // 막대그래프 x축 레이블
              datasets: [
                {
                  label: 'RF Feature Importance',
                  data: data.data, // 막대그래프 데이터
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                title: { display: true, text: 'RF Feature Importance' },
              },
            }}
          />
        </div>
      );

    case 'optimization':
      return (
        <div>
          <h2>Optimization Result</h2>
          <Scatter
            data={{
              datasets: [
                {
                  label: 'Optimization Efficiency',
                  data: [{ x: 1, y: data.data }], // 최적화된 효율값 표시
                  backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                title: { display: true, text: 'Optimization Efficiency' },
              },
              scales: {
                x: { display: false },
                y: { beginAtZero: true, title: { display: true, text: 'Efficiency Value' } },
              },
            }}
          />
        </div>
      );

    default:
      return <p>지원되지 않는 API 요청입니다.</p>;
  }
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
              <Link to="/rf">RF Result</Link>
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
              element={<ApiDisplay apiEndpoint="preprocessing" />}
            />
            <Route
              path="/rf"
              element={<ApiDisplay apiEndpoint="rf" />} // 닫는 중괄호 추가
            />
            <Route
              path="/optimization"
              element={<ApiDisplay apiEndpoint="optimization" />} // 닫는 중괄호 추가
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
