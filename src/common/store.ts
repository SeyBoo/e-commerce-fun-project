import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../module/cart/store/slice";

const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
  },
});

export default store;
