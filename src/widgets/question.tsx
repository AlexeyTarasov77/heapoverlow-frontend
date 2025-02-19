import { Link } from "react-router-dom";
import { IQuestion } from "../shared/api/questions/types";
import { useContext } from "react";
import { LikeQuestionsCtx } from "../context/like-questions";
import { Badge } from "../shared/ui";
import { humanizeDate } from "../shared/ui/utils";

export function Question({ questionData }: { questionData: IQuestion }) {
  const ctx = useContext(LikeQuestionsCtx)
  if (!ctx)
    throw Error("Question: no LikeQuestionCtx provided")
  const { toggleLike, checkIsLiked } = ctx
  return (
    <div className="flex gap-3 p-5">
      <div className="flex flex-col gap-3">
        <Badge color="blue" size="xs">
          {questionData.answersCount} answers
        </Badge>
        <div>
          <button
            className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500"
            onClick={(_) => toggleLike(questionData.id)}
          >
            {checkIsLiked(questionData.id) ? "Unlike" : "Like"}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl text-blue-500 font-semibold">
          <Link to={`/questions/${questionData.id}`}>{questionData.title}</Link>
        </h3>
        <p className="text-slate-400 truncate">{questionData.body}</p>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-2">
            {questionData.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={
                  questionData.author.imageUrl ||
                  `https://robohash.org/${questionData.id}.png?size=50x50`
                }
                alt=""
                width={50}
                height={50}
              />
            </div>
            <div className="text-sm text-blue-600">
              {questionData.author.username}
            </div>
            <div className="text-slate-500">
              asked {humanizeDate(questionData.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
