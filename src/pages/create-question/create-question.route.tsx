import { RouteObject } from "react-router-dom";
import { CreateQuestion } from "./create-question.ui";

export const createQuestionRoute: RouteObject = {
    path: "/questions/create",
    element: <CreateQuestion />
}