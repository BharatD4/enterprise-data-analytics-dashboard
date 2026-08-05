import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDatabase, FaChartBar, FaUpload } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import UploadCard from "../components/UploadCard";
import AnalyticsChart from "../components/AnalyticsChart";

const Dashboard = () => {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [search, setSearch] = useState("");
  
  const fetchDatasets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dataset",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDatasets(res.data.datasets);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDataset = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/dataset/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Dataset Deleted Successfully");
      fetchDatasets();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const totalRows = datasets.reduce(
    (sum, item) => sum + item.data.length,
    0
  );
  const totalMale = datasets.reduce((count, dataset) => {
  return (
    count +
    dataset.data.filter(
      (row) =>
        row.sex === "Male" ||
        row.gender === "Male"
    ).length
  );
}, 0);

const totalFemale = datasets.reduce((count, dataset) => {
  return (
    count +
    dataset.data.filter(
      (row) =>
        row.sex === "Female" ||
        row.gender === "Female"
    ).length
  );
}, 0);

const latestDataset =
  datasets.length > 0
    ? datasets[datasets.length - 1]
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-2">
            📊 Enterprise Data Analytics Dashboard
          </h1>

          <p className="text-gray-400 mb-8">
            Welcome Bharat 👋
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatCard
              title="Datasets"
              value={datasets.length}
              icon={<FaDatabase />}
            />

            <StatCard
              title="Rows Uploaded"
              value={totalRows}
              icon={<FaUpload />}
            />

            <StatCard
              title="Charts"
              value={datasets.length}
              icon={<FaChartBar />}
            />

          </div>

          <UploadCard onUploadSuccess={fetchDatasets} />
        

          <div className="bg-gray-800 rounded-xl p-6 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Uploaded Datasets
            </h2>
            <input
  type="text"
  placeholder="🔍 Search Dataset..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-5 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
/>

            {datasets.length === 0 ? (

              <p className="text-gray-400">
                No Dataset Uploaded
              </p>

            ) : (

              <table className="w-full text-left">

                <thead className="border-b border-gray-700">

                  <tr>
                    <th className="py-3">File Name</th>
                    <th className="py-3">Rows</th>
                    <th className="py-3">Uploaded Date</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {datasets
  .filter((dataset) =>
    dataset.fileName
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((dataset) => (

                    <tr
                      key={dataset._id}
                      className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >

                      <td className="py-4">
                        {dataset.fileName}
                      </td>

                      <td>
                        {dataset.data.length}
                      </td>

                      <td>
                        {dataset.createdAt
                          ? new Date(dataset.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="text-center space-x-2">

                        <button
                          onClick={() => setSelectedDataset(dataset)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteDataset(dataset._id)}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

          {selectedDataset && (

            <div className="bg-gray-800 rounded-xl p-6 mt-10">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                  Dataset Preview
                </h2>

                <button
                  onClick={() => setSelectedDataset(null)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Close
                </button>

              </div>

              <div className="overflow-auto">

                <table className="w-full text-left">

                  <thead className="border-b border-gray-700">

                    <tr>

                      {Object.keys(selectedDataset.data[0]).map((key) => (

                        <th key={key} className="py-3 px-3">
                          {key}
                        </th>

                      ))}

                    </tr>

                  </thead>

                  <tbody>

                    {selectedDataset.data.slice(0, 5).map((row, index) => (

                      <tr
                        key={index}
                        className="border-b border-gray-700"
                      >

                        {Object.values(row).map((value, i) => (

                          <td key={i} className="py-3 px-3">
                            {value}
                          </td>

                        ))}

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;