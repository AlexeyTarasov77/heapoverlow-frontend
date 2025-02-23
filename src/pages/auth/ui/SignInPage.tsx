import { Alert, Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { ISignInForm, signin } from "../api/signin";
import { authTokenKey } from "../../../shared/api/client";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  const [success, setSuccess] = useState<boolean | null>(null)
  console.log("errors", errors);
  const onSubmit: SubmitHandler<ISignInForm> = async (data: ISignInForm) => {
    const resp = await signin(data);
    if (!resp.success) {
      setSuccess(false)
      return setError("root", { type: "custom", message: resp.message });
    }
    localStorage.setItem(authTokenKey, resp.data);
    setSuccess(true)
  };
  const displayAlert = () => {
    const show = (node: ReactNode) => createPortal(<div className="absolute bottom-4 right-4">{node}</div>, document.body)
    if (success === true) {
      return show(<Alert action={
        <Button color="inherit" size="small"><Link to={"/"}>Go Home</Link></Button>
      }>Successfully signed in!</Alert>)
    } else if (success === false) {
      return show(<Alert onClose={() => { }} severity="error">Ooops! Failed to sign in</Alert>)
    }
  }
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
          type="email"
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
      {displayAlert()}
    </Box>
  );
}
