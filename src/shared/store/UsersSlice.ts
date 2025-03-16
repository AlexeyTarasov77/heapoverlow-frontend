import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/users";

export type UsersState = {
  isAuthenticated: boolean;
  token?: string;
  user?: User
}

const initialState: UsersState = {
  isAuthenticated: false
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
})
