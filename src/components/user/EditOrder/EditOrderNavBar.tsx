import { FaIceCream } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function EditOrderNavBar() {
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
      <FaIceCream className="text-pink-400 text-2xl" />
      <span className="text-lg font-bold text-gray-800 tracking-wide">
        Chỉnh sửa đơn hàng
      </span>
    </nav>
  );
}
