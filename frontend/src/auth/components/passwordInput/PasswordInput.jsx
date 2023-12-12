import React, { useState } from "react";

export const PasswordInput = ({
  placeholder,
  value,
  name,
  onChange,
  OnPaste,
  id, 
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="form-group position-relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        required
        className="form-style"
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        onChange={onChange}
        onPaste={OnPaste}
        {...rest} 
      />
      <i className="input-icon uil uil-lock-alt"></i>
      <i
        onClick={togglePassword}
        className={`toggle-icon uil ${
          showPassword ? "uil-eye-slash" : "uil-eye"
        }`}
      ></i>
    </div>
  );
};
