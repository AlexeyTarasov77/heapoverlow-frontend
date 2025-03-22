import { Badge, Loader } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { useIdParam } from "../../../shared/hooks/use-id-param";
import { fetchQuestionByID } from "../../../entities/questions";
import { ShowNotification } from "../../../widgets/notifications";

export function QuestionPage() {
  const questionID = useIdParam();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQuestionByID(questionID));
  }, [dispatch]);
  const { questionDetail, isLoading } = useAppSelector(
    (state) => state.questions,
  );
  const alert = useAppSelector(state => state.common.alert)
  if (isLoading) {
    return <Loader />
  }

  return (
    <>{alert && <ShowNotification>{alert}</ShowNotification>}
      {questionDetail &&
        <div className="p-3 flex flex-col">
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
        </div>
      }
    </>
  );
}
