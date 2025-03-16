import { sendReq } from "../../../shared/api/client";

export async function checkAuthenticated(): Promise<boolean> {
  const resp = await sendReq("/users/me");
  return resp.success;
}
