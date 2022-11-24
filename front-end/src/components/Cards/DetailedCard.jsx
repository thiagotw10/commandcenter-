import React from "react";

const DetailedCard = ({ titles, data, color = "#FFF", className }) => {
  const [value, percent] = data ? Object.values(data) : [0, 0];

  return (
    <div
      className={`flex flex-col justify-between items-center p-2 rounded-lg bg-blackCMDC shadow-inner-2 relative ${className}`}
    >
      <h1 className="text-white text-xslg text-center">
        {titles && titles[0]}
      </h1>
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="text-xl font-semibold" style={{ color }}>
          {value}
        </span>
        <span className="text-xslg font-bold text-gray-300">
          {titles && titles[1]}
        </span>
      </div>
      <span
        className="absolute bottom-1 right-2 text-xsm rounded-lg border px-2 py-1"
        style={{ color, borderColor: color }}
      >
        {percent}
      </span>
    </div>
  );
};

export default DetailedCard;
