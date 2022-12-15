import { useQuery } from "react-query";
import { Product } from "../types/products.interface";
import { getFromApi } from "../../../common/api/config";
import { ProductsApiRoutes } from "./products.enum";
import { useSnack } from "../../../common/hooks/useSnackBar";

export const useGetAllProducts = () => {
  const setSnackBar = useSnack();

  const getAllProducts = async (): Promise<Product[]> => {
    const data: Product[] = await getFromApi(ProductsApiRoutes.ALL_PRODUCTS);
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

export const useGetProduct = (id: string, params: { enabled: boolean }) => {
  const setSnackBar = useSnack();

  const getProduct = async (): Promise<Product> => {
    const data: Product = await getFromApi(
      ProductsApiRoutes.SINGLE_PRODUCT + id
    );
    return data;
  };

  return useQuery([ProductsApiRoutes.SINGLE_PRODUCT], getProduct, {
    onError() {
      setSnackBar({
        type: "error",
        title: "Error couldn't fetch product.",
      });
    },
    enabled: params.enabled,
  });
};
