import React from "react";
import { ReactComponent as Warning } from "../../assets/svg/Error.svg";

function Error({ message }) {
  return (
    <div className="py-3 px-5 flex justify-center items-center rounded-lg bg-blackCMDC absolute bottom-2 left-14 gap-1 animate-left">
      <Warning className="w-5 h-5" />
      <p className="text-base font-semibold text-red-300">{message}</p>
    </div>
  );
}

export default Error;
