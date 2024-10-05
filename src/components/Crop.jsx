import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CropAnalysis = () => {
  const [startDate, setStartDate] = useState(null);
  const [crop, setCrop] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [growthData, setGrowthData] = useState([]);
  const [farmerData, setFarmerData] = useState([]);
  const [newDay, setNewDay] = useState("");
  const [newMoisture, setNewMoisture] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [farmerquery, setfarmerquery] = useState("");

  const handleSubmit = async () => {
    if (!startDate || !crop) {
      setResponseMessage("Please select a date and enter a crop type.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://farmercropanalysis.vercel.app/submit-crop-data", {
        cropType: crop,
        seedingDate: startDate,
      });

      setGrowthData(response.data.growthData);
      setResponseMessage(response.data.message);
      console.log(response.data);
    } catch (error) {
      setResponseMessage("Failed to submit data. Please try again.");
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmerDataSubmit = () => {
    if (!newDay || !newMoisture || !newHeight) {
      setfarmerquery("Please fill in all fields for day, moisture, and height.");
      return;
    }

    const newData = {
      day: Number(newDay),
      moisture: Number(newMoisture),
      height: Number(newHeight),
    };

    setFarmerData([...farmerData, newData]);
    setNewDay("");
    setNewMoisture("");
    setNewHeight("");
  };

  const moistureChartData = {
    labels: growthData.map((data) => `Day ${data.day}`),
    datasets: [
      {
        label: "Ideal Moisture",
        data: growthData.map((data) => data.moisture),
        fill: false,
        borderColor: "#1E90FF",
        tension: 0.1,
      },
      {
        label: "Farmer Moisture",
        data: farmerData.map((data) => data.moisture),
        fill: false,
        borderColor: "#FF6347",
        tension: 0.1,
      },
    ],
  };

  const heightChartData = {
    labels: growthData.map((data) => `Day ${data.day}`),
    datasets: [
      {
        label: "Ideal Height",
        data: growthData.map((data) => data.height),
        fill: false,
        borderColor: "#32CD32",
        tension: 0.1,
      },
      {
        label: "Farmer Height",
        data: farmerData.map((data) => data.height),
        fill: false,
        borderColor: "#FFA500",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans"> 
      <h2 className="text-4xl text-center text-gray-800"><b>Analyse your crop Growth</b></h2>
      <h4 className="text-2xl text-center text-gray-800">Enter the date of your crop grown and the crop name </h4>

      <div className="flex flex-col md:flex-row justify-center mb-5">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Select a seeding date"
          className="p-2 mx-2 border rounded border-gray-300 w-full md:w-52"
        />
        <input
          type="text"
          placeholder="Enter crop Name"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="p-2 mx-2 border rounded border-gray-300 w-full md:w-52"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`p-2 mx-2 rounded border-none cursor-pointer text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} transition duration-300 w-full md:w-auto`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {responseMessage && <p className="text-center">{responseMessage}</p>}

      <h3 className="mt-5 text-l text-center">Update Farmer Crop Data</h3>
      <div className="flex flex-col md:flex-row justify-center mb-5">
        <input
          type="number"
          placeholder="Enter day"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
          className="p-2 mx-2 border rounded border-gray-300 w-full md:w-28"
        />
        <input
          type="number"
          placeholder="moisture(%)"
          value={newMoisture}
          onChange={(e) => setNewMoisture(e.target.value)}
          className="p-2 mx-2 border rounded border-gray-300 w-full md:w-28"
        />
        <input
          type="number"
          placeholder="height(cm)"
          value={newHeight}
          onChange={(e) => setNewHeight(e.target.value)}
          className="p-2 mx-2 border rounded border-gray-300 w-full md:w-28"
        />
        <button
          onClick={handleFarmerDataSubmit}
          className="p-2 mx-2 rounded border-none cursor-pointer text-white bg-orange-600 hover:bg-orange-700 transition duration-300 w-full md:w-auto"
        >
          Submit Farmer Data
        </button>
       
      </div>
      <h6 className="text-center ">{farmerquery}</h6>
      {growthData.length > 0 && (
        <div>
          <div className="flex flex-col md:flex-row justify-between mb-5">
            <div className="flex-1 mx-2 p-5 bg-gray-100 rounded-lg shadow">
              <h3 className="text-lg">Moisture vs Day</h3>
              <div className="overflow-auto">
                <Line data={moistureChartData} />
              </div>
            </div>

            <div className="flex-1 mx-2 p-5 bg-gray-100 rounded-lg shadow">
              <h3 className="text-lg">Height vs Day</h3>
              <div className="overflow-auto">
                <Line data={heightChartData} />
              </div>
            </div>
          </div>

          <div className="mb-5 p-5 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg">Ideal Growth Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-2 border">Parameter</th>
                    {growthData.map((data) => (
                      <th key={data.day} className="p-2 border">Day {data.day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Moisture</td>
                    {growthData.map((data) => (
                      <td key={data.day} className="p-2 border">{data.moisture}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border">Height</td>
                    {growthData.map((data) => (
                      <td key={data.day} className="p-2 border">{data.height}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg">Farmer Growth Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    <th className="p-2 border">Parameter</th>
                    {farmerData.map((data, index) => (
                      <th key={index} className="p-2 border">Day {data.day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Moisture</td>
                    {farmerData.map((data) => (
                      <td key={data.day} className="p-2 border">{data.moisture}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border">Height</td>
                    {farmerData.map((data) => (
                      <td key={data.day} className="p-2 border">{data.height}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAnalysis;
