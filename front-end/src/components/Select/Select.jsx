import React from "react";

const Select = ({
  className,
  value = "-",
  setValue,
  options,
  defaultValue,
  ...props
}) => {
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleChange = ({ target }) => setValue(target.value);

  const optionsSelect = options?.map((value) => {
    return (
      <option
        key={value}
        value={value}
        className="text-gray-800 text-xsm font-bold"
      >
        {capitalizeFirstLetter(value)}
      </option>
    );
  });

  return (
    <select
      value={value}
      className={`bg-blackCMDC bg-opacity-50 rounded-2xl text-white border border-white min-w-32 min-h-7 text-center ${className}`}
      onChange={handleChange}
      {...props}
    >
      {defaultValue && (
        <option value="-" className="text-gray-800 text-xsm font-bold">
          {defaultValue}
        </option>
      )}
      {optionsSelect}
    </select>
  );
};

export default Select;
