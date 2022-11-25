import React from "react";
import RectCard from "./RectCard";

function SolicitedItemsCard({ color = "#FFF", data, className, cardClass }) {
  const values = data ? Object.values(data) : [];
  const [cdProduct, rank, describe, itemsRequested] = values;
  return (
    <RectCard color={color} className={`flex flex-col gap-0.5 ${className}`}>
      <div
        style={{ color: color }}
        className={`flex ${cardClass} relative text-xs`}
      >
        <span>
          <span className="text-gray-400">Código: </span>
          {cdProduct}
        </span>
        <span className="absolute right-1">TOP {rank}</span>
      </div>
      <div className={`flex flex-col text-xs ${cardClass}`} style={{ color }}>
        <span>{describe}</span>
        <span>
          QTD - Solic: <span className="text-white">{itemsRequested}</span>
        </span>
      </div>
    </RectCard>
  );
}

export default SolicitedItemsCard;
