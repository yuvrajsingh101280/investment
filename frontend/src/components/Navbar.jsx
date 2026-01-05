import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold text-indigo-600">
        Investment Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
