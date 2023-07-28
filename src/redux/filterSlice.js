import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const filtersInitialState = { value: "" };
const filtersSlice = createSlice({
  name: "filter",
  initialState: filtersInitialState,
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
  },
});

const persistFilterConfig = {
  key: "filter",
  storage,
};

export const filterReducer = persistReducer(
  persistFilterConfig,
  filtersSlice.reducer
);
export const { setFilter } = filtersSlice.actions;

//SELECTORS
export const getFilter = (state) => state.filter;
