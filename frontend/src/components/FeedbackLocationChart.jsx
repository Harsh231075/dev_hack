import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeedbackLocationChart = () => {
  // Initial data with user feedback locations and submission percentage
  const [data, setData] = useState([
    { location: 'New York', percentage: 75 },
    { location: 'Los Angeles', percentage: 80 },
    { location: 'Chicago', percentage: 65 },
  ]);

  // Function to add a new location
  const addLocation = (location, percentage) => {
    const newData = [...data, { location, percentage }];
    setData(newData);
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>User Feedback Submission by Location</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Button to simulate adding a new location */}
      <button onClick={() => addLocation('Miami', 70)}>Add Miami</button>
      <button onClick={() => addLocation('Dallas', 85)}>Add Dallas</button>
    </div>
  );
};

export default FeedbackLocationChart;
