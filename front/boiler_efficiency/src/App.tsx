import React, { useState } from 'react';
import FeatureImportanceGraph from './components/FeatureImportanceGraph';
import FeatureGraphs from './components/FeatureGraphs';
import EfficiencyGraph from './components/EfficiencyGraph';
import './App.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('');

  const renderContent = () => {
    switch (currentView) {
      case '전처리 결과':
        return <FeatureGraphs />;
      case 'RF 결과':
        return <FeatureImportanceGraph />;
      case '최적화 결과':
        return <EfficiencyGraph />;
      default:
        return <div>Select a task to view the results</div>;
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <h2>Task App</h2>
        <ul>
          <li onClick={() => setCurrentView('전처리 결과')}>전처리 결과</li>
          <li onClick={() => setCurrentView('RF 결과')}>RF 결과</li>
          <li onClick={() => setCurrentView('최적화 결과')}>최적화 결과</li>
        </ul>
      </aside>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;