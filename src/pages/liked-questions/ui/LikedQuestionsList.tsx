import { useContext } from "react";
import { LikeQuestionsCtx } from "../../../context/like-questions";
import { Question } from "../../../widgets/question";

export function LikedQuestionsListPage() {
  const ctx = useContext(LikeQuestionsCtx);
  if (!ctx) {
    throw Error("Context not provided");
  }
  const questions = ctx.useLikedQuestions();
  return (
    <div className="flex flex-col gap-5 p-5">
      {questions.map((question) => (
        <Question key={question.id} questionData={question} />
      ))}
    </div>
  );
}
