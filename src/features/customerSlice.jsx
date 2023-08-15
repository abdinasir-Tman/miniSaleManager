import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState = {
  customersList: [],
  IsModal: false,
  currentCustomer: {
    name: "",
    phone: "",
    company: "",
  },
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    //reading customer data from firebase
    readCustomers: (state, action) => {
      state.customersList = action.payload;
    },
    //registeration Customer
    registerCustomer: (state) => {
      const customerCollection = collection(db, "customers");
      addDoc(customerCollection, state.currentCustomer);
      state.currentCustomer = initialState.currentCustomer;
    },
    //manageing customer modal
    setModal: (state, action) => {
      state.IsModal = action.payload;
    },
    updateName: (state, action) => {
      state.currentCustomer.name = action.payload;
    },
    updatePhone: (state, action) => {
      state.currentCustomer.phone = action.payload;
    },
    updateCompany: (state, action) => {
      state.currentCustomer.company = action.payload;
    },
  },
});
export default customerSlice.reducer;
export const {
  updateName,
  updatePhone,
  updateCompany,
  setModal,
  readCustomers,
  registerCustomer,
} = customerSlice.actions;
