import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import { ToolTip } from "../";
import useUtilities from "../../service/useUtilities";

function LineGraphic({
  data,
  value,
  className,
  config,
  xKey,
  title,
  chartPosition,
  legendPosition,
  legendLayout = "vertical",
  toolTipConfig,
  animation = true,
}) {
  const { getFontSize } = useUtilities();
  const [tooltip, setToolTip] = React.useState(false);

  function getLimit(array) {
    if (!!array) {
      const values = array.map((value) => Object.values(value));
      const flatValues = values.reduce((acc, sub) => acc.concat(sub), []);
      const filtered = flatValues.filter((value) => typeof value === "number");
      return Math.max(...filtered) + 5;
    } else {
      return 0;
    }
  }

  const lines = config.map((value) => {
    return (
      <Line
        key={value.key}
        dataKey={value.key}
        strokeWidth=".15rem"
        type="monotone"
        stroke={value.color}
        label={{ fill: "#fff", position: "top", fontSize: ".55rem" }}
        dot={{ strokeWidth: "0.3rem", r: 0.1 * getFontSize() }}
        isAnimationActive={animation}
      />
    );
  });

  return (
    <div
      className={`bg-blackCMDC rounded-lg flex flex-col px-2 pt-2 ${className}`}
    >
      <h2 className="font-semibold text-white relative">
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
      {value && (
        <span className="text-center font-semibold text-white text-xl">
          <CountUp end={value} duration={1} />
        </span>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={data || []}
          margin={chartPosition || {}}
        >
          <CartesianGrid
            stroke="#233767"
            strokeDasharray="2"
            vertical={false}
          />
          <XAxis
            dataKey={xKey || ""}
            tick={{ fontSize: ".5rem", fill: "white" }}
            interval={0}
          />
          <YAxis
            domain={[0, getLimit(data)]}
            interval={0}
            tickCount={5}
            tick={{ fontSize: ".6rem", fill: "white" }}
          />
          {lines}
          <Legend
            layout={legendLayout}
            payload={config.map((value) => ({
              type: value.icon || "square",
              value: (
                <span className="font-Montserrat text-xsm text-white ml-1 text-center">
                  {value.title}
                </span>
              ),
              color: `${value.color}`,
            }))}
            verticalAlign="top"
            iconSize=".5rem"
            align="right"
            wrapperStyle={legendPosition || {}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraphic;
