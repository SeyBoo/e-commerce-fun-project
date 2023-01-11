import "@common/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@common/api";
import { Provider } from "react-redux";
import { persistor, store } from "@common/store";
import { SnackBarProvider } from "@common/hooks";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SnackBarProvider>
            <Component {...pageProps} />
          </SnackBarProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
