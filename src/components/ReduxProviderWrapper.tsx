"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "@/store";
import { setLikedMovies } from "@/store/slices/likedMoviesSlice";
import { ConfigProvider, theme } from "antd";

function LikedMoviesInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const saved = localStorage.getItem("likedMovies");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(setLikedMovies(parsed));
      } catch (e) {
        console.error("Ошибка восстановления лайков из localStorage", e);
      }
    }
  }, [dispatch]);

  return null;
}

export default function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LikedMoviesInitializer />
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#141414",
            borderRadius: 4,
            colorLink: "#F06D8A",
            colorLinkActive: "#CC2D4F",
            colorLinkHover: "#E599A9",
          },
          components: {
            Pagination: {
              itemSize: 48,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </Provider>
  );
}
