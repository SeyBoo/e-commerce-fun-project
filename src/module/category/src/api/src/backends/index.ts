import { ProductI } from "@module/products";

export interface CategoryBackend {
  getCategory: (id: string) => Promise<ProductI[]>;
  getAllCategory: () => Promise<string[]>;
}

let categoryBackend: CategoryBackend | undefined = undefined;

export async function getCategoryBackend(): Promise<CategoryBackend> {
  if (categoryBackend === undefined) {
    const mod = await import(`./${process.env.NEXT_PUBLIC_CATEGORY_BACKEND}`);
    return new mod.default() as CategoryBackend;
  }

  return categoryBackend;
}
