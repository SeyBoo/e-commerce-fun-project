import { getFromApi } from "@common/api";
import { ProductsApiRoutes } from "@module/products";
import { ProductI } from "@module/products/src/types";
import { ProductBackend } from "..";

export default class ProductFakestore implements ProductBackend {
  async getProductsPaths(): Promise<ProductI[]> {
    const data: ProductI[] = await getFromApi(ProductsApiRoutes.ALL_PRODUCTS, {
      "Accept-Encoding": "gzip,deflate,compress",
    });
    return data;
  }

  async getAllProducts(): Promise<ProductI[]> {
    const data: ProductI[] = await getFromApi(ProductsApiRoutes.ALL_PRODUCTS);
    return data;
  }

  async getProduct(id: string): Promise<ProductI> {
    const data: ProductI = await getFromApi(
      ProductsApiRoutes.SINGLE_PRODUCT + id
    );
    return data;
  }
}
