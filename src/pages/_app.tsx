import "../common/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import SnackBarProvider from "../common/hooks/useSnackBar";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { cacheTime: 200, staleTime: 1000 * 60 * 30 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SnackBarProvider>
        <Component {...pageProps} />
      </SnackBarProvider>
    </QueryClientProvider>
  );
}
