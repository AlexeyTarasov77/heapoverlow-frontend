"use client"

import { QuestionPreview } from "../../../widgets/question";
import { useAppSelector } from "../../../app/store";
import { Box, Divider, Typography } from "@mui/material";

export function LikedQuestionsListPage() {
  const { questions, likedQuestionsIds, isLoading } = useAppSelector(
    (state) => state.questions,
  );
  if (!likedQuestionsIds.length && !isLoading) {
    return <Typography variant="h2">You don't have any liked questions yet</Typography>
  }
  const likedQuestions = questions.filter((q) =>
    likedQuestionsIds.includes(q.id),
  );
  console.log("liked questions", likedQuestions, likedQuestionsIds)
  return (
    <Box>
      <Typography variant="h2">Your liked questions</Typography>
      <div className="flex flex-col gap-5 p-5">
        {likedQuestions.map((question) => (
          <div key={question.id}>
            <QuestionPreview key={question.id} data={question} isLiked={true} />
            <Divider />
          </div>
        ))}
      </div>
    </Box>
  );
}
