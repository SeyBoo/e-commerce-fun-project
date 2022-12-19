import { CategoryApiRoutes } from "./category.enum";
import { useQuery, UseQueryResult } from "react-query";
import { getFromApi } from "../../../common/api/config";
import { useSnack } from "../../../common/hooks/useSnackBar";

export const useGetAllCategories = (): UseQueryResult<string[]> => {
  const setSnackBar = useSnack();

  const getAllCategories = async (): Promise<string[]> => {
    const data: string[] = await getFromApi(CategoryApiRoutes.ALL_CATEGORY);
    return data;
  };

  return useQuery(CategoryApiRoutes.ALL_CATEGORY, getAllCategories, {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch categories.",
      });
    },
  });
};

