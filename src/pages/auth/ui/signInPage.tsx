"use client"
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import {
  UIInput
} from "../../../shared/ui/forms";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useEffect } from "react";
import { ISignInForm, userSignIn } from "../../../entities/users";
import { validationHelpers } from "../../../shared/utils";
import { Loader } from "../../../shared/ui";
import { AuthForm } from "./form";
import { useRouter } from "next/navigation";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  const { isSubmitSuccessful } = useFormState({ control });
  const dispatch = useAppDispatch();
  const router = useRouter()
  const alert = useAppSelector((state) => state.common.alert);
  const { isLoading, error, user } = useAppSelector((state) => state.users);
  const onSubmit: SubmitHandler<ISignInForm> = async (data: ISignInForm) => {
    dispatch(userSignIn(data));
  };
  useEffect(() => {
    error && setError("root", { message: error });
  }, [error, setError]);
  // if already authenticated user on sign in page
  useEffect(() => {
    if (!alert && !isLoading && user) {
      router.replace("/users/profile");
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />;
  }
  const isSuccesfullySignedIn = !isLoading && !error && isSubmitSuccessful;
  isSuccesfullySignedIn && setTimeout(() => router.push("/users/profile"), 2500);
  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4">Sign In</Typography>
      <UIInput.Text
        name="email"
        type="email"
        control={control}
        rules={{
          ...validationHelpers.required(),
        }}
        label="Email"
      />
      <UIInput.Password
        name="password"
        control={control}
        rules={{
          ...validationHelpers.required(),
          ...validationHelpers.minLength(8),
        }}
      />
      {errors?.root && (
        <p className="text-red-500 text-sm">
          {errors.root.message || "Failed to sign in"}
        </p>
      )}
      <Button type="submit" variant="contained">
        Sign In
      </Button>
    </AuthForm>
  );
}
