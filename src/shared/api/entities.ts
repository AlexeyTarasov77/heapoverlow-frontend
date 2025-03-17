import { z } from "zod";

export const QuestionAuthorSchema = z.object({
  id: z.number(),
  username: z.string(),
  imageUrl: z.string().nullable(),
});

export const UserSchema = QuestionAuthorSchema.extend({
  location: z.string().nullable(),
  reputation: z.number(),
  email: z.string(),
  questions: z.array(z.object({
    id: z.number(),
    title: z.string(),
    createdAt: z.string().datetime()
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  author: QuestionAuthorSchema,
  answersCount: z.number({ coerce: true }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Question = z.infer<typeof QuestionSchema>;
export type User = z.infer<typeof UserSchema>;
