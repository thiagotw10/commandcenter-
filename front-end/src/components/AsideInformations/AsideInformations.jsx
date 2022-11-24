import React from "react";

const AsideInformations = ({
  data,
  className,
  labelClass,
  variant = "fill",
}) => {
  const informations =
    data &&
    data.map(({ color, title, icon, ...info }) => {
      return (
        <div key={title} className="flex flex-row items-center gap-1 mb-2">
          {icon ? (
            icon
          ) : (
            <span
              className={`w-3 h-3 -mt-1 rounded ${
                variant === "outlined" ? "border-2" : ""
              }`}
              style={
                variant === "outlined"
                  ? { borderColor: color }
                  : { backgroundColor: color }
              }
            ></span>
          )}
          <span className="text-white font-semibold whitespace-nowrap">
            {title}
          </span>
        </div>
      );
    });

  return (
    <aside className={`w-full max-h-28 px-5 py-2 ${className}`}>
      <div
        className={`flex items-center max-w-7xl m-auto gap-x-5 ${labelClass}`}
      >
        {informations}
      </div>
    </aside>
  );
};

export default AsideInformations;
