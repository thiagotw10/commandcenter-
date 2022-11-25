import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import useUtilities from "../../service/useUtilities";

const BarGraphic = ({
  data,
  config,
  className,
  layout,
  x,
  y,
  radius,
  margin,
  barSize,
  label,
  limit,
  limitIdentifier = false,
  shape,
  backgroundFill = "#0F1931",
  legendPosition,
  legendLayout,
}) => {
  const { getFontSize, getLimit } = useUtilities();

  const gradients =
    config &&
    config.gradients?.map((gradient) => {
      return (
        <defs key={gradient.id}>
          <linearGradient
            id={gradient.id || ""}
            x1={gradient.x || "0"}
            y1="0"
            x2="0"
            y2={gradient.y || "0"}
          >
            <stop
              offset="5%"
              stopColor={gradient.to || "#151A20"}
              stopOpacity={0.9}
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

  const bars =
    config &&
    config.bars?.map((bar, i) => {
      return (
        <Bar
          key={bar.key}
          shape={shape || false}
          dataKey={bar.key}
          fill={bar.fill || "#fff"}
          radius={radius * getFontSize()}
          stackId={bar.stackId || "stack-" + i}
          maxBarSize={barSize * getFontSize()}
          isAnimationActive={false}
          background={{ fill: backgroundFill }}
        >
          {label && <LabelList dataKey={bar.key} {...label} />}
        </Bar>
      );
    });

  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout || "horizontal"}
          margin={margin || {}}
        >
          {bars}
          {gradients}
          <XAxis
            {...x}
            domain={[0, limit ? limit : getLimit(data, limitIdentifier)]}
          />
          <YAxis
            {...y}
            domain={[0, limit ? limit : getLimit(data, limitIdentifier)]}
          />
          {!!config.bars[0]?.title && (
            <Legend
              layout={legendLayout}
              payload={config.bars.map((value) => ({
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
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphic;
