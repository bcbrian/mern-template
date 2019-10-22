import React, { useRef, useEffect, useState } from "react";
import M from "materialize-css";

export default function Select({ options = [], value, className }) {
  const selectEl = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const instance = M.FormSelect.init(selectEl.current, {
      classes: className
    });

    instance.input.addEventListener("onchange", event => {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$");
      setInputValue(event.target.value);
    });
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
