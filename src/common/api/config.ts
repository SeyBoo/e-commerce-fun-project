import axios from "axios";
import { QueryClient } from "react-query";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: 200, staleTime: 1000 * 60 * 30 },
  },
});

export const getFromApi = async (
  url: string,
  params?: Record<string, string>
) => {
  const { data } = await axiosInstance.get(url, {
    headers: params ? params : {},
  });
  return data;
};
