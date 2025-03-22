import { z } from "zod";
import { IDSchema } from "./@x/users";
import { ReqState } from "../../../shared/api/types"
import { QuestionExtendedSchema, QuestionWithAuthorSchema } from "./schemas";

export type QuestionDetail = z.infer<typeof QuestionExtendedSchema>;
export type Question = z.infer<typeof QuestionWithAuthorSchema>

export type QuestionID = z.infer<typeof IDSchema>;

export interface ICreateQuestionForm {
  title: string;
  body: string;
  tags: string[];
}

export type QuestionsState = {
  lastCreatedID?: number
  likedQuestionsIds: QuestionID[];
  questionDetail?: QuestionDetail;
  questions: Question[];
} & ReqState;

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}
