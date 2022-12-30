import { CategoryApiRoutes } from "./category.enum";
import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { getFromApi } from "../../../common/api/config";
import { ProductI } from "../../products/types/products.interface";
import { useSnack } from "../../../common/hooks/useSnackBar";

export const getAllCategories = async (): Promise<string[]> => {
  const data: string[] = await getFromApi(CategoryApiRoutes.ALL_CATEGORY, {
    "Accept-Encoding": "gzip,deflate,compress",
  });
  return data;
};

export const useGetAllCategories = (): UseQueryResult<string[]> => {
  const setSnackBar = useSnack();

  return useQuery(CategoryApiRoutes.ALL_CATEGORY, getAllCategories, {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch categories.",
      });
    },
  });
};

const getCategory = async (id: string): Promise<ProductI[]> => {
  const data: ProductI[] = await getFromApi(
    CategoryApiRoutes.SINGLE_CATEGORY + id
  );
  return data;
};

export const useGetCategory = (id: string): UseQueryResult<ProductI[]> => {
  const setSnackBar = useSnack();

  return useQuery(CategoryApiRoutes.SINGLE_CATEGORY, () => getCategory(id), {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch category.",
      });
    },
  });
};

export const prefetchCategory = async (
  queryClient: QueryClient,
  id: string
) => {
  await queryClient.prefetchQuery(CategoryApiRoutes.SINGLE_CATEGORY, () =>
    getCategory(id)
  );

  return queryClient.getQueryData([CategoryApiRoutes.SINGLE_CATEGORY]);
};
