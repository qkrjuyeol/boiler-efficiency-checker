// File: src/components/FeatureGraphs.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeatureGraphs: React.FC = () => {
  console.log("FeatureGraphs is rendering");

  // State to store the image data
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // Fetching image data from the API
    axios.get('http://127.0.0.1:5000/preprocessing')
      .then(response => {
        if (response.data && response.data.data) {
          // Assuming the response contains Base64-encoded image data
          const base64Image = response.data.data;
          setImgSrc(`data:image/jpeg;base64,${base64Image}`);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching preprocessing image:', error);
      });
  }, []);

  return (
    <div className="feature-graphs">
      <h3>Preprocessing Results</h3>
      <div className="image-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        {imgSrc ? (
          <img src={imgSrc} alt="Preprocessing Result" style={{ maxWidth: '100%', maxHeight: '600px' }} />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </div>
  );
};

export default FeatureGraphs;
