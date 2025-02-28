import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    tenantId: "",
    latestOrderId: null,
    latestOrderEta: null,
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.orders = [];
      state.tenantId = "";
    },
    setTenantId(state, action) {
      state.tenantId = action.payload;
    },
    setLatestOrderId: (state, action) => {
      state.latestOrderId = action.payload;
    },
    setLatestOrderEta: (state, action) => {
      state.latestOrderEta = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setTenantId,
  setLatestOrderId,
  setLatestOrderEta,
} = cartSlice.actions;
export default cartSlice.reducer;
