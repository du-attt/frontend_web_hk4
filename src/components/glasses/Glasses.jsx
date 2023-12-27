import React from "react";
import { useState } from "react";
const Glasses = ({onSelectedColor}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const handleClick = (color) => {
    setSelectedColor(color);
  };
  return (
    <div className="flex flex-col bg-white/[0.7] justify-center items-center right-0 left-0 px-2 h-300 w-400 p-5">
        <p className="text-lg font-semibold">Chọn màu gọng</p>
        <hr className="w-full "/>
        <section className="p-7 select-none">
          <span className={`p-1 m-1 w-4 hover:bg-blue-300 cursor-pointer rounded-lg border border-black ${selectedColor === "bg-blue-300" ? selectedColor : ""}`}
          onClick={() => {handleClick("bg-blue-300") ; onSelectedColor("Xanh")}}>Xanh</span>
          <span className={`p-1 m-1 w-4 hover:bg-yellow-300 cursor-pointer rounded-lg border border-black ${selectedColor === "bg-yellow-300" ? selectedColor : ""}`}
          onClick={() => {handleClick("bg-yellow-300") ; onSelectedColor("Vàng")}}>Vàng</span>
          <span className={`p-1 m-1 w-4 hover:bg-blue-100 cursor-pointer rounded-lg border border-black ${selectedColor === "bg-blue-100" ? selectedColor : ""}`}
          onClick={() => {handleClick("bg-blue-100") ; onSelectedColor("Trắng")}}>Trắng</span>
          <span className={`p-1 m-1 w-4 hover:bg-pink-300 cursor-pointer rounded-lg border border-black ${selectedColor === "bg-pink-300" ? selectedColor : ""}`}
          onClick={() => {handleClick("bg-pink-300") ; onSelectedColor("Hồng")}}>Hồng</span>
          <span className={`p-1 m-1 w-4 hover:bg-gray-700 hover:text-white cursor-pointer rounded-lg border border-black ${selectedColor === "bg-gray-300" ? selectedColor : ""}`}
          onClick={() => {handleClick("bg-gray-300") ; onSelectedColor("Đen")}}>Đen</span>
        </section>
        {selectedColor === "" ? (
        <p className="text-red-500">Vui lòng chọn màu</p>
        ):null}
    </div>
  );
};

export default Glasses;
