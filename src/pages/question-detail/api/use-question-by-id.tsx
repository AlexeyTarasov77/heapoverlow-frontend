import { IQuestion } from "../../../shared/api/questions/types";
import { ReqState, useReq } from "../../../shared/api/client";

export function useQuestionById(id: number): ReqState<IQuestion> {
  return useReq<IQuestion>(`/questions/${id}`);
}
