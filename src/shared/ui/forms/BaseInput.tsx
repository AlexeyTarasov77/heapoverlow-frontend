import { ComponentType } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { InputProps } from "@mui/material";

export interface IComponentProps extends InputProps {
  label?: string;
  errorMsg?: string;
}

export interface IFormInputProps {
  name: string;
  className?: string;
  label?: string;
  type?: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  Component: ComponentType<IComponentProps>;
}

export function BaseInput({
  name,
  className,
  label,
  type,
  control,
  rules,
  Component,
}: IFormInputProps) {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Component
          type={type}
          className={className}
          onChange={onChange}
          value={value ?? ""}
          label={label}
          errorMsg={error ? error.message || "Enter a valid value" : undefined}
        />
      )}
    />
  );
}
