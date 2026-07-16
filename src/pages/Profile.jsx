import { useEffect, useState } from "react";
import {ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Profile() {
  const username = localStorage.getItem("username");
  const [totalEntries, setTotalEntries] = useState(0);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    fetch("https://mindspace-jw73.onrender.com/journal")
      .then((response) => response.json())
      .then((data) => setTotalEntries(data.length))
      .catch((error) => console.log(error));
  }, []);

    const handleLogout = () => {
    setShowLogoutModal(true);
    };

    const confirmLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  setShowLogoutModal(false);
  navigate("/");
};
  const cancelLogout = () => {
  setShowLogoutModal(false);
};

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-5 transition-all duration-300 ${
        darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F3EE]"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-[30px] shadow-xl overflow-hidden transition-all duration-300 ${
          darkMode ? "bg-[#2A2A2A]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={ `relative p-8 text-center ${
            darkMode
              ? "bg-[#333333]"
              : "bg-gradient-to-r from-[#F4C542] to-[#FFD86B]"
          }`}
        >
          <button
          onClick={() => navigate("/dashboard")}
         className={`absolute top-5 left-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition ${
         darkMode
         ? "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
         : "bg-white text-[#3D352E] hover:bg-gray-100"
         }`}
        >
         <ArrowLeft size={20} />
       </button>



          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
            👤
          </div>

          <h1
            className={`text-3xl font-bold mt-4 ${
              darkMode ? "text-white" : "text-[#3D352E]"
            }`}
          >
            My Profile
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-gray-400" : "text-[#5F5F5F]"
            }`}
          >
            Welcome back, {username}!
          </p>
        </div>

        {/* Body */}
        <div className="p-7 space-y-5">
          {/* Username */}
          <div
            className={`rounded-2xl p-5 border ${
              darkMode
                ? "bg-[#3A3A3A] border-[#4A4A4A]"
                : "bg-[#F8F8F8] border-[#ECECEC]"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Username
            </p>

            <h2
              className={`text-xl font-semibold mt-1 ${
                darkMode ? "text-white" : "text-[#3D352E]"
              }`}
            >
              {username}
            </h2>
          </div>

          {/* Entries */}
          <div
            className={`rounded-2xl p-5 border ${
              darkMode
                ? "bg-[#3A3320] border-[#F4C542]"
                : "bg-[#FFF7DD] border-[#F4C542]"
            }`}
          >
            <p className="text-sm text-[#DDBB3F]">
              Total Journal Entries
            </p>

            <h2
              className={`text-4xl font-bold mt-2 ${
                darkMode ? "text-white" : "text-[#3D352E]"
              }`}
            >
              {totalEntries}
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Keep writing your story ✨
            </p>
          </div>

          {/* Quote */}
          <div
            className={`rounded-2xl p-4 ${
              darkMode ? "bg-[#3A3A3A]" : "bg-[#F8F3EE]"
            }`}
          >
            <p
              className={`italic text-center ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              "Every day is a new page in your story."
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#E53935] hover:bg-[#C62828] text-white py-4 rounded-2xl font-semibold transition duration-300"
          >
            🚪 Logout
          </button>
        </div>
      </div>
        {showLogoutModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div
      className={`w-[320px] rounded-3xl p-6 shadow-xl ${
        darkMode ? "bg-[#2A2A2A]" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          darkMode ? "text-white" : "text-[#3D352E]"
        }`}
      >
        Logout?
      </h2>

      <p
        className={`mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Are you sure you want to log out?
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={cancelLogout}
          className="flex-1 py-3 rounded-xl bg-gray-300 text-black"
        >
          Cancel
        </button>

        <button
          onClick={confirmLogout}
          className="flex-1 py-3 rounded-xl bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;