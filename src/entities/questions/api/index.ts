import { APIResponse } from "../../../shared/api/types";
import {
  ICreateQuestionForm,
  QuestionDetail,
  QuestionID,
} from "../model/types";
import { IDSchema } from "../model/@x/users";
import { GET, POST } from "../../../shared/api/client";
import {
  QuestionExtendedSchema,
  QuestionWithAuthorSchema,
} from "../model/schemas";
import { Question } from "../model/types";
import { SERVER_URL } from "../../../shared/constants";

// TODO: throw error if response is not success
export const questionsApi = {
  getQuestions: async (query?: URLSearchParams): APIResponse<Question[]> => {
    const url = new URL("/questions", SERVER_URL);
    if (query) {
      url.search = query.toString();
    }
    const resp = await GET(url);
    if (resp.success) {
      return {
        ...resp,
        data: QuestionWithAuthorSchema.array().parse(resp.data),
      };
    }
    return resp;
  },
  getQuestionByID: async (questionID: number): APIResponse<QuestionDetail> => {
    const resp = await GET("/questions/" + questionID);
    if (resp.success) {
      return { ...resp, data: QuestionExtendedSchema.parse(resp.data) };
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
      return {
        ...resp,
        data: QuestionWithAuthorSchema.array().parse(resp.data),
      };
    }
    return resp;
  },
  createQuestion: async (
    data: ICreateQuestionForm,
  ): APIResponse<QuestionID> => {
    const resp = await POST<Question>("/questions/", data);
    if (resp.success) {
      return { ...resp, data: IDSchema.parse(resp.data.id) };
    }
    return resp;
  },
};
