import React from "react";

const RectCard = ({ className, color = "#FFF", children, style }) => {
  return (
    <div
      className={`border-l-2 bg-blackCMDC bg-opacity-50 px-2 py-1 rounded-sm ${className}`}
      style={{ borderColor: color, ...style }}
    >
      {children}
    </div>
  );
};

export default RectCard;
