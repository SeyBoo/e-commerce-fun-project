import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCartI } from "../types/cart.interface";
import { initialState } from "./state";

interface AddItemToProductPayload {
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
      if (!state.products) state.products = [action.payload.product];

      state.products = [...state.products, action.payload.product];
      state.productsCount = state.productsCount + 1;
    },
  },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice;
