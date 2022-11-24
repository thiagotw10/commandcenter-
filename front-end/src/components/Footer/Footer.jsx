import React from "react";
import sabara from "../../assets/img/Sabara.png";
import threeWings from "../../assets/img/3wings.png";

function Footer({ className }) {
  return (
    <footer className={`w-full max-h-28 px-5 ${className}`}>
      <div className="flex flex-row justify-between items-center max-w-7xl m-auto">
        <img src={sabara} alt="Sabará logo" className="block w-44 h-10 -ml-5" />
        <img src={threeWings} alt="3wings logo" className="block w-36 h-9" />
      </div>
    </footer>
  );
}

export default React.memo(Footer);
