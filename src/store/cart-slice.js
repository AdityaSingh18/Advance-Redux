import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find((item) => item.it === item.id);

      if (!existingItem) {
        state.items.push({
          itemId: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name:newitem.title
        });
      }
      else{
       existingItem.quantity++;
       existingItem.totalPrice = existingItem.totalPrice+ newitem.price;
      }
    },
    removeItemFromCart(state, action) {},
  },
});
