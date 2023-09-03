import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: number;
  name: string;
  surname: string;
  isActive: boolean;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const contactId = action.payload;
      const index = state.contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (index !== -1) {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== contactId
        );
      }
    },

    updateContact: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        surname: string;
        isActive: boolean;
      }>
    ) => {
      const { id, name, surname, isActive } = action.payload;

      const index = state.contacts.findIndex((contact) => contact.id === id);

      if (index !== -1) {
        const updatedContacts = [...state.contacts];
        updatedContacts[index] = {
          id,
          name,
          surname,
          isActive,
        };
        state.contacts = updatedContacts;
      }
    },
  },
});

export const { addContact, removeContact, updateContact } =
  contactSlice.actions;

export default contactSlice.reducer;
