import { z } from "zod";

export const IDSchema = z.number().gt(0);

export const QuestionSchema = z.object({
  id: IDSchema,
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  answersCount: z.number({ coerce: true }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
