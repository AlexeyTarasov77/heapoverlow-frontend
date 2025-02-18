import { ReactNode } from "react";
import { Button } from "../../../shared/ui";
import { IQuestion } from "../../../shared/api/questions";
import { QuestionPreview } from "./QuestionPreview";
import { TagInput } from "./TagInput";
import { useQuestions } from "./use-questions";

export function QuestionsListPage() {
  const { questions, setQueryParams, error, isLoading } = useQuestions();

  function FilterButton({
    children,
    params
  }: {
    children: ReactNode;
    params: { [key: string]: string };
  }) {
    const handleOnClick = () => {
      setQueryParams(params);
    };
    return (
      <button
        onClick={handleOnClick}
        className="text-sm text-slate-500 transition-colors p-1 hover:bg-slate-100"
      >
        {children}
      </button>
    );
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
              <FilterButton params={{ sort: "newest" }}>Newest</FilterButton>
              <FilterButton params={{ sort: "mostAnswers" }}>
                Most answers
              </FilterButton>
              <FilterButton params={{}}>Unanswered</FilterButton>
            </div>
            <div>
              <TagInput onSubmit={tags => setQueryParams({ tags })} />
            </div>
          </div>
          <div className="border"></div>
          <div className="flex flex-col">
            {questions.map((question: IQuestion) => {
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
