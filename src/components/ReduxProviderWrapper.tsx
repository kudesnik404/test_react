"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ConfigProvider, theme } from "antd";

export default function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#1677FF",
            borderRadius: 4,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </Provider>
  );
}
