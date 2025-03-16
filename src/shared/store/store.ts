import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { questionsSlice } from "./QuestionsSlice";
import { usersSlice } from "./UsersSlice";

const reducer = combineSlices(questionsSlice, usersSlice)

export const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<typeof store>()
