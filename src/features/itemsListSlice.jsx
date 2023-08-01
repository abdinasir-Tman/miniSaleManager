import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  invoicesList: [],
};
const invoicesListSlice = createSlice({
  name: "invoicesList",
  initialState,
  reducers: {
    updateInvoicesList: (state, action) => {
      state.invoicesList = action.payload;
    },
  },
});
export default invoicesListSlice.reducer;
export const { updateInvoicesList } = invoicesListSlice.actions;
