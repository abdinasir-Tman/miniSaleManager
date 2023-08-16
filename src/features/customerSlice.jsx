import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialState = {
  customersList: [],
  IsModal: false,
  IsUpdate: false,
  custId: "",
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
    //Update Customer
    updateCustomer: (state) => {
      const customerDoc = doc(db, "customers", state.custId);
      updateDoc(customerDoc, {
        name: state.currentCustomer.name,
        phone: state.currentCustomer.phone,
        company: state.currentCustomer.company,
      });
      state.currentCustomer = initialState.currentCustomer;
      state.IsUpdate = false;
    },
    // delete customer
    deleteCustomer: (state, action) => {
      const deletingDoc = doc(db, "customers", action.payload);
      deleteDoc(deletingDoc);
      state.currentCustomer = initialState.currentCustomer;
    },
    getCustomer: (state, action) => {
      state.currentCustomer = action.payload.data;
      state.custId = action.payload.id;
      state.IsUpdate = true;
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
  deleteCustomer,
  getCustomer,
  updateCustomer,
} = customerSlice.actions;
