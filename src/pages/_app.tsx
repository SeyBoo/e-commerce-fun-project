import "../common/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import SnackBarProvider from "../common/hooks/useSnackBar";
import { queryClient } from "../common/api/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackBarProvider>
        <Component {...pageProps} />
      </SnackBarProvider>
    </QueryClientProvider>
  );
}
