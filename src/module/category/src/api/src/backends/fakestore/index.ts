import { getFromApi } from "@common/api";
import { ProductI } from "@module/products";
import { CategoryBackend } from "..";
import { CategoryApiRoutes } from "@module/category";

export default class FakeStoreCategory implements CategoryBackend {
  async getCategory(id: string): Promise<ProductI[]> {
    const data: ProductI[] = await getFromApi(
      CategoryApiRoutes.SINGLE_CATEGORY + id
    );
    return data;
  }

  async getAllCategory(): Promise<string[]> {
    const data: string[] = await getFromApi(CategoryApiRoutes.ALL_CATEGORY, {
      "Accept-Encoding": "gzip,deflate,compress",
    });
    return data;
  }
}
