import { configureStore } from "@reduxjs/toolkit";
import organizationsAndEmployeesReducer from "../features/organizations/organizationsSlice";

export const store = configureStore({
  reducer: {
    organizationsAndEmployees: organizationsAndEmployeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
