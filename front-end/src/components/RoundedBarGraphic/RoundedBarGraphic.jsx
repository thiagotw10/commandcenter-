import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useUtilities from "../../service/useUtilities";

const RoundedBarGraphic = ({ data, config, limit, className }) => {
  const { getFontSize } = useUtilities();

  const Background = ({ color, x, y, width, height }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#151A20"
          strokeWidth={0.1 * getFontSize()}
          stroke={color}
          rx={0.7 * getFontSize()}
        />
      </g>
    );
  };

  return (
    <div
      className={`flex flex-row items-center justify-center relative ${className}`}
    >
      <div className="absolute flex justify-center items-center lef-0 top-0 w-full h-9">
        <span
          className="font-bold text-xl z-10"
          style={{
            color: data && data[0].pacientes > limit / 2 ? "#000" : "#fff",
          }}
        >
          {data ? data[0].pacientes : 0}
        </span>
      </div>
    <ResponsiveContainer width="90%" height="125%">
        <BarChart data={data} layout="vertical">
          <Bar
            dataKey={config.key}
            fill={config ? config.color : "#fff"}
            background={<Background color={config ? config.color : "#fff"} />}
            radius={0.7 * getFontSize()}
          />
          <XAxis hide type="number" domain={[0, limit === 0 ? 1 : limit]} />
          <YAxis hide type="category" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoundedBarGraphic;
