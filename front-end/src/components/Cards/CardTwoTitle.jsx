import React from "react";
import { ReactComponent as StatisticSVG } from "../../assets/svg/StatisticSVG.svg";
import CountUp from "react-countup";
import { ToolTip } from "../";

function CardTwoTitle({ data, icon, titles, toolTipConfig, className }) {
  const [tooltip, setToolTip] = React.useState(false);

  const titlesOne = titles[0].split("|").map((title) => {
    return (
      <span
        key={title}
        className="text-xs text-center font-semibold text-white"
      >
        {title}
      </span>
    );
  });

  const titlesTwo = titles[1].split("|").map((title) => {
    return (
      <span
        key={title}
        className="text-xs text-center font-semibold text-white"
      >
        {title}
      </span>
    );
  });

  return (
    <div className={`bg-blackCMDC rounded-lg flex flex-col p-2 ${className}`}>
      <div
        className="flex flex-row justify-between items-center w-11/12 m-auto"
        onMouseOver={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
      >
        <ToolTip title={toolTipConfig && toolTipConfig.title} display={toolTipConfig && tooltip} desc={toolTipConfig && toolTipConfig.desc} />
        <div className="flex flex-col justify-center items-center">
          {titlesOne}
        </div>
        <div className="flex flex-col justify-center items-center">
          {titlesTwo}
        </div>
      </div>
      <div className="flex flex-col items-center mt-3">
        <div className="flex justify-between items-center gap-8">
          <span className="text-3xl font-bold text-white">
            {!!data ? <CountUp end={data.dataOne} duration={1} /> : 0}
          </span>
          {icon && icon}
          <span className="text-3xl font-bold text-white">
            {!!data ? <CountUp end={data.dataTwo} duration={1} /> : 0}
          </span>
        </div>
        <StatisticSVG className="w-24 h-20 mt-1" />
      </div>
    </div>
  );
}

export default CardTwoTitle;
