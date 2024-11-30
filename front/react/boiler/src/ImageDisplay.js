import React, { useState, useEffect } from 'react';

function ImageDisplay() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch('http://your-backend.com/api/image') // API 요청
      .then(response => response.json()) // JSON 형태로 응답 처리
      .then(data => {
        setImageData(data.image); // Base64 이미지 데이터 저장
      })
      .catch(error => console.error('Error fetching image:', error));
  }, []);

  return (
    <div>
      <h1>이미지 표시</h1>
      {imageData ? (
        <img src={imageData} alt="API에서 받은 이미지" />
      ) : (
        <p>이미지를 불러오는 중...</p>
      )}
    </div>
  );
}

export default ImageDisplay;
