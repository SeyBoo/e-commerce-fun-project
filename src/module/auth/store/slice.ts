import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./state";

interface SetTokenPayload {
  access_token: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<SetTokenPayload>) {
      state.access_token = action.payload.access_token;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice;
