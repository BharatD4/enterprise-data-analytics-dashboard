import { FaChartBar, FaDatabase, FaUpload } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">
        Menu
      </h2>

      <ul className="space-y-6 text-lg">
        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaChartBar />
          Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaUpload />
          Upload
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaDatabase />
          Analytics
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;