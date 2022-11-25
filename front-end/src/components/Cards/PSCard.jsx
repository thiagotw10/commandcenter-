import React from "react";
import { RectCard } from "../";
import { ReactComponent as Birthday } from "../../assets/svg/Birthday.svg";
import { ReactComponent as Diet } from "../../assets/svg/Diet.svg";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";
import { ReactComponent as Check } from "../../assets/svg/Check.svg";
import { ReactComponent as LabExam } from "../../assets/svg/LabExam.svg";
import { ReactComponent as Skeleton } from "../../assets/svg/Skeleton.svg";

const PSCard = ({ color, data, className, labIcon, rxIcon, checkIcon }) => {
  const values = data ? Object.values(data) : [];
  const [
    apartment,
    weight,
    yearOld,
    patient,
    illness,
    time,
    allergy,
    birthDate,
    diet,
    unit,
  ] = values;

  return (
    <RectCard
      color={color ? color : "#fff"}
      className={`flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center text-gray-400 text-xslg">
        <span>{apartment ? apartment : ""}</span>
        <span>
          Peso: <span>{weight ? weight : ""}</span>
        </span>
      </div>
      <div
        className="flex justify-between items-center text-xslg"
        style={{ color: color ? color : "#fff" }}
      >
        <div className="flex gap-1 items-center">
          <span className="text-sm">{patient ? patient : ""}</span>
          {checkIcon.display && (
            <Check className="w-3 h-3" fill={checkIcon.color} />
          )}
          {labIcon?.display && (
            <LabExam className="w-3 h-3" fill={labIcon.color} />
          )}
          {rxIcon?.display && (
            <Skeleton className="w-3 h-3" fill={rxIcon.color} />
          )}
        </div>
        <span className="text-gray-300 text-xs">
          Idade: <span>{yearOld}</span>
        </span>
      </div>
      <span className="text-gray-400 text-xslg">HD / ANAMNESE</span>
      <div className="flex justify-between items-center">
        <span className="text-xslg text-gray-400">
          {illness ? illness : ""}
        </span>
        <div className="flex gap-1 items-center">
          <Clock className="w-3 h-3" fill="#FFF" />
          <span className="text-xslg text-white">{time}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xsm text-white">
          ALERGIA: <span className="text-red-500 text-xslg">{allergy}</span>
        </span>
        <div className="flex items-center gap-1">
          <Birthday className="w-3 h-3" />
          <span className="text-gray-400 text-xslg">
            {birthDate ? birthDate : ""}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Diet className="w-3 h-3" />
          <span className="text-gray-400 text-xslg">{diet ? diet : ""}</span>
        </div>
        <span className="text-xsm text-gray-400">
          ACOMOD: <span className="text-white text-xslg">{unit}</span>
        </span>
      </div>
    </RectCard>
  );
};

export default PSCard;
