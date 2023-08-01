import { createSlice } from "@reduxjs/toolkit";
const generateId = () => {
  return Math.floor(Math.random() * 10000000);
};
//Initaial of currentItems and invoice items
const initialState = {
  custId: "",
  date: "",
  currentItems: [
    {
      id: generateId(),
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
    //update Item name
    updateItemName: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.item = action.payload.item;
    },
    //update Item Price
    updateItemPrice: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.price = action.payload.price;
    },
    //udpate item qty
    updateItemQty: (state, action) => {
      const gotItem = state.currentItems.find(
        (item) => item.id == action.payload.id
      );
      gotItem.qty = action.payload.qty;
    },
    //udpate custId
    updateCustId: (state, action) => {
      state.custId = action.payload;
    },
    //udpate date
    updateDate: (state, action) => {
      state.date = action.payload;
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
          id: generateId(),
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
        return;
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
  updateCustId,
  updateDate,
} = itemSlice.actions;
