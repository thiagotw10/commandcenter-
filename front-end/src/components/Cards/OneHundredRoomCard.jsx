import React from "react";
import { ReactComponent as Drugs } from "../../assets/svg/Drugs.svg";
import { ReactComponent as Xray } from "../../assets/svg/Xray.svg";
import { ReactComponent as Lab } from "../../assets/svg/Lab.svg";

const oneHundredRoomCard = ({ data, alert, drugs, lab, xray, className }) => {
  const [attendance, name, time] = Object.values(data);

  return (
    <div
      style={{ backgroundColor: "#1D2026" }}
      className={`p-2 flex justify-between items-center rounded-lg ${
        alert ? "animate-ping-red" : ""
      } ${className}`}
    >
      <span className="px-4 py-2 bg-gray-400 text-sm text-black font-bold rounded-md">
        {time}
      </span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-gray-400 text-xs">Nome do Paciente</span>
        <p className="text-white text-sm">{name}</p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <span className="text-gray-400 text-xs">Atendimento</span>
          <p className="text-white text-sm">{attendance}</p>
        </div>
        <div className="flex gap-1 justify-between w-22">
          <Drugs className="w-5 h-5" fill={drugs?.color} />
          <div className="flex">
            <Lab
              className={`w-5 h-5 ${lab?.alert ? "animate-ping-red" : ""}`}
              fill={lab?.color}
            />
            <span className="text-gray-300 text-xs">{lab?.text}</span>
          </div>
          <Xray className="w-5 h-5" fill={xray?.color} />
        </div>
      </div>
    </div>
  );
};

export default oneHundredRoomCard;
