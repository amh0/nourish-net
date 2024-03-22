import React, { useState } from "react";
import "./Input.css";

const Input = ({ id, type, placeholder, value, onChange }) => {
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
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
      <label className={isFocused || value ? "focused" : ""}>
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
