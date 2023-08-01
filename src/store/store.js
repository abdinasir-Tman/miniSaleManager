import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "../features/itemSlice";
import itemsListSlice from "../features/itemsListSlice";
import itemsListFromFirebase from "../features/itemsFromFireStore";
export const store = configureStore({
  reducer: {
    items: itemSlice,
    invoices: itemsListSlice,
    allItemsList: itemsListFromFirebase,
  },
});
