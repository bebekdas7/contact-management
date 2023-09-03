import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import contactReducer from "./features/contactSlice.ts";
import { postApi } from "./services/data.tsx";

const store = configureStore({
  reducer: {
    contact: contactReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
setupListeners(store.dispatch);

export default store;
