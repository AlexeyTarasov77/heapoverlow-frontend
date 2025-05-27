"use client"
import { Button, Box, Typography } from "@mui/material";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { Loader, TagInput } from "../../../shared/ui";
import { UIInput } from "../../../shared/ui/forms";
import { validationHelpers } from "../../../shared/utils";
import {
  createQuestion,
  ICreateQuestionForm,
} from "../../../entities/questions";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { ShowNotification } from "../../../widgets/notifications";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CreateQuestionPage() {
  const {
    control,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateQuestionForm>();
  const { isSubmitSuccessful } = useFormState({ control });
  const { isLoading, error, lastCreatedID } = useAppSelector(
    (state) => state.questions,
  );
  const alert = useAppSelector((state) => state.common.alert);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<ICreateQuestionForm> = (data) => {
    dispatch(createQuestion(data));
  };
  const router = useRouter()
  useEffect(() => {
    error && setError("root", { message: error });
  }, [error, setError]);
  const isSuccesfullyCreated = !isLoading && !error && isSubmitSuccessful;
  isSuccesfullyCreated && router.push(`/questions/${lastCreatedID}`);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {alert && <ShowNotification />}
      <Box className="flex items-center justify-center min-h-screen">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border border-blue-500 py-32 px-32"
          maxWidth="sm"
          maxHeight="sm"
        >
          <Typography variant="h4">Create question</Typography>
          <UIInput.Text
            name="title"
            control={control}
            rules={{
              ...validationHelpers.required(),
              ...validationHelpers.minLength(10),
            }}
            label="Title"
          />
          <UIInput.Text
            name="body"
            control={control}
            rules={{
              ...validationHelpers.required(),
              ...validationHelpers.minLength(10),
            }}
            label="Body"
          />
          <input
            type="hidden"
            {...register("tags", validationHelpers.required())}
          />
          <TagInput
            onChange={(tags) => setValue("tags", tags)}
            errorMsg={
              errors.tags
                ? errors.tags.message || "Enter a valid value"
                : undefined
            }
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
}
