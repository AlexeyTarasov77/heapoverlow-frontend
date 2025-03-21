import { APIResponse } from "../../../shared/api/types";
import { ICreateQuestionForm, Question, QuestionID } from "../model/types";
import { QuestionIDSchema, QuestionSchema } from "../model/schemas";
import { GET, POST } from "../../../shared/api/client";

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
  },
  createQuestion: async (data: ICreateQuestionForm): APIResponse<QuestionID> => {
    const resp = await POST<Question>("/questions/", data);
    if (resp.success) {
      return { ...resp, data: QuestionIDSchema.parse(resp.data.id) };
    }
    return resp;
  }
};
