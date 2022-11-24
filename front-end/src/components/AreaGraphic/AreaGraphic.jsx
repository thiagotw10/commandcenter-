import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Legend,
} from "recharts";
import useUtilities from "../../service/useUtilities";
import { ToolTip } from "../";

function AreaGraphic({
  data,
  totalValue,
  className,
  config,
  xKey,
  title,
  icon,
  chartPosition,
  legendPosition,
  toolTipConfig,
}) {
  const { getFontSize } = useUtilities();
  const [tooltip, setToolTip] = React.useState(false);

  function getLimit(array) {
    if (!!array) {
      const values = array.map((value) => Object.values(value));
      const flatValues = values.reduce((acc, sub) => acc.concat(sub), []);
      const filtered = flatValues.filter((value) => typeof value === "number");
      return Math.max(...filtered);
    } else {
      return 0;
    }
  }

  const areas =
    config &&
    config.areas?.map((value, index) => {
      return (
        <Area
          isAnimationActive={false}
          key={value.key + "-" + index}
          type="monotone"
          dataKey={value.key}
          stroke={`url(#line-${value.key})`}
          strokeWidth="0.2rem"
          fill={`url(#bg-${value.key})`}
          label={{ fill: "#fff", position: "top", fontSize: ".7rem" }}
          dot={{ strokeWidth: "0.3rem", r: 0.1 * getFontSize() }}
        />
      );
    });

  const gradients =
    config &&
    config.areas?.map((value, i) => {
      return (
        <defs key={value.key + "_" + i}>
          <linearGradient id={`bg-${value.key}`} x1="1" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={value.bgGradient.to}
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor={value.bgGradient.from}
              stopOpacity={0.05}
            />
          </linearGradient>
          <linearGradient id={`line-${value.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={value.lineGradient.to}
              stopOpacity={0.9}
            />
            <stop
              offset="95%"
              stopColor={value.lineGradient.from}
              stopOpacity={0.5}
            />
          </linearGradient>
        </defs>
      );
    });

  return (
    <div
      className={`bg-blackCMDC rounded-lg flex flex-col relative ${className}`}
    >
      <h2
        className={`text-xs font-semibold text-white mt-2 ml-2 flex ${
          icon ? "justify-between" : "justify-center"
        } items-center relative`}
      >
        <span
          className="z-10"
          onMouseOver={() => setToolTip(true)}
          onMouseLeave={() => setToolTip(false)}
        >
          {title}
        </span>
        {icon && icon}
        <ToolTip
          title={toolTipConfig && toolTipConfig.title}
          display={toolTipConfig && tooltip}
          desc={toolTipConfig && toolTipConfig.desc}
        />
      </h2>
      {totalValue && (
        <p className="text-white font-bold text-2xl text-center flex justify-center">
          {totalValue}
        </p>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={chartPosition || {}}>
          {gradients}
          {areas}
          <YAxis opacity={0} domain={[0, getLimit(data)]} />
          <XAxis
            dataKey={xKey || ""}
            tick={{ fontSize: ".6rem", fill: "white" }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          {config.legends && (
            <Legend
              iconType="square"
              payload={config.legends.map((legend) => ({
                type: "square",
                value: (
                  <span className="text-xsm font-Montserrat text-white">
                    {legend.title}
                  </span>
                ),
                color: legend.color,
              }))}
              layout="horizontal"
              verticalAlign="top"
              align="right"
              iconSize=".5rem"
              wrapperStyle={legendPosition || {}}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaGraphic;
