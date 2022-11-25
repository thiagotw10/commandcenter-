import React from "react";
import { RectCard } from "../";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import { ReactComponent as Calendar } from "../../assets/svg/Calendar.svg";

const AttendanceCard = ({ color = "#FFF", data, className, icon }) => {
  const values = data ? Object.values(data) : [];
  const [cdSolic, dtSolic, apartment, patient, birthDate, item] = values;

  return (
    <RectCard color={color} className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex justify-between items-center text-gray-400 text-xsm">
        <span>Atendimento: {cdSolic ? cdSolic : ""}</span>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{dtSolic ? dtSolic : ""}</span>
        </div>
      </div>
      <div
        className="flex justify-between items-center text-xsm"
        style={{ color }}
      >
        <span>{apartment ? apartment : ""}</span>
        {icon ? (
          <div className="flex justify-between items-center gap-1">
            {icon}
            <span style={{ color: "#FFC" }}>{item ? item : ""}</span>
          </div>
        ) : (
          <span>
            Solic: <span className="text-white">{item ? item : ""}</span>
          </span>
        )}
      </div>
      <div className="flex justify-between items-center" style={{ color }}>
        <span className="text-xsm">{patient ? patient : ""}</span>
        <div className="flex items-center gap-1">
          <Birthday className="w-3 h-3" />
          <span className="text-gray-400 text-xsm">
            {birthDate ? birthDate : ""}
          </span>
        </div>
      </div>
    </RectCard>
  );
};

export default AttendanceCard;
