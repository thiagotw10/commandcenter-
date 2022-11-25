import React from "react";

const VerifyInsert = ({ display, component, children, message, className }) => {
  if (!!display) {
    return component || children;
  } else {
    return <p className={`text-center ${className}`}>{message}</p>;
  }
};

export default VerifyInsert;
