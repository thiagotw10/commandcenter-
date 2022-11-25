import React from "react";
import { ReactComponent as Arrow } from "../../assets/svg/Arrow.svg";

const VariationMonthCard = ({
  currentSector,
  previousSector,
  currentMonth,
  previousMonth,
  currentArrow,
  previousArrow,
  quantity,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-2 border border-green-300 rounded-lg py-2 px-1 ${className}`}
      style={{ backgroundColor: "#0A101F" }}
    >
      <div className="flex flex-col gap-1 items-center">
        <span className="text-xs text-white font-semibold">Mês Atual</span>
        <div className="relative">
          <div
            className={`bg-gray-450 flex justify-around w-50 border rounded-full py-2 ${
              currentArrow ? "border-red-500" : "border-green-400"
            }`}
          >
            <span className="text-xs text-white">{currentSector}</span>
            <p className="text-xs text-gray-400">
              Solic: <span className="text-white">{currentMonth}</span>
            </p>
          </div>
          {currentArrow && (
            <Arrow className="w-4 h-4 animate-bounce absolute top-2 -right-6" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="text-xs text-white font-semibold">Mês Anterior</span>
        <div className="relative">
          <div
            className={`bg-gray-450 flex justify-around w-50 border rounded-full py-2 ${
              previousArrow ? "border-red-500" : "border-green-400"
            }`}
          >
            <span className="text-xs text-white">{previousSector}</span>
            <p className="text-xs text-gray-400">
              Solic: <span className="text-white">{previousMonth}</span>
            </p>
          </div>
          {previousArrow && (
            <Arrow className="w-4 h-4 animate-bounce absolute top-2 -right-6" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-28 bg-green-600 bg-opacity-20 rounded-full">
        <span className="text-green-300 text-xs">MÉDIA</span>
        <span className="text-white text-xs">{quantity}</span>
      </div>
    </div>
  );
};

export default VariationMonthCard;
