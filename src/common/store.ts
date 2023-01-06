import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../module/auth/src/store/src/slice";
import cartSlice from "../module/cart/src/store/src/slice";

const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [authSlice.name]: authSlice.reducer,
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
