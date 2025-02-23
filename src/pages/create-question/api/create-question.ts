import { sendReq } from "../../../shared/api/client";
import { ICreateQuestionForm } from "../ui/CreateQuestionPage";

export async function createQuestion(data: ICreateQuestionForm) {
  await sendReq("/questions/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
