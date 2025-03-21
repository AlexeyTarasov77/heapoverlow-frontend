import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { ISignUpForm } from "../../../shared/api/usersApi";
import { userSignUp } from "../../../shared/store/UsersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ShowNotification } from "../../../widgets/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alert = useAppSelector((state) => state.common.alert);
  const { isLoading, error, user } = useAppSelector((state) => state.users);
  const onSubmit: SubmitHandler<ISignUpForm> = async (data: ISignUpForm) => {
    dispatch(userSignUp(data));
  };
  useEffect(() => {
    error && setError("root", { message: error });
  }, [error, setError]);
  // if already authenticated user on sign up page
  useEffect(() => {
    if (!isLoading && user) {
      console.log("navigation")
      navigate("/users/profile")
    }
  }, [isLoading])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const onSuccessfulSignUp = () => {
    setTimeout(() => navigate("/users/signin"), 2500);
    return <ShowNotification>{alert}</ShowNotification>;
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
        {alert && onSuccessfulSignUp()}
      </Box>
    </Box>
  );
}
