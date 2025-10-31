"use client";

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
