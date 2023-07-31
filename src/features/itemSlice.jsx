import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItems: [
    {
      id: 1,
      item: "",
      qty: "",
      price: "",
      amount: "",
    },
    {
      id: 2,
      item: "",
      qty: "",
      price: "",
      amount: "",
    },
  ],
  subtotal: "",
  discount: "",
  total: "",
};
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateItemName: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.item = action.payload.item;
    },
    updateItemPrice: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.price = action.payload.price;
    },
    updateItemQty: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.qty = action.payload.qty;
    },
    //calculating amount
    calculateAmount: (state, action) => {
      const findedItem = state.currentItems.find(
        (item) => item.id === action.payload.id
      );
      findedItem.amount = Number(findedItem.qty) * Number(findedItem.price);
    },
    //calculating subtotal
    getSubtotal: (state) => {
      let cal = state.currentItems.map((item) => Number(item.amount));
      state.subtotal = cal.reduce((tot, curr) => tot + curr);
    },
    //calculating Main Total
    MainTotal: (state) => {
      state.total = state.subtotal - state.discount;
    },
    //makign Discount
    makeDiscount: (state, action) => {
      state.discount = action.payload;
    },
    //Adding new Row
    addRow: (state, action) => {
      const lastId = state.currentItems[state.currentItems.length - 1];
      const currentRow = state.currentItems.find(
        (i) => i.id == action.payload.id
      );
      if (action.payload.keyward == "Tab" && currentRow.id == lastId.id) {
        state.currentItems.push({
          id: state.currentItems.length + 1,
          item: "",
          price: "",
          qty: "",
          amount: "",
        });
      } else {
        console.log("nooo");
      }
    },
    //Remove Row
    removeRow: (state, action) => {
      const currentRow = state.currentItems.findIndex(
        (i) => i.id == action.payload.id
      );
      if (action.payload.keyward == "Backspace" && currentRow != 0) {
        state.currentItems.splice(currentRow, 1);
      } else {
        console.log("nooo");
      }
    },
  },
});

export default itemSlice.reducer;
export const {
  updateItemName,
  updateItemPrice,
  updateItemQty,
  calculateAmount,
  getSubtotal,
  MainTotal,
  addRow,
  makeDiscount,
  removeRow,
} = itemSlice.actions;
