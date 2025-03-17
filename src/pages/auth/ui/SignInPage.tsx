import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BaseInput,
  FormPasswordInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { userSignIn } from "../../../shared/store/UsersSlice";
import { ISignInForm } from "../../../shared/api/usersApi";
import { ShowNotification } from "../../../widgets/notifications";

export function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignInForm>();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const alert = useAppSelector((state) => state.common.alert)
  const onSubmit: SubmitHandler<ISignInForm> = async (data: ISignInForm) => {
    dispatch(userSignIn(data)).unwrap()
      .then(() => setTimeout(() => navigate("/"), 3000))
      .catch(err => setError("root", { message: err.message }))
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
      <ShowNotification>{alert}</ShowNotification>
    </Box>
  );
}
