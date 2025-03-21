import { APIResponse } from "../../../shared/api/types";
import { Question } from "../model/types";
import { QuestionSchema } from "../model/schemas";
import { GET } from "../../../shared/api/client";

export const questionsApi = {
  getQuestions: async (): APIResponse<Question[]> => {
    const resp = await GET("/questions");
    if (resp.success) {
      return { ...resp, data: QuestionSchema.array().parse(resp.data) };
    }
    return resp;
  },
  getQuestionByID: async (questionID: number): APIResponse<Question> => {
    const resp = await GET("/questions/" + questionID);
    if (resp.success) {
      return { ...resp, data: QuestionSchema.parse(resp.data) };
    }
    return resp;
  },
  getQuestionsByIds: async (ids: number[]): APIResponse<Question[]> => {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", String(id)));
    const url = new URL("/questions/get-by-ids");
    url.search = params.toString();
    const resp = await GET(url.toString());
    if (resp.success) {
      return { ...resp, data: QuestionSchema.array().parse(resp.data) };
    }
    return resp;
  }
};
