import { Controller } from "react-hook-form";
import { UIPasswordInput } from "./PasswordInput";
import { UITextInput } from "./TextInput";
import { IFormInputProps, InputSubType } from "./types";

export type InputType = React.FC<IFormInputProps> & {
  Password: InputSubType;
  Text: InputSubType;
};

export const UIInput: InputType = ({
  name,
  className,
  label,
  type,
  control,
  rules,
  Component,
}: IFormInputProps) => {
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
};

const passwordInput: InputSubType = (props) => (
  <UIInput {...props} Component={UIPasswordInput} />
);
const textInput: InputSubType = (props) => (
  <UIInput {...props} Component={UITextInput} />)

UIInput.Password = passwordInput
UIInput.Text = textInput
