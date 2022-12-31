import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice;
