import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import likedMoviesReducer from "./slices/likedMoviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    likedMovies: likedMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
if (typeof window !== "undefined") {
  // @ts-ignore
  window.__STORE__ = store;
}
