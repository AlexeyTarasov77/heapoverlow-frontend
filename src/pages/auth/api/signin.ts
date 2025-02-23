import { POST } from "../../../shared/api/client";

export interface ISignInForm {
  email: string;
  password: string;
}

export function signin(data: ISignInForm) {
  return POST("/users/signin", data);
}
