import React, { useRef, useEffect, useState } from "react";

export default function Select({ options = [], value, className }) {
  const selectEl = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    
  }, [selectEl.current]);

  console.log("###############", inputValue);
  return (
    <select ref={selectEl} value={value}>
      {options.map(option => (
        <option value={option.value || option.text}>
          {option.text || option.value}
        </option>
      ))}
    </select>
  );
}
