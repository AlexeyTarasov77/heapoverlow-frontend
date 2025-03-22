import { z } from "zod";

export enum UserRole {
  BOT,
  USER,
  MODERATOR,
  ADMIN
}


export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  imageUrl: z.string().nullable(),
  role: z.nativeEnum(UserRole)
});

