import { TextField } from "@mui/material";
import { IComponentProps } from "./BaseInput";

export function FormTextInput({
  onChange,
  label,
  value,
  errorMsg,
}: IComponentProps) {
  return (
    <TextField
      onChange={onChange}
      value={value}
      label={label}
      error={!!errorMsg}
      helperText={errorMsg}
    />
  );
}
