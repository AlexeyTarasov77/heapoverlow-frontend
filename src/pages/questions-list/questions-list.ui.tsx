import { useEffect, useState } from "react";
import { KeyboardEvent } from "react";
import { fetchQuestionsList } from "./api/main";
import { IQuestion } from "./api/interfaces";
import { Link } from "react-router-dom";
import { Question } from "../../widgets/question";
import { Button } from "../../shared/ui";

export function QuestionsList() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [queryParams, setQueryParams] = useState<{
    sort?: string;
    tags?: string[];
  }>({});
  const [inputEnteredTags, setInputEnteredTags] = useState<string[]>([]);
  const [tagsInputVal, setTagsInputVal] = useState<string>("");

  useEffect(() => {
    fetchQuestionsList(queryParams)
      .then(questions => setQuestions(questions))
  }, [queryParams]);

  const tagsInputHandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case " ":
        if (tagsInputVal.trim() !== "") {
          setInputEnteredTags([...inputEnteredTags, tagsInputVal.trim()]);
          setTagsInputVal("");
        }
        break;
      case "Enter":
        if (inputEnteredTags.length) {
          setQueryParams({ tags: inputEnteredTags });
          setInputEnteredTags([]);
          setTagsInputVal("");
        }
    }
  };

  const removeTag = (index: number) => {
    setInputEnteredTags(inputEnteredTags.filter((_, i) => i !== index));
  };

  function FilterButton({
    children,
    params
  }: {
    children: string;
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
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <h2 className="font-bold text-3xl text-black">All questions</h2>
        <div>
          <Button size="lg">Ask question</Button>
        </div>
      </div>
      <div>
        <Button><Link to={"/questions/liked"}>Liked questions</Link></Button>
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
          <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded max-w-xs">
            {inputEnteredTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(index)}
                  className="text-slate-500 transition-colors hover:text-red-600 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={tagsInputVal}
              onChange={e => setTagsInputVal(e.target.value)}
              onKeyDown={tagsInputHandleKeyDown}
              className="flex-grow outline-none px-2 py-1"
              placeholder="Tags"
            />
          </div>
        </div>
      </div>
      <div className="border"></div>
      <div className="flex flex-col">
        {questions.map((questionData: IQuestion) => {
          return (
            <>
              <Question key={questionData.id} questionData={questionData} />
              <div className="border border-gray-400"></div>
            </>
          )
        })}
      </div>
    </div>
  );
}
