import { IQuestion } from "../../../shared/api/questions/types";
import { IReqState, useReq } from "../../../shared/api/client";

export function useQuestionById(id: number): IReqState<IQuestion> {
  return useReq<IQuestion>(`/questions/${id}`);
}
