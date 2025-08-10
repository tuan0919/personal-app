import { FiUsers, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center gap-3">
      <button
        type="button"
        aria-label="Quay lại"
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-blue-100 transition"
      >
        <FiArrowLeft className="text-blue-500 text-xl" />
      </button>
      <FiUsers className="text-blue-500 text-2xl" />
      <span className="text-lg font-bold text-gray-800 tracking-wide">
        Thông tin Khách hàng
      </span>
    </nav>
  );
};
