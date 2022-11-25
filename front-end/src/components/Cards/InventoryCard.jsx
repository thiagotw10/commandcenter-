import React from "react";
import { RectCard } from "../";

const InventoryCard = ({ color = "#FFF", data, className }) => {
  const values = data ? Object.values(data) : [];
  const [code, item, quantity] = values;

  return (
    <RectCard
      color={color}
      className={`flex flex-col px-2 py-1 ${className}`}
      style={{ backgroundColor: "#12151D" }}
    >
      <p className="text-gray-400 text-xsm">
        Código: <span style={{ color }}>{code ? code : ""}</span>
      </p>
      <p className="text-xsm" style={{ color }}>
        {item ? item : ""}
      </p>
      <p className="text-gray-400 text-xsm" style={{ color }}>
        QTD - Itens:{" "}
        <span className="text-white">{quantity ? quantity : 0}</span>
      </p>
    </RectCard>
  );
};

export default InventoryCard;
