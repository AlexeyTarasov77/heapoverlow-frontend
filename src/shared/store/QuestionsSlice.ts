import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../types/questions";
import { IReqState } from "../api/client";

export type QuestionsState = { likedQuestionsIds: number[] } & IReqState<IQuestion>

const initialState: QuestionsState = {
  likedQuestionsIds: [],
  isLoading: false,
  error: undefined
}

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {}
})

