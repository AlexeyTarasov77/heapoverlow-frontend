import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { questionsSlice } from "../entities/questions";
import { usersSlice } from "../entities/users";
import { commonSlice } from "../shared/utils/common-slice";

const reducer = combineSlices(questionsSlice, usersSlice, commonSlice);

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
