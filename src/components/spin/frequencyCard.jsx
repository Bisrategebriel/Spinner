import React from "react";

const FrequencyCard = ({ leftText, rightText, bgColorLeft }) => {
  return (
    <div className="grid grid-cols-8 border-b border-black/60">
      <h3
        className={`col-span-4 text-sm bg-${bgColorLeft} flex items-center justify-center font-semibold text-white px-2 pt-1`}
      >
        {leftText}
      </h3>
      <h2
        className={`col-span-4 bg-blue-600 text-sm text-white flex items-center justify-center pt-1`}
      >
        {rightText}
      </h2>
    </div>
  );
};

export default FrequencyCard;
