import React from "react";
import { RectCard } from "../../components";
import { ReactComponent as Clock } from "../../assets/svg/Clock.svg";

const InternationCard = ({
  hours,
  name,
  outherName,
  bed,
  birthDate,
  color,
  iconOne,
  iconTwo,
}) => {
  return (
    <RectCard
      color={color}
      className="flex items-center gap-2 p-0 bg-opacity-100"
      style={{ backgroundColor: "#070B15" }}
    >
      {iconOne ? (
        iconOne
      ) : (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" fill="#fff" />
          <div className="flex flex-col items-center">
            {hours?.map((hour) => (
              <span className="text-white text-xsm">{hour}</span>
            ))}
          </div>
        </div>
      )}
      <RectCard color={color} className="flex flex-col w-full">
        {outherName && (
          <span className="text-xsm text-gray-400">
            N.S <span className="text-xslg text-white">{outherName}</span>
          </span>
        )}
        <span className="text-xslg" style={{ color }}>
          {name}
        </span>
        <div className="flex justify-between">
          <span className="text-white text-xslg">{bed}</span>
          <div className="flex gap-1 items-center">
            {iconTwo}
            <span className="text-white text-xslg">{birthDate}</span>
          </div>
        </div>
      </RectCard>
    </RectCard>
  );
};

export default InternationCard;
