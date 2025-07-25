import { FaHistory } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ActivityHistoryNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center gap-3">
      <button
        type="button"
        aria-label="Quay lại"
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-pink-100 transition"
      >
        <FaArrowLeft className="text-pink-400 text-xl" />
      </button>
      <FaHistory className="text-pink-400 text-2xl" />
      <span className="text-lg font-bold text-gray-800 tracking-wide">
        Lịch sử hoạt động
      </span>
    </nav>
  );
}
