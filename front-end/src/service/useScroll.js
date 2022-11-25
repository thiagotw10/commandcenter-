import React from "react";

function useScroll(ref, numberOfScrolls = 10, time = 3000, handleEnd) {
  const [scrollOne, setScrollOne] = React.useState(0);
  const [scrollTwo, setScrollTwo] = React.useState(0);
  const memorizedHandleEnd = React.useRef(handleEnd);

  React.useEffect(() => {
    ref.current?.scrollTo({
      top: scrollTwo,
      behavior: "smooth",
    });

    setScrollOne(scrollTwo);
  }, [scrollTwo, ref]);

  React.useEffect(() => {
    const sizeToScroll = Math.ceil(ref.current?.scrollHeight / numberOfScrolls);
    const interval = setInterval(() => {
      if (scrollOne < ref.current?.scrollHeight - ref.current?.clientHeight) {
        setScrollTwo((scrollTwo) => scrollTwo + sizeToScroll);
      } else {
        setScrollTwo(0);
        if (!!memorizedHandleEnd.current) memorizedHandleEnd.current();
      }
    }, time);
    return () => clearInterval(interval);
  }, [ref, scrollOne, numberOfScrolls, time, memorizedHandleEnd]);
}
export { useScroll };
