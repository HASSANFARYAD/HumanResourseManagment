import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      fullWidth
      require={required && required}
      size="small"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="outlined"
      margin="normal"
    />
  );
};

export default PasswordField;
