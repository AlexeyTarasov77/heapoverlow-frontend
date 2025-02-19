import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../app/constants"

export async function sendReq(path: string | URL): Promise<Record<string, any>> {
  let url: string = `${SERVER_URL}${path}`
  if (path instanceof URL) {
    url = path.toString()
  }
  return fetch(url)
    .then(resp => resp.json())
}
export interface IReqState<T> {
  data?: T;
  error?: string;
  isLoading: boolean;
}

export function useReq<T>(path: string | URL, reqCallback?: (data: Record<string, any>) => Promise<T>, deps?: React.DependencyList): IReqState<T> {
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | undefined>(undefined);
  useEffect(() => {
    sendReq(path).then(async (data) => {
      setIsLoading(false);
      const processedData = reqCallback ? await reqCallback(data) : (data as T)
      setData(processedData)
    })
      .catch(err => setError(String(err)))
  }, deps)
  return { data, isLoading, error }
}
