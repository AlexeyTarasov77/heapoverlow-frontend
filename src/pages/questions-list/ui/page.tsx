import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FilterButton } from "./FilterButton";
import { Link } from "react-router-dom";
import { Loader, TagInput } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Divider } from "@mui/material";
import { QuestionPreview } from "../../../widgets/question";
import { fetchQuestions, IQueryParams } from "../../../entities/questions";


export function QuestionsListPage() {
  const [queryParams, setQueryParams] = useState<IQueryParams>({});
  const dispatch = useAppDispatch();
  const { questions, error, isLoading, likedQuestionsIds } = useAppSelector(
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
    return <Loader />
  }
  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
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
                <>
                  <QuestionPreview
                    isLiked={likedQuestionsIds.includes(question.id)}
                    key={question.id}
                    data={question}
                    tagOnClick={(e) =>
                      setQueryParams({ tags: [e.currentTarget.innerText] })
                    }
                  />
                  <Divider />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
