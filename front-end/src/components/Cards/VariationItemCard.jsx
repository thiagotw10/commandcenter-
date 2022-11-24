import React from "react";
import { RoundedCard } from "../";
import { ReactComponent as Date } from "../../assets/svg/Date.svg";

const VariationItemCard = ({
  data,
  number,
  top,
  color = "#FFF",
  className,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 border border-green-300 rounded-lg px-2 py-1 ${className}`}
      style={{ backgroundColor: "#0A101F" }}
    >
      <div className="flex justify-between items-center">
        <RoundedCard
          data={number}
          className="w-16 h-16 bg-opacity-0"
          roundedClass="w-16 h-16 text-xl"
          barSize={0.3}
          rounded={{ color }}
        />
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center">
            <Date className="w-5 h-5" />
            <span className="text-green-400 text-xs font-semibold">
              {data.lastRequests}
            </span>
          </div>
          <p className="text-xs text-gray-400">Últimos pedidos</p>
        </div>
      </div>
      <p className="text-xs text-white">{data.item}</p>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400 flex flex-col">
          <span>Quantitativo: </span>
          <span className="text-white">{data.quantity}</span>
        </div>
        <div className="flex justify-center items-center py-2 w-28 bg-green-600 bg-opacity-20 rounded-full">
          <span className="text-green-300 text-xs">{top}</span>
        </div>
      </div>
    </div>
  );
};

export default VariationItemCard;
