import "@common/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@common/api";
import { Provider } from "react-redux";
import store from "@common/store";
import { SnackBarProvider } from "@common/hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackBarProvider>
          <Component {...pageProps} />
        </SnackBarProvider>
      </QueryClientProvider>
    </Provider>
  );
}
