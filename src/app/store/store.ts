"use client"
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { questionsSlice } from "../../entities/questions";
import { usersSlice } from "../../entities/users";
import { commonSlice } from "../../shared/utils/common-slice";

const reducer = combineSlices(questionsSlice, usersSlice, commonSlice);

export const makeStore = () => {
  return configureStore({
    reducer
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
