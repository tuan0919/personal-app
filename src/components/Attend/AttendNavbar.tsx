import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AttendNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-primary flex z-50 items-center justify-center px-3">
        <FaArrowLeft
          size={28}
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex gap-2">
          <h1 className="text-2xl font-semibold">Thêm thông tin giao hàng</h1>
        </div>
      </nav>
    </>
  );
}
