import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
if (typeof window !== "undefined") {
  // @ts-ignore
  window.__STORE__ = store;
}
