import React from "react";

function Loading() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    function updateStep() {
      setStep((step) => {
        if (step < 4) return step + 1;
        else return 0;
      });
    }

    const interval = setInterval(updateStep, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function displayStep(i) {
    return {
      display: step === i ? "block" : "none",
    };
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="rounded-full bg-transparent w-36 h-36 flex justify-center items-center animate-pulse">
        <svg
          width="77"
          height="84"
          viewBox="0 0 77 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8/12 h-4/6 transition-all"
        >
          <g style={displayStep(1)}>
            <rect
              x="6.12012"
              y="16.625"
              width="50"
              height="18"
              rx="2"
              transform="rotate(19.8773 6.12012 16.625)"
              fill="#3BEB38"
            />
          </g>
          <g style={displayStep(2)}>
            <rect
              x="6.12012"
              y="16.625"
              width="50"
              height="18"
              rx="2"
              transform="rotate(19.8773 6.12012 16.625)"
              fill="#3BEB38"
            />
            <rect
              x="11.2393"
              y="73.6812"
              width="25"
              height="25"
              rx="2"
              transform="rotate(-70.4483 11.2393 73.6812)"
              fill="#6361E1"
            />
          </g>
          <g style={displayStep(3)}>
            <rect
              x="6.12012"
              y="16.625"
              width="50"
              height="18"
              rx="2"
              transform="rotate(19.8773 6.12012 16.625)"
              fill="#3BEB38"
            />
            <rect
              x="11.2393"
              y="73.6812"
              width="25"
              height="25"
              rx="2"
              transform="rotate(-70.4483 11.2393 73.6812)"
              fill="#6361E1"
            />
            <rect
              x="44.1162"
              y="75.5586"
              width="25"
              height="25"
              rx="2"
              transform="rotate(-70.4483 44.1162 75.5586)"
              fill="#6361E1"
            />
          </g>
          <g style={displayStep(4)}>
            <rect x="41.1162" width="28" height="28" rx="14" fill="#FA5252" />
            <rect
              x="6.12012"
              y="16.625"
              width="50"
              height="18"
              rx="2"
              transform="rotate(19.8773 6.12012 16.625)"
              fill="#3BEB38"
            />
            <rect
              x="11.2393"
              y="73.6812"
              width="25"
              height="25"
              rx="2"
              transform="rotate(-70.4483 11.2393 73.6812)"
              fill="#6361E1"
            />
            <rect
              x="44.1162"
              y="75.5586"
              width="25"
              height="25"
              rx="2"
              transform="rotate(-70.4483 44.1162 75.5586)"
              fill="#6361E1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
