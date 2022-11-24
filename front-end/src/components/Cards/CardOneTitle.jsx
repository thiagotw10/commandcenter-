import React from "react";
import { ReactComponent as StatisticSVG } from "../../assets/svg/StatisticSVG.svg";
import CountUp from "react-countup";
import { ToolTip } from "../";

function CardOneTitle({ data, title, icon, className, toolTipConfig }) {
  const [tooltip, setToolTip] = React.useState(false);

  return (
    <div
      className={`bg-blackCMDC rounded-lg flex flex-col p-1 relative ${className}`}
    >
      {title && (
        <h2 className="text-center text-xs font-semibold text-white mt-2">
          <span
            onMouseOver={() => setToolTip(true)}
            onMouseLeave={() => setToolTip(false)}
          >
            {title}
          </span>
        </h2>
      )}
      <ToolTip title={toolTipConfig && toolTipConfig.title} display={toolTipConfig && tooltip} desc={toolTipConfig && toolTipConfig.desc} />
      <div className="flex flex-col items-center mt-4">
        <div className="flex justify-center items-center">
          <span className="text-3xl font-bold text-white">
            {!!data ? <CountUp end={data} duration={1} /> : 0}
          </span>
          {icon && icon}
        </div>
        <StatisticSVG className="w-24 h-20 mt-1" />
      </div>
    </div>
  );
}

export default CardOneTitle;
