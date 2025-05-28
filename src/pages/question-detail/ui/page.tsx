import { Badge } from "../../../shared/ui";
import { Answer } from "./answer";
import { notFound } from "next/navigation";
import { use } from "react";
import { questionsApi } from "../../../entities/questions/api";

export function QuestionPage({ questionID }: { questionID: number }) {
  const resp = use(questionsApi.getQuestionByID(questionID))
  if (!resp.success) {
    return notFound()
  }
  const questionDetail = resp.data
  return (
    <div className="p-3 flex flex-col max-w-screen-lg">
      <div className="font-bold text-2xl">{questionDetail.title}</div>
      <div className="mt-5 flex gap-4 text-lg">
        <div>
          <span className="text-slate-400">Asked: </span>
          {questionDetail.createdAt.toLocaleString()}
        </div>
        <div>
          <span className="text-slate-400">Modified: </span>
          {questionDetail.updatedAt.toLocaleString()}
        </div>
      </div>
      <div className="border border-slate-400"></div>
      <div className="text-lg">{questionDetail.body}</div>
      <div className="mt-5 flex gap-3">
        {questionDetail.tags.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </div>
      <div className="flex flex-col gap-5 mt-16">
        {questionDetail.answers.map((answer) => (
          <Answer item={answer} />
        ))}
      </div>
    </div>
  );
}
