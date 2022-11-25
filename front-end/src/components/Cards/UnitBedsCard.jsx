import React from "react";
import { BedsCard } from "../";
import { useTransition, animated, config } from "react-spring";

const UnitBedsCard = ({
  data,
  percent,
  dataKey = "LEITO",
  filterIcons,
  title,
  className,
  bedVariant,
  bedIcons,
  bedClass,
  containerClass,
}) => {
  const transitionsBeds = useTransition(data ? data : [], {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { display: "none" },
    trail: 100,
    delay: 50,
    config: config.gentle,
  });

  return (
    <div className={`flex gap-5 ${className}`}>
      <h2 className="text-sm font-semibold text-white w-32 whitespace-nowrap">
        {title || ""}
      </h2>
      {percent && (
        <p
          className="text-sm font-semibold w-11"
          style={{
            color: percent.replace("%", "") >= 70 ? "#CE3C3C" : "#fff",
          }}
        >
          {percent}
        </p>
      )}
      <div className={`flex-1 flex gap-3 px-2 ${containerClass}`}>
        {transitionsBeds((style, bed) => (
          <animated.div style={style}>
            <BedsCard
              key={bed[dataKey]}
              data={bed[dataKey]}
              color={bed.color}
              variant={bedVariant}
              icons={filterIcons ? filterIcons(bed, bedIcons) : bedIcons}
              className={bedClass}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default UnitBedsCard;
