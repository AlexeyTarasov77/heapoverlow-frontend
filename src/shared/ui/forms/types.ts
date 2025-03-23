import { InputProps } from "@mui/material";
import { ComponentType } from "react";
import { ControllerProps } from "react-hook-form";

export interface IComponentProps extends InputProps {
  label?: string;
  errorMsg?: string;
}

export interface IFormInputProps extends Omit<ControllerProps<any>, "render"> {
  className?: string;
  label?: string;
  type?: string;
  Component: ComponentType<IComponentProps>;
}

export type InputSubType = React.FC<
  Omit<IFormInputProps, "Component">
>;
