import React from "react";

export default ({
  input,
  classes,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <label className={input.name}>
    <span>{label}</span>
    <input type={type} {...input} placeholder={label} />
    {touched &&
      ((error && <div className="error">{error}</div>) ||
        (warning && <div className="warning">{warning}</div>))}
  </label>
);
