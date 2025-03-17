import { APIResponse, GET, POST } from "./client";
import { z } from "zod";
import { User, UserSchema } from "./entities";

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends ISignInForm {
  username: string;
  location: string;
}

export const usersApi = {
  signUp: async (data: ISignUpForm): APIResponse<User> => {
    const resp = await POST("/users/signup", data);
    if (resp.success) {
      return { ...resp, data: UserSchema.parse(resp.data) };
    }
    return resp;
  },
  signIn: async (data: ISignInForm): APIResponse<string> => {
    const resp = await POST("/users/signin", data);
    if (resp.success) {
      return { ...resp, data: z.string().parse(resp.data) };
    }
    return resp;
  },
  getMe: async (): APIResponse<User> => {
    const resp = await GET("/users/me");
    if (resp.success) {
      return { ...resp, data: UserSchema.parse(resp.data) };
    }
    return resp;
  },
};
