import { forwardRef } from "react";
import { useState } from "react";
import classes from "./Input.module.scss";
export const TextBox = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.dataValue);

  return (
    <div className={classes.TextBox}>
      <input
        type={props.type || "text"}
        ref={ref ? ref : null}
        required={props.required}
        name={props.name}
        className={classes.Input}
        style={props.style}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
});

export const Label = (props) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={classes.Label}
      style={props.style}
    >
      {props.label}
    </label>
  );
};
