import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { ISignInForm, signin } from "../api/signin";
import { authTokenKey } from "../../../shared/api/client";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  console.log("errors", errors);
  const onSubmit: SubmitHandler<ISignInForm> = async (data: ISignInForm) => {
    const resp = await signin(data);
    if (!resp.success) {
      return setError("root", { type: "custom", message: resp.message });
    }
    localStorage.setItem(authTokenKey, resp.data);
    alert("Succesfully signed in!");
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
        <Typography variant="h4">Sign In</Typography>
        <BaseInput
          Component={FormTextInput}
          name="email"
          control={control}
          rules={{
            ...validationRules.required(),
          }}
          label="Email"
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
            {errors.root.message || "Failed to sign in"}
          </p>
        ) : null}
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
