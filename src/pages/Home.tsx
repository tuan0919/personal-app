import BottomNav from "@/components/BottomNav";
import { CalendarChooser } from "@/components/Home/CalendarChooser";
import TopNav from "@/components/TopNav";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <TopNav />
      <div className="h-16"></div>
      <div className="flex flex-col py-16 px-10 gap-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium">Ngày hôm nay</span>
            <span>27/06/2025</span>
          </div>
          <CalendarChooser />
        </div>
        <div className="bg-primary shadow-md rounded overflow-hidden">
          {/* header */}
          <div className=" text-white text-xl bg-[#625afa] p-3 shadow-md">
            Thông tin giao đá trong ngày
          </div>
          <div className="flex flex-col gap-5 max-h-[15rem] overflow-scroll p-2">
            {Array.of("A", "B", "C", "D", "E", "F", "G").map((v) => (
              <div className="flex gap-5">
                {/* Thông tin sơ bộ người nhận */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[3rem] rounded-sm overflow-hidden">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                      alt=""
                      width={"100%"}
                    />
                  </div>
                  <div className="font-semibold">Nguyễn văn {v}</div>
                </div>
                {/* Thông tin sơ bộ người giao */}
                <div className="">
                  <div className="flex gap-1 items-center">
                    <FaTruckFast className="text-green-800" />:
                    <span className="font-semibold text-green-800">
                      Tuấn nguyễn
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <IoMdTime className="text-yellow-800" />:
                    <span className=" text-yellow-800">14:52:40</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <MdOutlineUpdate className="text-red-800" />:
                    <span className=" text-red-800">14:52:51</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <FaPeopleCarryBox className="text-blue-800" />:
                    <span className=" text-blue-800">20 đá cây</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-5 text-xl font-semibold">Tổng cộng</div>
          <div className="flex justify-around mt-5">
            <div className="flex flex-col justify-center items-center rounded-full border-4 w-24 h-24 border-blue-700">
              <span className="font-black text-3xl text-blue-700">100</span>
              <span className="font-semibold text-blue-700">Đá cây</span>
            </div>

            <div className="flex flex-col justify-center items-center rounded-full border-4 w-24 h-24 border-blue-700">
              <span className="font-black text-3xl text-blue-700">11</span>
              <span className="font-semibold text-blue-700">Khách</span>
            </div>
          </div>
        </div>
        <Link to={"/attend"}>
          <div className="bg-[#625afa] p-5 flex items-center gap-10 rounded shadow-md">
            <TbTruckDelivery size={"5rem"} color="white" />
            <div className="">
              <div className="font-semibold text-xl text-white">
                Giao hàng hôm nay
              </div>
              <div className="text-white">
                Cập nhật thông tin giao đá ngày hôm nay
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="h-16"></div>
      <BottomNav />
    </div>
  );
}
