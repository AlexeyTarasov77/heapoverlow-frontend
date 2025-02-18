import { Link } from "react-router-dom";
import { Badge } from "../../../shared/ui";
import { IQuestion } from "../../../shared/api/questions";
import { LikeButton } from "../../../widgets/like-button";
import { humanizeDate } from "../../../utils";

export function QuestionPreview({ question, tagOnClick }: { question: IQuestion, tagOnClick?: React.MouseEventHandler<HTMLSpanElement> }) {
  const likesStoringKey = "likedQuestionsIds";
  return (
    <div className="flex gap-3 p-5">
      <div className="flex flex-col gap-3">
        <Badge color="blue" size="xs">
          {question.answersCount} answers
        </Badge>
        <div>
          <LikeButton objID={question.id} storingKey={likesStoringKey} />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl text-blue-500 font-semibold">
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
        </h3>
        <p className="text-slate-400 truncate">{question.body}</p>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-2">
            {question.tags.map((tag, index) => (
              <Badge key={index} onClick={tagOnClick}>{tag}</Badge>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={
                  question.author.imageUrl ||
                  `https://robohash.org/${question.id}.png?size=50x50`
                }
                alt=""
                width={50}
                height={50}
              />
            </div>
            <div className="text-sm text-blue-600">
              {question.author.username}
            </div>
            <div className="text-slate-500">
              asked {humanizeDate(question.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
