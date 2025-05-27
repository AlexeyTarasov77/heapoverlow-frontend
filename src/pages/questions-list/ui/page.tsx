"use client"
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FilterButton } from "./FilterButton";
import { Loader, TagInput } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { Divider, Paper } from "@mui/material";
import { QuestionPreview } from "../../../widgets/question";
import { fetchQuestions, IQueryParams } from "../../../entities/questions";
import Link from "next/link";

export function QuestionsListPage() {
  const [queryParams, setQueryParams] = useState<IQueryParams>({});
  const dispatch = useAppDispatch();
  const { questions, isLoading, likedQuestionsIds } = useAppSelector(
    (state) => state.questions,
  );
  useEffect(() => {
    dispatch(fetchQuestions(queryParams));
  }, [dispatch, queryParams]);
  const filters: Record<string, IQueryParams | undefined> = {
    Newest: { sort: "newest" },
    "Most answers": { sort: "mostAnswers" },
    All: {},
    Unanswered: { filter: "unanswered" },
  };
  const [selectedFilter, setSelectedFilter] = useState<number>(
    Object.keys(filters).indexOf("All"),
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h2 className="font-bold text-3xl text-black">All questions</h2>
        <Paper elevation={6}>
          <Button variant="contained">
            <Link href={"/questions/create"}>Ask question</Link>
          </Button>
        </Paper>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="border border-slate-300 rounded-sm flex gap-3 p-1">
          {Object.entries(filters).map(([key, params], index) => (
            <FilterButton
              isClicked={index == selectedFilter}
              key={index}
              onClick={() => {
                if (index != selectedFilter) {
                  setSelectedFilter(index);
                  setQueryParams((prev) =>
                    params ? { ...prev, ...params } : {},
                  );
                }
              }}
            >
              {key}
            </FilterButton>
          ))}
        </div>
        <div>
          <TagInput
            className="max-w-xs"
            onSubmit={(tags) =>
              setQueryParams((prev) => ({ ...prev, tags }))
            }
          />
        </div>
      </div>
      <div className="border"></div>
      <div className="flex flex-col">
        {questions.map((question) => {
          return (
            <div key={question.id}>
              <QuestionPreview
                isLiked={likedQuestionsIds.includes(question.id)}
                key={question.id}
                data={question}
                tagOnClick={(e) =>
                  setQueryParams({ tags: [e.currentTarget.innerText] })
                }
              />
              <Divider />
            </div>
          );
        })}
      </div>
    </div>
  );
}
