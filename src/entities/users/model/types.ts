import { z } from "zod";
import { UserSchema } from "./schemas";
import { ReqState } from "../../../shared/api/client";

export type User = z.infer<typeof UserSchema>;

export type UsersState = {
  user?: User;
} & ReqState;

