import { z } from "zod";
import { QuestionSchema } from "./schemas";
import { ReqState } from "../../../shared/api/client";

export type Question = z.infer<typeof QuestionSchema>;

export type QuestionID = number

export type QuestionsState = {
  likedQuestionsIds: QuestionID[];
  questionDetail?: Question;
  questions: Question[];
} & ReqState;

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}
