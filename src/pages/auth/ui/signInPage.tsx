import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import {
  UIInput
} from "../../../shared/ui/forms";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ShowNotification } from "../../../widgets/notifications";
import { useEffect } from "react";
import { ISignInForm, userSignIn } from "../../../entities/users";
import { validationHelpers } from "../../../shared/utils";
import { Loader } from "../../../shared/ui";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  const { isSubmitSuccessful } = useFormState({ control });
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
    if (!alert && !isLoading && user) {
      navigate("/users/profile");
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />;
  }
  const isSuccesfullySignedIn = !isLoading && !error && isSubmitSuccessful;
  isSuccesfullySignedIn && setTimeout(() => navigate("/users/profile"), 2500);
  return (
    <Box className="flex items-center justify-center min-h-screen">
      {alert && <ShowNotification>{alert}</ShowNotification>}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border border-blue-500 py-32 px-32"
        maxWidth="sm"
        maxHeight="sm"
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
      </Box>
    </Box>
  );
}
