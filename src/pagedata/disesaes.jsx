import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      setPrediction(null);

      const response = await axios.post(
        "https://google-clouddeploy-238365468738.us-central1.run.app/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        setPrediction(response.data.prediction);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-900 flex flex-col justify-center items-center py-12">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crop Disease Prediction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Selected file preview"
                className="w-56 h-56 object-cover rounded-lg border-4 border-gray-200 mb-4 shadow-lg"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-gray-200 rounded-lg border-4 border-dashed border-gray-400 mb-4 shadow-lg">
                <span className="text-gray-500 font-semibold">
                  Upload an image
                </span>
              </div>
            )}

            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-5 rounded-lg text-white font-bold text-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              "Upload and Predict"
            )}
          </button>
        </form>

        {prediction && (
          <div className="mt-8 bg-green-100 text-green-800 p-4 rounded-lg shadow-md text-center animate-fade-in">
            <h3 className="font-bold text-xl">Prediction Result:</h3>
            <p className="text-lg mt-2">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
