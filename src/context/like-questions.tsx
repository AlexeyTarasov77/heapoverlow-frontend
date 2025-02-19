import { createContext, ReactNode, useEffect, useState } from "react";
import { LIKED_QUESTIONS_KEY, SERVER_URL } from "../app/constants";
import { IQuestion } from "../shared/api/questions/types";

interface LikeQuestionCtxI {
  useLikedQuestions: () => IQuestion[];
  checkIsLiked: (questionID: number) => boolean;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
  toggleLike: (questionID: number) => void
}
const getLikedQuestionsIds = (): number[] => {
  return JSON.parse(localStorage.getItem(LIKED_QUESTIONS_KEY) || "[]");
};
const checkIsLiked = (questionID: number): boolean => {
  return getLikedQuestionsIds().includes(questionID);
};

function useLikedQuestions(): IQuestion[] {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  useEffect(() => {
    const params = new URLSearchParams()
    getLikedQuestionsIds().forEach(id => params.append("ids", String(id)))
    const url = new URL(`${SERVER_URL}/questions/get-by-ids`)
    url.search = params.toString()
    console.log("URL", url.toString())
    fetch(url)
      .then(resp => resp.json())
      .then((questions: IQuestion[]) => setQuestions(questions))
  }, [])
  return questions
}

export const LikeQuestionsCtx = createContext<LikeQuestionCtxI | null>(null)

export function LikeQuestionsCtxProvider({ children }: { children: ReactNode }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const unlikeQuestion = (questionID: number): void => {
    localStorage.setItem(
      LIKED_QUESTIONS_KEY,
      JSON.stringify(getLikedQuestionsIds().filter(value => value !== questionID))
    );
    setIsLiked(false);
  };
  const likeQuestion = (questionID: number): void => {
    const likedQuestions = getLikedQuestionsIds();
    likedQuestions.push(questionID);
    localStorage.setItem(LIKED_QUESTIONS_KEY, JSON.stringify(likedQuestions));
    setIsLiked(true);
  };

  const toggleLike = (questionID: number) => {
    if (checkIsLiked(questionID)) {
      return unlikeQuestion(questionID);
    }
    likeQuestion(questionID);

  }
  return (
    <LikeQuestionsCtx.Provider value={{ toggleLike, isLiked, setIsLiked, checkIsLiked, useLikedQuestions }}>
      {children}
    </LikeQuestionsCtx.Provider>

  )

}
