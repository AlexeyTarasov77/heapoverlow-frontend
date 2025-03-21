import { z } from "zod";
import { UserSchema } from "./schemas";
import { ReqState } from "../../../shared/api/types";

export type User = z.infer<typeof UserSchema>;

export type UsersState = {
  user?: User;
} & ReqState;


export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends ISignInForm {
  username: string;
  location: string;
}
