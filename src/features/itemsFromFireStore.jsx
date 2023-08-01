import { createSlice } from "@reduxjs/toolkit";

//items List and initial item
const initialState = {
  items: [],
};
const itemsListFromFirebase = createSlice({
  name: "itmesListFromFirebase",
  initialState,
  reducers: {
    getItemsListFromFirebase: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default itemsListFromFirebase.reducer;
export const { getItemsListFromFirebase } = itemsListFromFirebase.actions;
