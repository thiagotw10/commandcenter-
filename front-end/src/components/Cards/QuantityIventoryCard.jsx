import React from "react";
import { RectCard } from "../";
import CountUp from "react-countup";

const QuantityInventoryCard = ({ color = "#FFF", letter, data, className }) => {
  return (
    <RectCard
      color={color}
      className={`flex items-center gap-2 ${className}`}
      style={{ backgroundColor: "#12151D" }}
    >
      <div
        className="border-r-2 h-3/4 flex justify-center items-center pr-2"
        style={{ borderColor: color }}
      >
        <span className="text-xl" style={{ color }}>
          {letter}
        </span>
      </div>
      <div
        className="flex items-center justify-center flex-1"
        style={{ borderColor: color }}
      >
        {data?.map((number, index) => (
          <>
            <span
              className={`text-sm border-white px-2 ${
                index === data.length - 1 ? "" : "border-r-2"
              }`}
              style={{ color: number.color || "#fff" }}
            >
              <CountUp end={number.value} duration={1} />
            </span>
          </>
        ))}
      </div>
    </RectCard>
  );
};

export default QuantityInventoryCard;
