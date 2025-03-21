import { questionsSlice, usersSlice } from "../shared/store";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "../shared/store/CommonSlice";

const reducer = combineSlices(questionsSlice, usersSlice, commonSlice);

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
