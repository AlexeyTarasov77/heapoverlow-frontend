import { TextField } from "@mui/material";
import { IComponentProps } from "./types";

export function UITextInput({
  onChange,
  label,
  value,
  type,
  errorMsg,
}: IComponentProps) {
  return (
    <TextField
      type={type}
      onChange={onChange}
      value={value}
      label={label}
      error={!!errorMsg}
      helperText={errorMsg}
    />
  );
}
