import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/entities";
import { ISignInForm, ISignUpForm, usersApi } from "../api/usersApi"
import { authTokenKey, ReqState } from "../api/client";
import { createAppAsyncThunk } from "../../app/hooks";
import { showAlert } from "./CommonSlice";

export type UsersState = {
  user?: User;
} & ReqState;

const initialState: UsersState = {
  isLoading: false
};


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserByToken.pending, (state, _) => {
      state.isLoading = true
    })
      .addCase(loadUserByToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload
      })
      .addCase(loadUserByToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(userSignIn.pending, (state, _) => {
        state.isLoading = true
      })
      .addCase(userSignIn.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(userSignUp.pending, (state, _) => {
        state.isLoading = true
      })
      .addCase(userSignUp.fulfilled, (state, _) => {
        state.isLoading = false
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
});

export const loadUserByToken = createAppAsyncThunk("users/loadUserByToken",
  async (_, thunkAPI) => {
    console.log("loading user by token")
    const resp = await usersApi.getMe()
    console.log("user resp", resp)
    if (!resp.success) {
      if (resp.status == 401)
        localStorage.removeItem(authTokenKey)

      throw new Error(resp.message)
    }
    return resp.data
  }
)

export const userSignIn = createAppAsyncThunk<void, ISignInForm>("users/signin",
  async (credentials, { dispatch }) => {
    const resp = await usersApi.signIn(credentials)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    localStorage.setItem(authTokenKey, resp.data)
    dispatch(loadUserByToken())
    dispatch(showAlert({ severity: "success", message: "You've succefully signed in" }))
  }
)

export const userSignUp = createAppAsyncThunk<User, ISignUpForm>("users/signup",
  async (data, _) => {
    const resp = await usersApi.signUp(data)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    return resp.data
  }
)


