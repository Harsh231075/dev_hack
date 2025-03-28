import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const RatingDonutChart = () => {
  // Sample data: number of people giving specific ratings
  const [data, setData] = useState([
    { rating: 1, count: 5 },  // 5 people gave 1 star
    { rating: 2, count: 2 },  // 2 people gave 2 stars
    { rating: 3, count: 3 },  // 3 people gave 3 stars
    { rating: 4, count: 7 },  // 7 people gave 4 stars
    { rating: 5, count: 10 }, // 10 people gave 5 stars
  ]);

  // Calculate the total number of feedback submissions
  const totalSubmissions = data.reduce((sum, item) => sum + item.count, 0);

  // Prepare the data for Pie Chart, calculate percentage of each rating
  const chartData = data.map(item => ({
    name: `${item.rating} Star`,
    value: parseFloat(((item.count / totalSubmissions) * 100).toFixed(2)), // percentage rounded to 2 decimal places and converted to number
    count: item.count, // for tooltip
  }));



  // Colors for each segment of the donut chart
  const COLORS = ['#ff0000', '#ff8000', '#ffcc00', '#33cc33', '#0080ff'];

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <h2>Rating Distribution (Donut Chart)</h2>

      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <PieChart width={400} height={400}> {/* Fixed width and height */}
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%" cy="50%"
            outerRadius={120} // Outer radius of the donut
            innerRadius={80}  // Inner radius of the donut (making it a donut chart)
            label
          >
            {
              chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))
            }
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { name, value, count } = payload[0];
              return (
                <div>
                  <strong>{name}</strong>
                  <p>{`Percentage: ${value.toFixed(2)}%`}</p>
                  <p>{`Number of Submissions: ${count}`}</p>
                </div>
              );
            }}
          />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default RatingDonutChart;
