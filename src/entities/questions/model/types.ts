import { z } from "zod";
import { QuestionIDSchema, QuestionSchema } from "./schemas";
import { ReqState } from "../../../shared/api/types"

export type Question = z.infer<typeof QuestionSchema>;

export type QuestionID = z.infer<typeof QuestionIDSchema>;

export interface ICreateQuestionForm {
  title: string;
  body: string;
  tags: string[];
}

export type QuestionsState = {
  lastCreatedID?: number
  likedQuestionsIds: QuestionID[];
  questionDetail?: Question;
  questions: Question[];
} & ReqState;

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}
