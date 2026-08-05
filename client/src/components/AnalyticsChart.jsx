import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsChart = ({ datasets }) => {
  const chartData = datasets.map((item) => ({
    name: item.fileName,
    rows: item.data.length,
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Dataset Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="rows" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;