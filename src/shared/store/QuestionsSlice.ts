import { createSlice } from "@reduxjs/toolkit";
import { ReqState } from "../api/client";
import { SERVER_URL } from "../../app/constants";
import { questionsApi } from "../api/questionsApi";
import { Question } from "../api/entities";
import { createAppAsyncThunk } from "../../app/hooks";
import { showAlert } from "./CommonSlice";

export type QuestionsState = {
  likedQuestionsIds: number[],
  questionDetail?: Question;
  questions: Question[]
} & ReqState;

export interface IQueryParams {
  sort?: string;
  filter?: string;
  tags?: string[];
}

export const fetchQuestions = createAppAsyncThunk<Question[], IQueryParams>(
  "questions/fetchAll",
  async (queryParams, { dispatch }) => {
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
      dispatch(showAlert({ severity: "error", message: resp.message }))
      throw new Error(resp.message);
    }
    return resp.data;
  },
);

export const fetchQuestionByID = createAppAsyncThunk<Question, number>(
  "questions/fetchByID",
  async (questionID, { dispatch }) => {
    const resp = await questionsApi.getQuestionByID(questionID)
    if (!resp.success) {
      dispatch(showAlert({ severity: "error", message: resp.message }))
      throw new Error(resp.message)
    }
    return resp.data
  }
)

const initialState: QuestionsState = {
  likedQuestionsIds: [],
  isLoading: false,
  error: undefined,
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchQuestionByID.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestionByID.fulfilled, (state, action) => {
        state.questionDetail = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchQuestionByID.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
