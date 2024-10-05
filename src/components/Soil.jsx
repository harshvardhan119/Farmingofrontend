import React, { useState } from 'react';
import axios from 'axios';

const SoilAnalysis = () => {
  const [soilData, setSoilData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://soilanalysis.vercel.app/soil-analysis', {
        soilData: {
          "Soil pH": parseFloat(soilData.pH),
          "Nitrogen (N)": parseInt(soilData.nitrogen),
          "Phosphorus (P)": parseInt(soilData.phosphorus),
          "Potassium (K)": parseInt(soilData.potassium)
        }
      });
      setAnalysisResult(response.data);
    } catch (err) {
      setError('Failed to fetch analysis. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-50"> {/* Increased max-w to 2xl */}
      <h1 className="text-2xl font-bold mb-4">Soil Analysis Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Soil pH:</label>
          <input 
            type="number" 
            name="pH" 
            value={soilData.pH} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-400 rounded" 
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Nitrogen (N) in ppm:</label>
          <input 
            type="number" 
            name="nitrogen" 
            value={soilData.nitrogen} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-400 rounded" 
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Phosphorus (P) in ppm:</label>
          <input 
            type="number" 
            name="phosphorus" 
            value={soilData.phosphorus} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-400 rounded" 
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Potassium (K) in ppm:</label>
          <input 
            type="number" 
            name="potassium" 
            value={soilData.potassium} 
            onChange={handleChange} 
            required 
            className="p-2 border border-gray-400 rounded" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
        >
          Analyze Soil
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {analysisResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Analysis Result:</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Soil Data:</h3>
            <ul className="list-disc list-inside">
              <li><strong>Soil pH:</strong> {analysisResult.soilData.pH}</li>
              <li><strong>Nitrogen (N):</strong> {analysisResult.soilData.Nitrogen_ppm || "Not provided"}</li>
              <li><strong>Phosphorus (P):</strong> {analysisResult.soilData.Phosphorus_ppm || "Not provided"}</li>
              <li><strong>Potassium (K):</strong> {analysisResult.soilData.Potassium_ppm || "Not provided"}</li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Detailed Analysis:</h3>
            {Object.entries(analysisResult.analysis).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded shadow mt-2">
                <h4 className="font-semibold">{key} Analysis</h4>
                <p><strong>Interpretation:</strong> {value.interpretation}</p>
                {value.importance && <p><strong>Importance:</strong> {value.importance}</p>}
                {Array.isArray(value.recommendation) ? (
                  <div>
                    <strong>Recommendations:</strong>
                    <ul className="list-disc list-inside ml-5">
                      {value.recommendation.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  value.recommendation && (
                    <p><strong>Recommendation:</strong> {value.recommendation}</p>
                  )
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">General Recommendations:</h3>
            {Object.entries(analysisResult.generalRecommendations).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded shadow mt-2">
                <h4 className="font-semibold">{key}</h4>
                {value.description && <p>{value.description}</p>}
                {Array.isArray(value.recommendation) ? (
                  <ul className="list-disc list-inside ml-5">
                    {value.recommendation.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                ) : (
                  value.recommendation && <p>{value.recommendation}</p>
                )}
                {value.crops && (
                  <div>
                    <strong>Crops:</strong>
                    <ul className="list-disc list-inside ml-5">
                      {value.crops.map((crop, idx) => (
                        <li key={idx}>
                          <strong>{crop.name}</strong>: {crop.examples.join(", ")} - {crop.recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilAnalysis;
