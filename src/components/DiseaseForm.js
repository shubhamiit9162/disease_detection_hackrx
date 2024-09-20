import React, { useState } from 'react';
import axios from 'axios';

const DiseaseForm = ({ disease }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: ''
    // Add more fields depending on the disease model
  });
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Send the form data to the backend for prediction (adjust the API URL accordingly)
      const response = await axios.post(`http://localhost:5000/predict/${disease}`, formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting the disease:", error);
      setPrediction("Error: Could not get a prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-form">
      <h3>Provide Details for {disease.charAt(0).toUpperCase() + disease.slice(1)} Prediction</h3>
      <form onSubmit={handleSubmit}>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">--Select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Symptoms:</label>
        <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange} required />

        {/* Add more inputs specific to the disease as needed */}

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Submit'}
        </button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseForm;
