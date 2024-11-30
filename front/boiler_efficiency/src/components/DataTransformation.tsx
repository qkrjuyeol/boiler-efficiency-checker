import React, { useEffect, useState } from 'react';
import transformationData from '../data/transformation.json'; // Importing data from JSON file

interface TransformationData {
  before: number[][];
  after: number[][];
}

const DataTransformation: React.FC = () => {
  const [data, setData] = useState<TransformationData | null>(null);

  useEffect(() => {
    // Using data from JSON file
    setData(transformationData);
  }, []);

  return (
    <div className="data-transformation">
      <h3>Data Transformation Results</h3>
      <div className="before-after">
        <div>
          <h4>Before</h4>
          <pre>{JSON.stringify(data?.before, null, 2)}</pre>
        </div>
        <div>
          <h4>After</h4>
          <pre>{JSON.stringify(data?.after, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default DataTransformation;
