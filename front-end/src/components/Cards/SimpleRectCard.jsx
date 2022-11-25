import React from "react";
import CountUp from "react-countup";
import { RectCard } from "../";

const SimpleRectCard = ({
  data,
  title,
  exibition,
  color,
  dataClass,
  className,
  style,
}) => {
  return (
    <RectCard
      color={color}
      className={`flex flex-col items-center justify-center ${className}`}
      style={style}
    >
      <span className="text-lg text-white">{title}</span>
      <span className={`text-white font-bold ${dataClass}`}>
        {typeof data === "string" ? data : <CountUp end={data} duration={1} />}
      </span>
      {exibition && (
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-xs">
              {exibition.dataOne}
            </span>
            <span className="text-white text-xs">
              {exibition.titleOne || ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-xs">
              {exibition.dataTwo}
            </span>
            <span className="text-white text-xs">
              {exibition.titleTwo || ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-xs">
              {exibition.dataThree}
            </span>
            <span className="text-white text-xs">
              {exibition.titleThree || ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-xs">
              {exibition.dataFour}
            </span>
            <span className="text-white text-xs">
              {exibition.titleFour || ""}
            </span>
          </div>
        </div>
      )}
    </RectCard>
  );
};

export default SimpleRectCard;
