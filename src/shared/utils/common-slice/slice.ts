import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState, AlertT } from "./types";
import { createAppAsyncThunk } from "../../../app/hooks";

const initialState: CommonState = {};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertT>) => {
      state.alert = action.payload;
    },
    hideAlert: (state, _) => {
      state.alert = undefined;
    },
  },
});

export const showAlert = createAppAsyncThunk(
  "common/handleAlert",
  async (alert: AlertT, { dispatch }) => {
    const { setAlert, hideAlert } = commonSlice.actions;
    dispatch(setAlert(alert));
    setTimeout(() => dispatch(hideAlert({})), 2500);
  },
);
