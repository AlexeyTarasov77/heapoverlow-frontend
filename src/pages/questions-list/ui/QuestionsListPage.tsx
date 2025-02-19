import { useState } from "react";
import { Button } from "../../../shared/ui";
import { QuestionPreview } from "./QuestionPreview";
import { TagInput } from "./TagInput";
import { IQueryParams, useQuestions } from "../api/use-questions";
import { FilterButton } from "./FilterButton";

export function QuestionsListPage() {
  const [queryParams, setQueryParams] = useState<IQueryParams>({})
  const { data: questions, error, isLoading } = useQuestions(queryParams);
  const [selectedFilter, setSelectedFilter] = useState<number>(-1)
  const filters: Record<string, IQueryParams> = {
    "Newest": { sort: "newest" },
    "Most answers": { sort: "mostAnswers" },
    "All": {},
    "Unanswered": { filter: "unanswered" }
  }

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <h3 className="text-3xl text-center mt-10">Loading...</h3>}
      {questions && (
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold text-3xl text-black">All questions</h2>
            <div>
              <Button size="lg">Ask question</Button>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-end">
            <div className="border border-slate-300 rounded-sm flex gap-3 p-1">
              {Object.entries(filters).map(([key, value], index) => (
                <FilterButton clicked={index == selectedFilter} key={index} onClick={() => {
                  setSelectedFilter(index)
                  setQueryParams(value)
                }}>{key}</FilterButton>
              ))}
            </div>
            <div>
              <TagInput onSubmit={tags => setQueryParams({ tags })} />
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
                    tagOnClick={e =>
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
