import { z } from "zod";
import { UserSchema } from "./@x/questions";

export const UserExtendedSchema = UserSchema.extend({
  location: z.string().nullable(),
  reputation: z.number(),
  questions: z.array(z.object({
    id: z.number(),
    title: z.string(),
    createdAt: z.string().datetime()
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
