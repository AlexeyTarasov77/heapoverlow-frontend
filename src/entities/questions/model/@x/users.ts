
import { z } from "zod";

export const QuestionAuthorSchema = z.object({
  id: z.number(),
  username: z.string(),
  imageUrl: z.string().nullable(),
});

