import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';

const getBarColor = (entry) => {
  switch (entry?.priority) {
    case 'Low':
      return '#00BC7D';
    case 'Medium':
      return '#FE9900';
    case 'High':
      return '#FF1F57';
    default:
      return '#00BC7D';
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { priority, count } = payload[0].payload;
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">{priority}</p>
        <p className="text-sm text-gray-600">
          Count: <span className="font-bold">{count}</span>
        </p>
      </div>
    );
  }
  return null;
};
const CustomBarChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid />

          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: '#555' }} />

          <YAxis tick={{ fontSize: 12, fill: '#555' }} />

          <Tooltip content={CustomTooltip} cursor={{ fill: 'transparent' }} />

          <Bar
            dataKey="count"
            nameKey="priority"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: 'yellow' }}
            activeStyle={{ fill: 'green' }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CustomBarChart;
