import React, { useState } from 'react';
import './styles/App.css';
import DiseaseForm from './components/DiseaseForm';
import FileUpload from './components/FileUpload';

function App() {
  const [selectedDisease, setSelectedDisease] = useState('');

  // Handle disease selection
  const handleDiseaseChange = (event) => {
    setSelectedDisease(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Disease Detection System</h1>
        <p>Select a disease and provide the necessary inputs</p>
      </header>

      <div className="form-container">
        <label htmlFor="disease">Select a Disease:</label>
        <select id="disease" value={selectedDisease} onChange={handleDiseaseChange}>
          <option value="">--Select--</option>
          <option value="cancer">Cancer</option>
          <option value="diabetes">Diabetes</option>
          <option value="heart">Heart Disease</option>
          <option value="kidney">Kidney Disease</option>
          <option value="liver">Liver Disease</option>
          <option value="malaria">Malaria</option>
          <option value="pneumonia">Pneumonia</option>
        </select>

        {/* Render appropriate form based on disease selection */}
        {['malaria', 'pneumonia'].includes(selectedDisease) ? (
          <FileUpload disease={selectedDisease} />
        ) : selectedDisease ? (
          <DiseaseForm disease={selectedDisease} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
