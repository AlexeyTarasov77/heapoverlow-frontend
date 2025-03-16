import { useEffect, useState } from "react";
import { QuestionPreview } from "./QuestionPreview";
import Button from "@mui/material/Button";

import { IQueryParams } from "../api/use-questions";
import { FilterButton } from "./FilterButton";
import { Link } from "react-router-dom";
import { TagInput } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { fetchQuestions } from "../../../shared/store/QuestionsSlice";

export function QuestionsListPage() {
  const [queryParams, setQueryParams] = useState<IQueryParams>({});
  const dispatch = useAppDispatch()
  const { data: questions, error, isLoading } = useAppSelector(state => state.questions)
  useEffect(() => {
    dispatch(fetchQuestions(queryParams))
  }, [dispatch, queryParams])
  const filters: Record<string, IQueryParams | undefined> = {
    Newest: { sort: "newest" },
    "Most answers": { sort: "mostAnswers" },
    All: {},
    Unanswered: { filter: "unanswered" },
  };
  const [selectedFilter, setSelectedFilter] = useState<number>(
    Object.keys(filters).indexOf("All"),
  );

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <h3 className="text-3xl text-center mt-10">Loading...</h3>}
      {questions && (
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold text-3xl text-black">All questions</h2>
            <div>
              <Button variant="contained">
                <Link to={"/questions/create"}>Ask question</Link>
              </Button>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-end">
            <div className="border border-slate-300 rounded-sm flex gap-3 p-1">
              {Object.entries(filters).map(([key, params], index) => (
                <FilterButton
                  clicked={index == selectedFilter}
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
                <>
                  <QuestionPreview
                    key={question.id}
                    question={question}
                    tagOnClick={(e) =>
                      setQueryParams({ tags: [e.currentTarget.innerText] })
                    }
                  />
                  <div className="border border-gray-400"></div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
