import { z } from "zod";
import { QuestionAuthorSchema } from "../../questions/model/@x/users";

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
