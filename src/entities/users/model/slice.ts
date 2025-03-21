
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "./types";
import { ISignInForm, ISignUpForm, usersApi } from "../api";
import { authTokenKey } from "../../../shared/api/client";
import { createAppAsyncThunk } from "../../../app/hooks";
import { showAlert } from "../../../shared/utils";


const initialState: UsersState = {
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserByToken.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(
        loadUserByToken.fulfilled,
        (state, action: PayloadAction<User | void>) => {
          state.isLoading = false;
          if (action.payload)
            state.user = action.payload;
        },
      )
      .addCase(loadUserByToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userSignIn.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userSignUp.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state, _) => {
        state.isLoading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const logout = createAppAsyncThunk(
  "users/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem(authTokenKey);
    dispatch(usersSlice.actions.setUser(undefined))
  }
)

export const loadUserByToken = createAppAsyncThunk<User | void>(
  "users/loadUserByToken",
  async (_, thunkAPI) => {
    const resp = await usersApi.getMe();
    if (!resp.success) {
      if (resp.status == 401) {
        console.log("Not authenticated")
        localStorage.removeItem(authTokenKey);
        return
      }
      throw new Error(resp.message);
    }
    return resp.data;
  },
);

export const userSignIn = createAppAsyncThunk<void, ISignInForm>(
  "users/signin",
  async (credentials, { dispatch }) => {
    const resp = await usersApi.signIn(credentials);
    if (!resp.success) {
      throw new Error(resp.message);
    }
    localStorage.setItem(authTokenKey, resp.data);
    dispatch(loadUserByToken());
    dispatch(
      showAlert({
        severity: "success",
        message: "You've succefully signed in",
      }),
    );
  },
);

export const userSignUp = createAppAsyncThunk<void, ISignUpForm>(
  "users/signup",
  async (data, { dispatch }) => {
    const resp = await usersApi.signUp(data);
    if (!resp.success) {
      throw new Error(resp.message);
    }
    dispatch(showAlert({ severity: "success", message: "You've succesfully signed up. You can login now" }))
  },
);
