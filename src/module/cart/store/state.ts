import { ProductCartI } from "../types/cart.interface";

interface CartState {
  products: ProductCartI[] | null;
  productsCount: number;
}

export const initialState: CartState = {
  products: null,
  productsCount: 0,
};
