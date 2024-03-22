import React, { useState } from "react";
import "./Switch.css";

const Switch = ({ onChange, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleSwitch = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <label className="custom-switch">
      <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <span className="custom-slider round"></span>
    </label>
  );
};

export default Switch;
