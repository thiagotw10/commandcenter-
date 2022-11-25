import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, LabelList } from "recharts";
import CountUp from "react-countup";

const PieGraphic = ({
  data,
  planExibition,
  value,
  title,
  className,
  titleClass,
  graphicClass,
  span,
  config,
  dataKey,
  exibition,
}) => {

  const cell =
    config &&
    config.cell?.map((cell, i) => {
      return (
        <Cell
          key={cell.key + "-" + i}
          stroke="false"
          fill={cell.fill || "#FFF"}
        />
      );
    });

  return (
    <div
      className={`bg-blackCMDC rounded-lg flex flex-col relative p-2 ${className}`}
    >
      <h2
        className={`text-center text-white relative ${
          titleClass || "text-xs font-semibold"
        }`}
      >
        <span>{title}</span>
      </h2>
      <span className="text-red-500 text-sm mx-auto bg-blackCMDC rounded-lg px-2">
        {span}
      </span>
      <div
        className={`m-auto relative flex justify-center items-center ${graphicClass}`}
      >
        <ResponsiveContainer width="100%" heigth="100%">
          <PieChart
            width="100%"
            heigth="100%"
          >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="95%"
              paddingAngle={5}
              dataKey={dataKey}
              labelLine={false}
              isAnimationActive={false}
            >
              <LabelList dataKey={dataKey} fontSize="0.82rem" fontWeight="bold" fill="#FFF" formatter={value => value + "%"} position="inside"/>
              {cell}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="w-full h-full absolute flex justify-center items-center">
          <span className="text-white font-bold">
            <CountUp end={value} duration={1} />
          </span>
        </div>
      </div>
      {exibition && (
        <div className="flex flex-row justify-between items-center text-white -mt-2">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">{planExibition ? planExibition.dataOne : 0}</span>
            <span className="text-xs text-left" style={{color: planExibition.colorOne}}>{exibition.titleOne}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">{planExibition ? planExibition.dataTwo : 0}</span>
            <span className="text-xs" style={{color: planExibition.colorTwo}}>{exibition.titleTwo}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieGraphic;
