import { SERVER_URL } from "../../app/constants";

interface IResponseSuccess<T> {
  success: true;
  data: T;
}

interface IResponseFailure {
  success: false;
  message: string;
}

export type APIResponse<T> = Promise<IResponseFailure | IResponseSuccess<T>>;

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
  console.log("authToken", authToken);
  if (authToken) {
    const headers = new Headers(options?.headers);
    console.log("headers", headers);
    headers.append("Authorization", `Bearer ${authToken}`);
    console.log("headers", headers);
    if (options) {
      options.headers = headers;
    } else {
      options = { headers };
    }
  }
  console.log("options", options);
  return fetch(url, options).then((resp) => resp.json());
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

export type ReqState = {
  error?: string;
  isLoading: boolean;
}


// export function useReq<T>(
//   path: string | URL,
//   reqCallback?: (data: Record<string, any>) => Promise<T>,
//   deps?: React.DependencyList,
// ): ReqState<T> {
//   const [error, setError] = useState<string | undefined>(undefined);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [data, setData] = useState<T | undefined>(undefined);
//   useEffect(() => {
//     sendReq(path)
//       .then(async (data) => {
//         setIsLoading(false);
//         const processedData = reqCallback
//           ? await reqCallback(data)
//           : (data as T);
//         setData(processedData);
//       })
//       .catch((err) => setError(String(err)));
//   }, deps);
//   return { data, isLoading, error };
// }
