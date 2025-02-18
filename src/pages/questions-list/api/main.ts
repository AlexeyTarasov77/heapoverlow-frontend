import { SERVER_URL } from "../../../app/constants";
import { IQuestion } from "../../../shared/api/questions";
import { parseQuestions } from "./utils";

export async function fetchQuestionsList(queryParams: { sort?: string, tags?: string[] }): Promise<IQuestion[]> {
    const params = new URLSearchParams();
    if (queryParams.sort) {
        params.append("sort", queryParams.sort);
    }
    if (queryParams.tags) {
        queryParams.tags.forEach(tag => params.append("tags", String(tag)));
    }
    const url = new URL(`${SERVER_URL}/questions`);
    url.search = params.toString();
    return fetch(url)
        .then(resp => resp.json())
        .then((questions: IQuestion[]) => {
            return parseQuestions(questions)
        })
}
