// additionally import createAppAsyncThunk hook because next js throws 'undefined error' otherwise
import { createAppAsyncThunk } from "./hooks"
void createAppAsyncThunk

export { makeStore } from "./store"
export * from "./hooks"
export type { AppStore } from "./store"
