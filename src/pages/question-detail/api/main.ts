import { SERVER_URL } from "../../../app/constants";
import { IQuestion } from "../../../shared/api/questions";

export async function fetchQuestion(id: number): Promise<IQuestion> {
    return fetch(`${SERVER_URL}/questions/${id}`)
        .then(resp => resp.json())
        .then((question: IQuestion) => {
            question.createdAt = new Date(question.createdAt);
            question.updatedAt = new Date(question.updatedAt);
            return question;
        })
}