import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
} from "../../../shared/ui/forms";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ShowNotification } from "../../../widgets/notifications";
import { useEffect } from "react";
import { ISignInForm, userSignIn } from "../../../entities/users";
import { validationHelpers } from "../../../shared/utils";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    console.log(alert, user)
    if (!alert && !isLoading && user) {
      navigate("/users/profile")
    }
  }, [isLoading])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const onSuccessfulSignIn = () => {
    setTimeout(() => navigate("/users/profile"), 2500);
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
        <Typography variant="h4">Sign In</Typography>
        <BaseInput
          Component={FormTextInput}
          name="email"
          type="email"
          control={control}
          rules={{
            ...validationHelpers.required(),
          }}
          label="Email"
        />
        <BaseInput
          Component={FormPasswordInput}
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
      </Box>
      {alert && user && onSuccessfulSignIn()}
    </Box>
  );
}
