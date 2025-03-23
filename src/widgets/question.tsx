import { Link } from "react-router-dom";
import { Badge } from "../shared/ui";
import { useAppDispatch } from "../app/hooks";
import { toggleLikeQuestion, Question } from "../entities/questions";
import { humanizeDate } from "../shared/utils";

interface IProps {
  data: Question;
  tagOnClick?: React.MouseEventHandler<HTMLSpanElement>;
  isLiked: boolean;
}

export function QuestionPreview({ data, isLiked, tagOnClick }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-3 p-5">
      <div className="flex flex-col gap-3">
        <Badge color="blue" size="xs">
          {data.answersCount} answers
        </Badge>
        <div>
          <button
            className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500"
            onClick={() => dispatch(toggleLikeQuestion(data.id))}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl text-blue-500 font-semibold">
          <Link to={`/questions/${data.id}`}>{data.title}</Link>
        </h3>
        <p className="text-slate-400 truncate">{data.body}</p>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-2">
            {data.tags.map((tag, index) => (
              <Badge key={index} onClick={tagOnClick}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={
                  data.author.imageUrl ||
                  `https://robohash.org/${data.id}.png?size=50x50`
                }
                alt=""
                width={50}
                height={50}
              />
            </div>
            <div className="text-sm text-blue-600">{data.author.username}</div>
            <div className="text-slate-500">
              asked {humanizeDate(data.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
