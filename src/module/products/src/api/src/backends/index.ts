import { ProductI } from "@module/products";

export interface ProductBackend {
  getAllProducts: () => Promise<ProductI[]>;
  getProductsPaths: () => Promise<ProductI[]>;
  getProduct: (id: string) => Promise<ProductI>;
}

let productBackend: ProductBackend | undefined = undefined;

export async function getProductBackend(): Promise<ProductBackend> {
  if (productBackend === undefined) {
    const mod = await import(`./${process.env.NEXT_PUBLIC_PRODUCT_BACKEND}`);
    return new mod.default() as ProductBackend;
  }

  return productBackend;
}
