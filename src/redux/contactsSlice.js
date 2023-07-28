import { createSlice, nanoid } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import Notiflix from "notiflix";

const contactsInitialState = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [contactsInitialState],
  reducers: {
    addContact: {
      reducer(state, action) {
        const isPresentOnList = state[0].find(
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
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state[0].findIndex(
        (contact) => contact.id === action.payload
      );
      Notiflix.Notify.success(`Contact was successfully DELETED.`);
      state[0].splice(index, 1);
    },
  },
});

const persistContactConfig = {
  key: "contacts",
  storage,
};

export const contactReducer = persistReducer(
  persistContactConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;

//SELECTORS
export const getContacts = (state) => state.contacts;
