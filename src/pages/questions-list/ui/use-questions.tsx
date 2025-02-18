import { useEffect, useState } from "react";
import { fetchQuestionsList } from "../api/main";
import { IQuestion } from "../../../shared/api/questions";
export function useQuestions(): {
  questions: IQuestion[];
  setQueryParams: React.Dispatch<
    React.SetStateAction<{
      sort?: string;
      tags?: string[];
    }>
  >;
  isLoading: boolean;
  error?: string;
} {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [queryParams, setQueryParams] = useState<{
    sort?: string;
    tags?: string[];
  }>({});

  useEffect(() => {
    fetchQuestionsList(queryParams).then(questions => {
      setIsLoading(false);
      setQuestions(questions);
    }).catch(err => setError(err.message));
  }, [queryParams]);
  return { questions, setQueryParams, isLoading, error };
}
