import React, { useState } from "react";
import axios from "axios";

const UploadCard = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/dataset/upload",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(res.data.message);

      setFile(null);
      setResetKey((prev) => prev + 1);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Upload Dataset
      </h2>

   <input
  key={resetKey}
  type="file"
  accept=".csv"
  onChange={(e) => setFile(e.target.files[0])}
  className="block w-full mb-5 text-white"
/>
        <button
  onClick={uploadFile}
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload CSV"}
</button>

    </div>
  );
};

export default UploadCard;