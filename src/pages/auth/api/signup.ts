import { POST } from "../../../shared/api/client";
import { ISignInForm } from "./signin";

export interface ISignUpForm extends ISignInForm {
  username: string;
  location: string;
}

export async function signup(data: ISignUpForm) {
  return await POST("/users/signup", data)
}
