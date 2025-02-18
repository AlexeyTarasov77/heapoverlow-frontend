import { IQuestion } from "./interfaces";

export function parseQuestions(questions: IQuestion[]): IQuestion[] {
  questions.forEach(q => {
    q.createdAt = new Date(q.createdAt)
    q.updatedAt = new Date(q.updatedAt)
  })
  return questions

}
