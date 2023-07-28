import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./operations";
import Notiflix from "notiflix";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
  },
  [fetchContacts.rejected]: handleRejected,
  [addContact.pending]: handlePending,
  [addContact.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    const isPresentOnList = state.item.find(
      (contact) => contact.name === action.payload.name
    );
    if (isPresentOnList) {
      Notiflix.Notify.failure(
        `${action.payload.name} is already in your contacts.`
      );
    } else {
      Notiflix.Notify.success(
        `${action.payload.name} ADDED to your contact list.`
      );
      state[0].push(action.payload);
    }
    state.items.push(action.payload);
  },
  [addContact.rejected]: handleRejected,
  [deleteContact.pending]: handlePending,
  [deleteContact.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    const index = state.items.findIndex((task) => task.id === action.payload);
    state.items.splice(index, 1);
  },
});
export const contactsReducer = contactsSlice.reducer;
