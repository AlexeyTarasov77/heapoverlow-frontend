import { RegisterOptions } from "react-hook-form";

export const validationRules = {
  required: () => ({
    required: { value: true, message: "This field is required." },
  }),
  minLength: (value: number): RegisterOptions => ({
    minLength: { value, message: `Field length should be >= ${value}` },
  }),
  maxLength: (value: number): RegisterOptions => ({
    maxLength: { value, message: `Field length should be <= ${value}` },
  }),
};
