import { SERVER_URL } from "../constants";
import { APIResponse } from "./types";

export const authTokenKey = "authToken";

export async function sendReq<T>(
  path: string | URL,
  options?: RequestInit,
): APIResponse<T> {
  let url: string = `${SERVER_URL}${path}`;
  if (path instanceof URL) {
    url = path.toString();
  }
  const authToken = localStorage.getItem(authTokenKey);
  if (authToken) {
    const headers = new Headers(options?.headers);
    headers.append("Authorization", `Bearer ${authToken}`);
    if (options) {
      options.headers = headers;
    } else {
      options = { headers };
    }
  }
  // options = { ...options, credentials: "include" }
  const resp = await fetch(url, options);
  const data = await resp.json();
  return { ...data, status: resp.status };
}

export async function GET<T>(path: string | URL): APIResponse<T> {
  return await sendReq(path);
}

export async function POST<T>(
  path: string | URL,
  data: object,
): APIResponse<T> {
  return await sendReq(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}
