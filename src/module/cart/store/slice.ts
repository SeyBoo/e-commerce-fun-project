import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCartI } from "../types/cart.interface";
import { initialState } from "./state";

interface AddItemToProductPayload {
  product: ProductCartI;
}

interface UpdateProductCountPayload {
  product: ProductCartI;
  quantity?: number;
}

interface DeleteProductPayload {
  product: ProductCartI;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<AddItemToProductPayload>
    ) => {
      if (!state.products) {
        state.products = [action.payload.product];
      } else {
        state.products = [...state.products, action.payload.product];
      }
      state.productsCount = state.productsCount + action.payload.product.count;
    },
    updateProductCount: (
      state,
      action: PayloadAction<UpdateProductCountPayload>
    ) => {
      if (!state.products) return;

      const productsWithoutSelectedProduct = state.products.filter(
        (product) => product.id !== action.payload.product.id
      );

      state.products = [
        ...productsWithoutSelectedProduct,
        action.payload.product,
      ];

      const numberOfAddedItems = action.payload.quantity
        ? action.payload.quantity
        : 1;

      state.productsCount = state.productsCount + numberOfAddedItems;
    },
    deleteProduct: (state, action: PayloadAction<DeleteProductPayload>) => {
      if (!state.products) return;

      const productsWithoutSelectedProduct = state.products.filter(
        (product) => product.id !== action.payload.product.id
      );

      state.products = [...productsWithoutSelectedProduct];

      state.productsCount = state.productsCount - action.payload.product.count;
    },
  },
});

export const { addProductToCart, updateProductCount, deleteProduct } =
  cartSlice.actions;

export default cartSlice;
