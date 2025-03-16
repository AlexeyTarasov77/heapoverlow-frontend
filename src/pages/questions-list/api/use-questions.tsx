import { SERVER_URL } from "../../../app/constants";
import { ReqState, useReq } from "../../../shared/api/client";
import { IQuestion } from "../../../shared/api/questions/types";

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}

export function useQuestions(
  queryParams: IQueryParams,
): ReqState<IQuestion[]> {
  const params = new URLSearchParams();
  if (queryParams.sort) {
    params.append("sort", queryParams.sort);
  }
  if (queryParams.filter) {
    params.append("filter", queryParams.filter);
  }
  if (queryParams.tags) {
    queryParams.tags.forEach((tag) => params.append("tags", String(tag)));
  }
  const url = new URL("/questions", SERVER_URL);
  url.search = params.toString();
  return useReq<IQuestion[]>(url, undefined, [queryParams]);
}
