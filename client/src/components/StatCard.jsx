import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300">
      <div className="text-5xl mb-4">{icon}</div>

      <h2 className="text-gray-400 text-lg">{title}</h2>

      <p className="text-3xl font-bold text-white mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatCard;