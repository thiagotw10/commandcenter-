import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useUtilities from "../../service/useUtilities";
import CountUp from "react-countup";
import { ToolTip } from "../";

function MultipleRoundedGraphic({
  data,
  title,
  titleValues,
  exibition,
  className,
  titleClass,
  barSize,
  gradients,
  config,
  graphicClass,
  toolTipConfig,
}) {
  const { getFontSize } = useUtilities();
  const [tooltip, setToolTip] = React.useState(false);

  function sumTot(array) {
    const result = !array
      ? 0
      : array.reduce((acc, current) => {
          return acc + current;
        }, 0);

    return result;
  }

  const gradient = gradients?.map((gradient) => {
    return (
      <defs key={gradient.id}>
        <linearGradient
          id={gradient.id || ""}
          x1="0"
          y1={gradient.y1 || 0}
          x2="0"
          y2={gradient.y2 || 0}
        >
          <stop
            offset="5%"
            stopColor={gradient.to || "#151A20"}
            stopOpacity={0}
          />
          <stop
            offset="95%"
            stopColor={gradient.from || "#fff"}
            stopOpacity={0.7}
          />
        </linearGradient>
      </defs>
    );
  });

  return (
    <div className={`bg-blackCMDC rounded-lg flex flex-col p-2 ${className}`}>
      <h2
        className={`text-center text-white relative ${
          titleClass || "text-xs font-semibold"
        }`}
      >
        <span
          onMouseOver={() => setToolTip(true)}
          onMouseLeave={() => setToolTip(false)}
        >
          {title}
        </span>
        <ToolTip
          title={toolTipConfig && toolTipConfig.title}
          display={toolTipConfig && tooltip}
          desc={toolTipConfig && toolTipConfig.desc}
        />
      </h2>
      <div
        className={`m-auto relative flex flex-col justify-center items-center ${graphicClass}`}
      >
        <ResponsiveContainer width="90%" heigth="90%">
          <RadialBarChart
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="130%"
            startAngle={0}
          >
            {gradient}
            <RadialBar
              barSize={barSize ? barSize * getFontSize() : 0.5 * getFontSize()}
              background={{ fill: "#151A20" }}
              dataKey={config?.key}
              label={{ fill: "#fff", position: "top", fontSize: ".7rem" }}
              isAnimationActive={false}
              cornerRadius={50}
            >
              <LabelList
                dataKey={config?.label}
                fill="#fff"
                fontSize=".6rem"
                position="end"
              />
            </RadialBar>
            );
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="w-full h-full absolute flex justify-center items-center">
          <span className="text-white text-2xl font-bold">
            <CountUp end={sumTot(titleValues)} duration={1} />
          </span>
        </div>
      </div>
      {exibition && (
        <div className="flex flex-row justify-between items-center text-white">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">
              {titleValues ? titleValues[0] : 0}
            </span>
            <span className="text-xs">{exibition.titleOne}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">
              {titleValues ? titleValues[1] : 0}
            </span>
            <span className="text-xs">{exibition.titleTwo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultipleRoundedGraphic;
