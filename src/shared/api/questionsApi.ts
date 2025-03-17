import { APIResponse, GET } from "./client";
import { Question, QuestionSchema } from "./entities";

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
};
