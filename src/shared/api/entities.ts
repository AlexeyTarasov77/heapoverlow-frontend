import { z } from "zod";

export const QuestionAuthorSchema = z.object({
  id: z.number(),
  username: z.string(),
  imageUrl: z.nullable(z.string())
})


export const UserSchema = QuestionAuthorSchema.extend({})

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  author: QuestionAuthorSchema,
  answersCount: z.number({ coerce: true }),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
});

export type Question = z.infer<typeof QuestionSchema>;
export type User = z.infer<typeof UserSchema>;

