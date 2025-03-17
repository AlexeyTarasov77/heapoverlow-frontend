import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { ISignUpForm } from "../../../shared/api/usersApi";

export function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();
  const onSubmit: SubmitHandler<ISignUpForm> = async (data: ISignUpForm) => {
    alert("Succesfully signed up!");
  };
  return (
    <Box className="flex items-center justify-center min-h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border border-blue-500 py-32 px-32"
        maxWidth="sm"
        maxHeight="sm"
      >
        <Typography variant="h4">Sign Up</Typography>
        <BaseInput
          Component={FormTextInput}
          name="username"
          control={control}
          rules={{
            ...validationRules.required(),
            ...validationRules.minLength(5),
          }}
          label="Username"
        />
        <BaseInput
          Component={FormTextInput}
          name="email"
          type="email"
          control={control}
          rules={{
            ...validationRules.required(),
          }}
          label="Email"
        />
        <BaseInput
          Component={FormTextInput}
          name="location"
          control={control}
          label="Location"
        />
        <BaseInput
          Component={FormPasswordInput}
          name="password"
          control={control}
          rules={{
            ...validationRules.required(),
            ...validationRules.minLength(8),
          }}
        />
        {errors?.root ? (
          <p className="text-red-500 text-sm">
            {errors.root.message || "Failed to sign up"}
          </p>
        ) : null}
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
