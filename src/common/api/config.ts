import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
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
