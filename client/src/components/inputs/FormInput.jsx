import React from "react";

const FormInput = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 w-full capitalize tracking-wide">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="w-full rounded border border-customDarkGrayish px-2 py-3"
      />
    </div>
  );
};

export default FormInput;
