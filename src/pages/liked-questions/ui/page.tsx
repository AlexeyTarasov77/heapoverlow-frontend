import { QuestionPreview } from "../../../widgets/question";
import { useAppSelector } from "../../../app/hooks";
import { Divider } from "@mui/material";

export function LikedQuestionsListPage() {
  const { questions, likedQuestionsIds } = useAppSelector(
    (state) => state.questions,
  );
  const likedQuestions = questions.filter((q) =>
    likedQuestionsIds.includes(q.id),
  );
  return (
    <div className="flex flex-col gap-5 p-5">
      {likedQuestions.map((question) => (
        <div>
          <QuestionPreview key={question.id} data={question} isLiked={true} />
          <Divider />
        </div>
      ))}
    </div>
  );
}
