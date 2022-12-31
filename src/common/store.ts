import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import cartSlice from "../module/cart/store/slice";

const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;