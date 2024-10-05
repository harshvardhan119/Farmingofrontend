import { GET_CROP } from '@/utils/constants';
import React, { useState } from 'react';
import { apiClient } from "@/lib/api-client.js";
import { Button } from '@/components/ui/button';

const PestData = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [pesticideData, setPesticideData] = useState(null); 
  const [error, setError] = useState(null); 

  // Crop list
  const crops = [
    'Corn', 'Soybeans', 'Wheat', 'Cotton', 'Tomatoes', 
    'Lettuce', 'Grapes', 'Peppers', 'Apples', 'Strawberries', 
    'Cucumbers', 'Rice', 'Citrus Trees (Oranges, Lemons)', 'Sugarcane'
  ];

  // Handle dropdown change
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Fetch pesticide data
  const fetchAndShow = async () => {
    try {
      const response = await apiClient.get(`${GET_CROP}/${selectedValue}`);
      setPesticideData(response.data);  
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch pesticide data.");
      setPesticideData(null); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-sky-800 text-center mb-6">Select a Crop for Pesticide Info</h1>

        {/* Dropdown Container */}
        <div className="mb-6">
          <label htmlFor="cropDropdown" className="block text-xl text-white mb-2">Crop</label>
          <select
            id="cropDropdown"
            value={selectedValue}
            onChange={handleChange}
            className="block w-full h-12 px-4 text-2xl font-bold text-white font-mono bg-sky-600 hover:bg-sky-700 focus:bg-sky-800 focus:ring-2 focus:ring-sky-800 transition-colors rounded-lg focus:outline-none">
            <option value="" disabled>Select a crop</option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* Find Button */}
        <Button
          className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={fetchAndShow}>
          Find Pesticide Info
        </Button>

        {/* Error Handling */}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

        {/* Display Pesticide Data */}
        {pesticideData && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{selectedValue} Pesticide Information</h3>

            {/* Suitable and Not Suitable Pesticides Side-by-Side */}
            <div className="flex justify-between gap-10">
              {/* Suitable Pesticides */}
              <div className="w-1/2 bg-green-50 p-5 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-green-600 mb-3 text-center">Suitable Pesticides</h4>
                <ul className="list-disc list-inside text-lg text-gray-700">
                  {pesticideData.data.suitable_pesticides && pesticideData.data.suitable_pesticides.map((pesticide, index) => (
                    <li key={index} className="hover:text-green-800 transition-colors">{pesticide}</li>
                  ))}
                </ul>
              </div>

              {/* Not Suitable Pesticides */}
              <div className="w-1/2 bg-red-50 p-5 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-red-600 mb-3 text-center">Not Suitable Pesticides</h4>
                <ul className="list-disc list-inside text-lg text-gray-700">
                  {pesticideData.data.not_suitable_pesticides && pesticideData.data.not_suitable_pesticides.map((pesticide, index) => (
                    <li key={index} className="hover:text-red-800 transition-colors">{pesticide}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestData;
