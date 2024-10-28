// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import Papa from 'papaparse';
import '../styles/dashboard.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

const Dashboard = () => {
  const [data, setData] = useState([]); 
  const [manufacturerData, setManufacturerData] = useState([]); 
  const [modelData, setModelData] = useState([]); 

  useEffect(() => {
    const fetchCSVData = async () => {
      const filePath = process.env.REACT_APP_CSV_FILE_PATH; 
      console.log("Fetching CSV from:", filePath); 

      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          console.error(`Network response was not ok. Status: ${response.status}`);
          return;
        }

        const csvText = await response.text();
        console.log("CSV Text Loaded:", csvText); 

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Parsed Data:", results.data); 
            setData(results.data); 

            // Vehicles per manufacturer
            const manufacturerCount = results.data.reduce((acc, vehicle) => {
              acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
              return acc;
            }, {});
            setManufacturerData(Object.entries(manufacturerCount).map(([name, count]) => ({ name, count })));

            // Vehicle model distribution
            const modelCount = results.data.reduce((acc, vehicle) => {
              acc[vehicle.Model] = (acc[vehicle.Model] || 0) + 1;
              return acc;
            }, {});
            setModelData(Object.entries(modelCount).map(([name, value]) => ({ name, value })));
          },
          error: (error) => {
            console.error("Parsing error:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    fetchCSVData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Electric Vehicle Population Dashboard</h1>

      <div className="charts-container">
        <div className="chart">
          <h2>Vehicles per Manufacturer</h2>
          <BarChart width={500} height={300} data={manufacturerData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart">
          <h2>Vehicle Model Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie data={modelData} cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" dataKey="value" label>
              {modelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
