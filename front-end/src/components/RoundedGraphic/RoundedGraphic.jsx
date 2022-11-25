import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import useUtilities from "../../service/useUtilities";
import CountUp from "react-countup";
import { ToolTip } from "../";

function RoundedGraphic({
  data,
  title,
  exibition,
  className,
  titleClass,
  barSize,
  rounded,
  graphicClass,
  toolTipConfig,
}) {
  const [dataChart, setDataChart] = React.useState([]);
  const { getFontSize } = useUtilities();
  const [tooltip, setToolTip] = React.useState(false);

  const calcPercent = ({ dataOne, dataTwo }) => {
    let result = (dataOne / dataTwo) * 100;
    result = result < 0 ? 0 : result;
    return Math.round(result);
  };

  React.useEffect(() => {
    if (data) {
      if (typeof data === "number") {
        setDataChart([{ percent: data }]);
      } else {
        let percent = calcPercent(data);
        setDataChart([{ percent }]);
      }
    }
  }, [data]);

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
        className={`m-auto relative flex justify-center items-center ${graphicClass}`}
      >
        <ResponsiveContainer width="100%" heigth="100%">
          <RadialBarChart
            data={dataChart}
            cx="50%"
            cy="50%"
            innerRadius="90%"
            outerRadius="120%"
            startAngle={0}
          >
            <RadialBar
              barSize={barSize ? barSize * getFontSize() : 0.5 * getFontSize()}
              fill={
                rounded?.type === "gradient"
                  ? `url(#${rounded?.id || "gdr"})`
                  : rounded?.color || "#fff"
              }
              background={{ fill: "#151A20" }}
              dataKey="percent"
              angleAxisId={0}
              cornerRadius={50}
            />
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
              angleAxisId={0}
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
        <div className="w-full h-full absolute flex justify-center items-center">
          <span className="text-white text-2xl font-bold">
            <CountUp
              end={dataChart[0] ? dataChart[0].percent : 0}
              duration={1}
            />
            %
          </span>
        </div>
      </div>
      {exibition && (
        <div className="flex flex-row justify-between items-center text-white">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">{data ? data.dataOne : 0}</span>
            <span className="text-xs">{exibition.titleOne}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-sm">{data ? data.dataTwo : 0}</span>
            <span className="text-xs">{exibition.titleTwo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoundedGraphic;
