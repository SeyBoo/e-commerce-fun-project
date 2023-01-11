import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./state";

interface SetTokenPayload {
  access_token: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<SetTokenPayload>) {
      state.access_token = action.payload.access_token;
    },
    resetToken(state) {
      state.access_token = null;
    },
  },
});

export const { setToken, resetToken } = authSlice.actions;
