import { GET, POST } from "../../../shared/api/client";
import { z } from "zod";
import { UserExtendedSchema } from "../model/schemas";
import { User } from "../model/types";
import { ISignUpForm, ISignInForm } from "../model/types";
import { APIResponse } from "../../../shared/api/types";

export const usersApi = {
  signUp: async (data: ISignUpForm): APIResponse<any> => {
    const resp = await POST("/users/signup", data);
    // if (resp.success) {
    //   return { ...resp, data: UserSchema.parse(resp.data) };
    // }
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
      return { ...resp, data: UserExtendedSchema.parse(resp.data) };
    }
    return resp;
  },
};
