import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReqState } from "../api/client";
import { SERVER_URL } from "../../app/constants";
import { questionsApi } from "../api/questionsApi";
import { Question } from "../api/entities";

export type QuestionsState = { likedQuestionsIds: number[] } & IReqState<
  Question[]
>;

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}

export const fetchQuestions = createAsyncThunk<Question[], IQueryParams>(
  "questions/fetchAll",
  async (queryParams, thunkAPI) => {
    const params = new URLSearchParams();
    if (queryParams.sort) {
      params.append("sort", queryParams.sort);
    }
    if (queryParams.filter) {
      params.append("filter", queryParams.filter);
    }
    if (queryParams.tags) {
      queryParams.tags.forEach((tag) => params.append("tags", String(tag)));
    }
    const url = new URL("/questions", SERVER_URL);
    url.search = params.toString();
    const resp = await questionsApi.getQuestions();
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
);

const initialState: QuestionsState = {
  likedQuestionsIds: [],
  isLoading: false,
  error: undefined,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
