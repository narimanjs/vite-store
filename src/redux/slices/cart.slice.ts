import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(item => item.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map(i => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
