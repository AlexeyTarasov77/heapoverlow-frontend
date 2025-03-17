import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Alert } from "../types/common"
import { createAppAsyncThunk } from "../../app/hooks"

type CommonState = {
  alert?: Alert
}

const initialState: CommonState = {}


export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.alert = action.payload
    },
    hideAlert: (state, _) => {
      state.alert = undefined
    },
  }
})


export const showAlert = createAppAsyncThunk(
  "common/handleAlert",
  async (alert: Alert, { dispatch }) => {
    const { setAlert, hideAlert } = commonSlice.actions
    dispatch(setAlert(alert));
    setTimeout(() => dispatch(hideAlert({})), 2500)
  }
);

