import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import type { Login, User } from "./login.types";

const initialState: Login = {
  currentUser: null
};

export const loginSlice = createAppSlice({
  name: 'login',
  initialState: initialState,
  reducers: (create) => ({
    setCurrentUser: create.reducer((state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    }),
    addPurchase: create.reducer((state, action: PayloadAction<number>) => {
      if (
        state.currentUser?.purchases &&
        !state.currentUser?.purchases.find((value) => value === action.payload
      )) {
        state.currentUser.purchases.push(action.payload);
      }
    })
  }),
  selectors: {
    currentUser: (login) => login.currentUser
  }
});

export const {setCurrentUser, addPurchase} = loginSlice.actions;
export const {currentUser} = loginSlice.selectors;
