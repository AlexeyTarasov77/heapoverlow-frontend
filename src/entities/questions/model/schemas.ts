
import { z } from "zod";
import { UserSchema } from "../../users/model/@x/questions";
import { IDSchema, QuestionSchema } from "./@x/users";


export const QuestionAnswerSchema = z.object({
  id: IDSchema,
  upvotes: z.number(),
  author: UserSchema,
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const QuestionSchemaWithAuthor = QuestionSchema.extend({
  author: UserSchema,
})

export const QuestionExtendedSchema = QuestionSchemaWithAuthor.extend({
  answers: z.array(QuestionAnswerSchema),
})
