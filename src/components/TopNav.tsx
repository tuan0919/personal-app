import image from "/icon.png";
import { AiOutlineMenu } from "react-icons/ai";
import {
  FaUserCircle,
  FaHome,
  FaShoppingBag,
  FaEnvelope,
  FaBell,
  FaCog,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/40 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center justify-between">
      {/* Menu trigger */}
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-pink-100 transition"
            aria-label="Mở menu"
          >
            <AiOutlineMenu className="text-pink-400 text-2xl" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-xs p-0 m-0 border-none bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600 text-white shadow-2xl rounded-r-2xl"
          style={{ minHeight: "100vh" }}
        >
          {/* ✅ Fix cảnh báo bằng cách thêm title ẩn */}
          <DrawerTitle className="sr-only">Menu điều hướng</DrawerTitle>

          <div className="flex flex-col h-full">
            {/* User info */}
            <div className="flex items-center gap-3 px-5 pt-6 pb-4">
              <FaUserCircle className="text-3xl shadow bg-white/40 rounded-full" />
              <div>
                <div className="font-bold text-base leading-tight">
                  Selvy Smith
                </div>
                <div className="text-xs opacity-80">Australia, UK</div>
              </div>
            </div>

            {/* Menu items */}
            <nav className="flex-1 px-3">
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaHome className="text-lg" />
                    <span className="flex-1">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaShoppingBag className="text-lg" />
                    <span className="flex-1">Shop</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaEnvelope className="text-lg" />
                    <span className="flex-1">Messages</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaBell className="text-lg" />
                    <span className="flex-1">Notification</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaCog className="text-lg" />
                    <span className="flex-1">Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaFileAlt className="text-lg" />
                    <span className="flex-1">Pages</span>
                    <span className="ml-2 px-2 py-0.5 bg-white/30 text-xs rounded-full font-semibold">
                      new
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="flex-1">Logout</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Drawer close button */}
            <div className="p-3">
              <DrawerClose asChild>
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl">
                  Đóng menu
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Logo & tên app */}
      <div className="flex items-center gap-2">
        <img src={image} alt="Logo" className="w-8 h-8 rounded-full shadow" />
        <div>
          <span className="font-bold text-md text-gray-800 tracking-wide">
            NƯỚC ĐÁ QUỐC THÁI
          </span>
          <div className="text-[10px] text-gray-500 leading-tight -mt-1">
            Phần mềm quản lý trên điện thoại
          </div>
        </div>
      </div>

      {/* Avatar/Profile icon */}
      <FaUserCircle size={30} className="text-pink-400" />
    </header>
  );
}
