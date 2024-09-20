import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ disease }) => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission to send the image to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);

    // Create FormData to send the image
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Send POST request to backend API (adjust the API URL accordingly)
      const response = await axios.post(`http://localhost:5000/predict/${disease}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Get the prediction from the response
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading the image: ", error);
      setPrediction("Error: Could not get a prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <h3>Upload an image for {disease.charAt(0).toUpperCase() + disease.slice(1)} Prediction</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Detecting...' : 'Upload and Detect'}
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

export default FileUpload;
