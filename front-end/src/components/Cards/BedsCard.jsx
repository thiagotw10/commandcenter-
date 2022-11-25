import React from "react";

const BedsCard = ({ data, className, color, variant, icons }) => {
  return (
    <div
      className={`p-2 flex flex-col items-center justify-center font-bold ${
        variant === "outlined" ? "border-4" : ""
      } ${className}`}
      style={
        variant === "outlined"
          ? { borderColor: color }
          : { backgroundColor: color }
      }
    >
      <span
        style={{
          color: `${
            variant !== "outlined" && color === "#FFFFFF" ? "#000" : "#fff"
          }`,
        }}
      >
        {data && data}
      </span>
      {icons && <div className="flex gap-1">{icons}</div>}
    </div>
  );
};

export default BedsCard;
