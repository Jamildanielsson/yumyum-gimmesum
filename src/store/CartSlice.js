import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    orders: [],
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
    },
    createOrder(state) {
      if (state.items.length > 0) {
        const newOrder = {
          id: Math.floor(Math.random() * 1000000),
          items: [...state.items],
          total: state.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        };
        state.orders.push(newOrder);
        state.items = [];
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, createOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
