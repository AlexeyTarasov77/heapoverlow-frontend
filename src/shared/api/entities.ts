import { z } from "zod";

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  answersCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  imageUrl: z.string()
})

export type Question = z.infer<typeof QuestionSchema>;
export type User = z.infer<typeof UserSchema>;

