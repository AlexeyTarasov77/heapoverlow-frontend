import { Button, Box, Typography } from "@mui/material";
import { Form, useForm } from "react-hook-form";
import { TagInput } from "../../../shared/ui";
import {
  BaseInput,
  FormTextInput,
  validationRules,
} from "../../../shared/ui/forms";
import { SERVER_URL } from "../../../app/constants";

export interface ICreateQuestionForm {
  title: string;
  body: string;
  tags: string[];
}

export function CreateQuestionPage() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<ICreateQuestionForm>();
  // };
  return (
    <Box className="flex items-center justify-center min-h-screen">
      <Form
        control={control}
        headers={{ "Content-Type": "application/json" }}
        action={SERVER_URL + "/questions"}
        onSuccess={({}) => alert("Questions succesfully saved")}
        onError={() => alert("Failed to create question")}
      >
        <Box
          // component="form"
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border border-blue-500 py-32 px-32"
          maxWidth="sm"
          maxHeight="sm"
        >
          <Typography variant="h4">Create question</Typography>
          <BaseInput
            name="title"
            control={control}
            rules={{
              ...validationRules.required(),
              ...validationRules.minLength(10),
            }}
            label="Title"
            Component={FormTextInput}
          />
          <BaseInput
            Component={FormTextInput}
            name="body"
            control={control}
            rules={{
              ...validationRules.required(),
              ...validationRules.minLength(10),
            }}
            label="Body"
          />
          <input
            type="hidden"
            {...register("tags", validationRules.required())}
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
      </Form>
    </Box>
  );
}
