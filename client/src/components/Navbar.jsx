import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-6">
      <h2 className="text-2xl font-bold text-white">
        Enterprise Data Analytics
      </h2>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;