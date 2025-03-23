import { z } from "zod";
import { UserExtendedSchema } from "./schemas";
import { ReqState } from "../../../shared/api/types";
export { UserRole } from "./@x/questions";

export type User = z.infer<typeof UserExtendedSchema>;

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
