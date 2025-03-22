import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionsApi } from "../api";
import { ICreateQuestionForm, IQueryParams, QuestionDetail, QuestionID, QuestionsState } from "./types";
import { createAppAsyncThunk } from "../../../app/hooks";
import { LIKED_QUESTIONS_KEY, SERVER_URL } from "../../../shared/constants";
import { showAlert } from "../../../shared/utils";
import { Question } from "./types";


const initialState: QuestionsState = {
  likedQuestionsIds: [],
  isLoading: false,
  error: undefined,
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<QuestionID>) => {
      const isLiked = state.likedQuestionsIds.includes(action.payload)
      if (isLiked) {
        state.likedQuestionsIds = state.likedQuestionsIds.filter((value) => value !== action.payload)
        return
      }
      state.likedQuestionsIds.push(action.payload)
    },
    setLikedQuestionsIds: (state, action: PayloadAction<QuestionID[]>) => {
      state.likedQuestionsIds = action.payload
    }
  },
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
      })
      .addCase(createQuestion.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.lastCreatedID = action.payload;
        state.isLoading = false;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.lastCreatedID = undefined;
      })
  },
});


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
      dispatch(showAlert({ severity: "error", message: resp.message }));
      throw new Error(resp.message);
    }
    return resp.data;
  },
);

export const createQuestion = createAppAsyncThunk<QuestionID, ICreateQuestionForm>(
  "questions/createQuestion",
  async (data, { dispatch }) => {
    const resp = await questionsApi.createQuestion(data);
    if (!resp.success) {
      dispatch(showAlert({ severity: "error", message: resp.message }));
      throw new Error(resp.message);
    }
    return resp.data;
  }
)

export const loadLikedQuestionIds = createAppAsyncThunk(
  "questions/loadLikedQuestionIds",
  async (_, { dispatch }) => {
    const loaded: QuestionID[] = JSON.parse(localStorage.getItem(LIKED_QUESTIONS_KEY) || "[]")
    dispatch(questionsSlice.actions.setLikedQuestionsIds(loaded))
  }
)

export const toggleLikeQuestion = createAppAsyncThunk<void, QuestionID>(
  "questions/removeLikedQuestion",
  async (questionID, { getState, dispatch }) => {
    const isLiked = getState().questions.likedQuestionsIds.includes(questionID)
    dispatch(questionsSlice.actions.toggleLike(questionID))
    localStorage.setItem(
      LIKED_QUESTIONS_KEY,
      JSON.stringify(getState().questions.likedQuestionsIds)
    );
    const message = `Question ${!isLiked && "un"}liked`
    showAlert({ severity: "info", message })
  }
)


export const fetchQuestionByID = createAppAsyncThunk<QuestionDetail, number>(
  "questions/fetchByID",
  async (questionID, { dispatch }) => {
    const resp = await questionsApi.getQuestionByID(questionID);
    if (!resp.success) {
      dispatch(showAlert({ severity: "error", message: resp.message }));
      throw new Error(resp.message);
    }
    return resp.data;
  },
);

