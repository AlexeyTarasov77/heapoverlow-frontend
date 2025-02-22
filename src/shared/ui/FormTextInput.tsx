import { TextField } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface IProps {
  name: string;
  label?: string;
  control: Control<any>;
  fullWidth?: boolean;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export function FormTextInput({
  name,
  control,
  label,
  fullWidth,
  rules,
}: IProps) {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth={fullWidth}
          onChange={onChange}
          value={value ?? ""}
          label={label}
          error={!!error}
          helperText={error ? error.message || "Enter a valid value" : null}
        />
      )}
    />
  );
}
