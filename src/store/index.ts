import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import moviesReducer from "./slices/moviesSlice";
import likedMoviesReducer from "./slices/likedMoviesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
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
