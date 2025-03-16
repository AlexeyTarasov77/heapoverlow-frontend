import { APIResponse, GET } from "./client";
import { Question, QuestionSchema } from "./entities";

export const questionsApi = {
  getQuestions: async (): APIResponse<Question[]> => {
    const resp = await GET("/questions");
    console.log("response", resp)
    if (resp.success) {
      const validated = { ...resp, data: QuestionSchema.array().parse(resp.data) };
      console.log("response validated", validated)
      return validated
    }
    return resp;
  },
};
