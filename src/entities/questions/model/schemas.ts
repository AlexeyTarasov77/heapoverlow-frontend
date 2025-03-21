
import { z } from "zod";
import { QuestionAuthorSchema } from "./@x/users";

export const QuestionIDSchema = z.number().gt(0)

export const QuestionSchema = z.object({
  id: QuestionIDSchema,
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  author: QuestionAuthorSchema,
  answersCount: z.number({ coerce: true }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
