import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { ProductI } from "../types/products.interface";
import { getFromApi } from "../../../common/api/config";
import { ProductsApiRoutes } from "./products.enum";
import { useSnack } from "../../../common/hooks/useSnackBar";

export const useGetAllProducts = (): UseQueryResult<ProductI[]> => {
  const setSnackBar = useSnack();

  const getAllProducts = async (): Promise<ProductI[]> => {
    const data: ProductI[] = await getFromApi(ProductsApiRoutes.ALL_PRODUCTS);
    return data;
  };

  return useQuery([ProductsApiRoutes.ALL_PRODUCTS], getAllProducts, {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch products.",
      });
    },
  });
};

export const getProduct = async (id: string): Promise<ProductI> => {
  const data: ProductI = await getFromApi(
    ProductsApiRoutes.SINGLE_PRODUCT + id
  );
  return data;
};

export const useGetProduct = (
  id: string,
  params?: { enabled: boolean }
): UseQueryResult<ProductI> => {
  const setSnackBar = useSnack();

  return useQuery([ProductsApiRoutes.SINGLE_PRODUCT], () => getProduct(id), {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch product.",
      });
    },
    enabled: params?.enabled,
  });
};

export const getProductPaths = async () => {
  const data: ProductI[] = await getFromApi(ProductsApiRoutes.ALL_PRODUCTS, {
    "Accept-Encoding": "gzip,deflate,compress",
  });

  return data.map((product) => ({
    params: { id: JSON.stringify(product.id) },
  }));
};

export const prefetchProduct = async (
  queryClient: QueryClient,
  id: string
): Promise<unknown> => {
  await queryClient.prefetchQuery(ProductsApiRoutes.SINGLE_PRODUCT, () =>
    getProduct(id)
  );

  return await queryClient.getQueryData([ProductsApiRoutes.SINGLE_PRODUCT]);
};
