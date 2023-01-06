import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { getFromApi } from "@common/api";
import { useSnack } from "@common/hooks";
import { ProductI } from "@module/products";
import { ProductsApiRoutes } from "./products.enum";
import { getProductBackend } from "./backends";

export const useGetAllProducts = (): UseQueryResult<ProductI[]> => {
  const setSnackBar = useSnack();

  const getAllProducts = async (): Promise<ProductI[]> => {
    const productBackend = await getProductBackend();
    return await productBackend.getAllProducts();
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
  const productBackend = await getProductBackend();
  return await productBackend.getProduct(id);
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
  const productBackend = await getProductBackend();
  const data = await productBackend.getProductsPaths();

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
