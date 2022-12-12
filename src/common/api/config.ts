import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const getFromApi = async (
  url: string,
  params?: Record<string, unknown>
) => {
  const { data } = await axiosInstance.get(url, { params: params && {} });
  return data;
};
