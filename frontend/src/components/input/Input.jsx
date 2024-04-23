import React, { useState } from "react";
import "./Input.css";

const Input = ({ id, type, placeholder, value, onChange, min, max }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`input-field ${isFocused || value ? "focused" : ""}`}>
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        placeholder=""
      />
      <label className={isFocused || value ? "focused" : ""}>
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
