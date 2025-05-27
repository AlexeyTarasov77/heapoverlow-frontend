"use client"
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import {
  UIInput
} from "../../../shared/ui/forms";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useEffect } from "react";
import { ISignUpForm, userSignUp } from "../../../entities/users";
import { validationHelpers } from "../../../shared/utils";
import { Loader } from "../../../shared/ui";
import { AuthForm } from "./form";
import { useRouter } from "next/navigation";

export function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();
  const dispatch = useAppDispatch();
  const { isSubmitSuccessful } = useFormState({ control });
  const { isLoading, error, user } = useAppSelector((state) => state.users);
  const router = useRouter()
  const onSubmit: SubmitHandler<ISignUpForm> = async (data: ISignUpForm) => {
    dispatch(userSignUp(data));
  };
  useEffect(() => {
    error && setError("root", { message: error });
  }, [error, setError]);
  // if already authenticated user on sign up page
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/users/profile");
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />;
  }
  const isSuccesfulSignUp = !isLoading && !error && isSubmitSuccessful;
  isSuccesfulSignUp && setTimeout(() => router.push("/users/signin"), 2500);
  return (

    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4">Sign Up</Typography>
      <UIInput.Text
        name="username"
        control={control}
        rules={{
          ...validationHelpers.required(),
          ...validationHelpers.minLength(5),
        }}
        label="Username"
      />
      <UIInput.Text
        name="email"
        type="email"
        control={control}
        rules={{
          ...validationHelpers.required(),
        }}
        label="Email"
      />
      <UIInput.Text
        name="location"
        control={control}
        label="Location"
      />
      <UIInput.Password
        name="password"
        control={control}
        rules={{
          ...validationHelpers.required(),
          ...validationHelpers.minLength(8),
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
    </AuthForm>

  );
}
