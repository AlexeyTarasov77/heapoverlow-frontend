import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/entities";
import { ISignInForm, ISignUpForm, usersApi } from "../api/usersApi"
import { authTokenKey, ReqState } from "../api/client";

export type UsersState = {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
} & ReqState;

const initialState: UsersState = {
  isAuthenticated: false,
  isLoading: false
};


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const token = action.payload
      localStorage.setItem(authTokenKey, token)
      state.token = token
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true;
    }
  },
});

export const loadUserByToken = createAsyncThunk("users/loadUserByToken",
  async (_, { dispatch }) => {
    const resp = await usersApi.getMe()
    if (!resp.success) {
      throw new Error(resp.message)
    }
    dispatch(usersSlice.actions.setUser(resp.data))
  }
)

export const signIn = createAsyncThunk<void, ISignInForm>("users/signin",
  async (credentials, { dispatch }) => {
    const resp = await usersApi.signIn(credentials)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    dispatch(usersSlice.actions.setToken(resp.data))
    dispatch(loadUserByToken())
  }
)

export const signUp = createAsyncThunk<User, ISignUpForm>("users/signup",
  async (data, _) => {
    const resp = await usersApi.signUp(data)
    if (!resp.success) {
      throw new Error(resp.message)
    }
    return resp.data
  }
)


