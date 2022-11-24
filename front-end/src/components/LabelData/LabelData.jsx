import React from "react";

const LabelData = ({ label, data, className }) => {
  return (
    <p className={`${className}`}>
      {label || ""}: <span className="font-bold">{data || 0}</span>
    </p>
  );
};

export default LabelData;
