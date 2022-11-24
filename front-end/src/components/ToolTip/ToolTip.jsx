import React from "react";

const ToolTip = ({ title, desc, display = false }) => {
  const section = React.useRef(null);
  const [position, setPosition] = React.useState("top-6 -left-1 animate-top");

  React.useLayoutEffect(() => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const element = section.current?.getBoundingClientRect();
    const topSection = element ? element.top + element.height : 0;
    const leftSection = element ? element.left + element.left : 0;

    if (topSection > windowHeight) {
      if (leftSection > windowWidth) {
        setPosition("-top-32 -left-10 animate-down");
      } else {
        setPosition("-top-32 -left-1 animate-down");
      }
    } else {
      if (leftSection > windowWidth) {
        setPosition("top-6 -left-10 animate-top");
      } else {
        setPosition("top-6 -left-1 animate-top");
      }
    }
  }, [section, display]);

  if (!display) return null;

  return (
    <section
      ref={section}
      className={`absolute p-3 w-50 bg-white rounded-lg shadow-md font-Nunito-sans z-50 ${position}`}
    >
      <h1 className="text-gray-900 font-bold text-sm mb-2 text-center">
        {title}
      </h1>
      <p className="w-full h-full text-gray-600 text-justify font-normal text-xslg">
        {desc}
      </p>
    </section>
  );
};

export default React.memo(ToolTip);
