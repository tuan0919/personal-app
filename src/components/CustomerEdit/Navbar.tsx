import { FiUser, FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSave?: () => void;
  isSubmitting?: boolean;
}

export const Navbar = ({ onSave, isSubmitting }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Quay lại"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-blue-100 transition"
        >
          <FiArrowLeft className="text-blue-500 text-xl" />
        </button>
        <FiUser className="text-blue-500 text-2xl" />
        <span className="text-lg font-bold text-gray-800 tracking-wide">
          Chỉnh sửa Khách hàng
        </span>
      </div>

      {onSave && (
        <button
          type="button"
          aria-label="Lưu"
          onClick={onSave}
          disabled={isSubmitting}
          className={`p-2 rounded-full transition ${
            isSubmitting ? "bg-gray-200" : "hover:bg-green-100 bg-green-50"
          }`}
        >
          <FiSave
            className={`text-xl ${
              isSubmitting ? "text-gray-500" : "text-green-500"
            }`}
          />
        </button>
      )}
    </nav>
  );
};
