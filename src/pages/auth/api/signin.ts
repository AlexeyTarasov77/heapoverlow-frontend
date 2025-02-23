import { POST } from "../../../shared/api/client";

export interface ISignInForm {
  email: string;
  password: string;
}

export async function signin(data: ISignInForm) {
  return await POST("/users/signin", data);
}
