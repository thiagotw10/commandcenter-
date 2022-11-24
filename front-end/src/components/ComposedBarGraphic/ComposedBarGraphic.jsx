import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  LabelList,
} from "recharts";
import useUtilities from "../../service/useUtilities";
import { ToolTip } from "../";

function ComposedBarGraphic({ data, className, config, title, toolTipConfig }) {
  const { getFontSize, getLimit } = useUtilities();
  const [tooltip, setToolTip] = React.useState(false);

  const bar = config?.bars.map((bar, i) => {
    return (
      <Bar
        key={bar.key}
        dataKey={bar.key}
        stackId="stack"
        fill={`url(${bar.key === "agendado" ? "#colorOne" : "#colorTwo"})`}
        radius={0.3 * getFontSize()}
        maxBarSize={3.5 * getFontSize()}
      >
        <LabelList
          dataKey={bar.key}
          position="center"
          fill="#fff"
          fontSize=".5rem"
        />
      </Bar>
    );
  });

  const lines = config.lines.map((line) => {
    return (
      <Line
        key={line.key}
        dataKey={line.key}
        strokeWidth=".15rem"
        type="monotone"
        stroke={line.color}
        dot={true}
        label={{ position: "top", fill: "#fb1", fontSize: ".5rem" }}
      />
    );
  });

  return (
    <div
      className={`bg-blackCMDC rounded-lg flex flex-col px-2 pt-2 ${className}`}
    >
      <h2 className="font-semibold text-white mb-2 z-50 relative">
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
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: -10,
            right: 5,
            left: -55,
            bottom: 0.2 * getFontSize(),
          }}
        >
          <defs>
            <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3FA500" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3d3d3f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38A3D5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38A3D5" stopOpacity={0.13} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="#233767"
            strokeDasharray="2"
            vertical={false}
            label
          />
          <XAxis
            dataKey="dia"
            tick={{ fontSize: ".6rem", fill: "white" }}
            interval={0}
          />
          <YAxis
            domain={[0, getLimit(data)]}
            interval={0}
            tickCount={5}
            tick={{ fontSize: ".6rem", fill: "white" }}
            opacity={0}
          />
          <Legend
            iconType="square"
            payload={config.legends.map((legend) => ({
              type: "square",
              value: (
                <span className="text-xsm font-Montserrat text-white mr-1">
                  {legend.title}
                </span>
              ),
              color: legend.color,
            }))}
            layout="horizontal"
            verticalAlign="top"
            align="right"
            iconSize=".5rem"
            wrapperStyle={{
              marginTop: -20,
            }}
          />
          {bar}
          {lines}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ComposedBarGraphic;
