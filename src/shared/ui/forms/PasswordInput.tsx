import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { IComponentProps } from "./types";

export function UIPasswordInput({
  onChange,
  value,
  errorMsg,
  className,
}: IComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl className={className} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        onChange={onChange}
        value={value}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </FormControl>
  );
}
