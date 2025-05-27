"use client"
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { loadUserByToken } from "../entities/users";
import { fetchQuestions, loadLikedQuestionIds } from "../entities/questions";
import { ShowNotification } from "../widgets/notifications";

export function ClientApp({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.common.alert)
  useEffect(() => {
    dispatch(loadUserByToken());
    dispatch(loadLikedQuestionIds());
    dispatch(fetchQuestions({}));
  });
  return (
    <div className="w-full h-full">
      {alert && <ShowNotification>{alert}</ShowNotification>}
      {children}
    </div>
  )
}
