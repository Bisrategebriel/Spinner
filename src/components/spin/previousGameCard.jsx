import React from "react";

const CustomCard = ({ leftText, rightText, bgColorLeft, bgColorRight }) => {
  return (
    <div className="grid grid-cols-7 border-b h-6  border-black/60">
      <h3 className="col-span-4 px-2 text-[14px] font-semibold text-white bg-gray-900/80 ">
        {leftText}
      </h3>
      <h2
        className={`col-span-2 bg-${bgColorLeft} text-white flex items-center justify-center`}
      >
        {rightText}
      </h2>
      <div className={`col-span-1 bg-${bgColorRight}`}> </div>
    </div>
  );
};

export default CustomCard;
