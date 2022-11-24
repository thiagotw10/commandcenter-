import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import useUtilities from "../../service/useUtilities";
import CountUp from "react-countup";
import { ToolTip } from "../";

function RoundedCard({
  data,
  title,
  className,
  titleClass,
  roundedClass,
  toolTipConfig,
  rounded,
  barSize,
  span,
  iconOne = null,
  iconTwo = null,
  iconThree = null,
  totalValue = "",
  exibition,
  valueExibition,
}) {
  const [tooltip, setToolTip] = React.useState(false);
  const { getFontSize } = useUtilities();

  return (
    <div className={`bg-blackCMDC rounded-lg flex flex-col p-2 ${className}`}>
      <h2
        className={`text-center text-white relative ${
          titleClass || "text-xs font-semibold"
        }`}
        onMouseOver={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
      >
        {title}
        <ToolTip
          title={toolTipConfig && toolTipConfig.title}
          display={toolTipConfig && tooltip}
          desc={toolTipConfig && toolTipConfig.desc}
          type={toolTipConfig && toolTipConfig.type}
        />
      </h2>
      <span className="text-red-500 text-sm mx-auto bg-blackCMDC rounded-lg px-2">{span}</span>
      <div
        className={`m-auto relative flex justify-center items-center ${roundedClass}`}
      >
        <ResponsiveContainer width="100%" heigth="100%">
          <RadialBarChart
            data={[{ data }]}
            cx="50%"
            cy="50%"
            innerRadius="90%"
            outerRadius="120%"
            startAngle={0}
          >
            <RadialBar
              barSize={barSize ? barSize * getFontSize() : 0.5 * getFontSize()}
              fill={
                rounded.type === "gradient"
                  ? `url(#${rounded.id || "gdr"})`
                  : rounded.color || "#fff"
              }
              background={{ fill: "#151A20" }}
              dataKey="data"
              cornerRadius={50}
            />
            <defs>
              <linearGradient
                id={rounded.id || "gdr"}
                x1="0"
                y1="0"
                x2="0"
                y2=".5"
              >
                <stop offset="5%" stopColor="#3d3d3f" stopOpacity={0} />
                <stop
                  offset="95%"
                  stopColor={rounded.color || "#fff"}
                  stopOpacity={0.7}
                />
              </linearGradient>
            </defs>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="w-full h-full absolute flex flex-col gap-1 justify-center items-center">
          {iconOne}
          <span className="text-white font-bold">
            <CountUp end={data} duration={1} />
          </span>
          <span style={{ color: "#D8D8D8" }} className="font-semibold text-xs">
            {totalValue}
          </span>
        </div>
      </div>
      {exibition && (
        <div className="flex flex-row justify-between items-center text-white">
          <div className="flex flex-col justify-center items-center">
            <span className="flex gap-1 font-bold text-xs">
              {iconTwo}
              {valueExibition ? valueExibition.dataOne : 0}
            </span>
            <span className="text-xsm">{exibition.titleOne}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="flex gap-1 font-bold text-xs">
              {iconThree}
              {valueExibition ? valueExibition.dataTwo : 0}
            </span>
            <span className="text-xsm">{exibition.titleTwo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoundedCard;
