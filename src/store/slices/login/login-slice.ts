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
    changeCurrentUser: create.reducer(({currentUser}, action: PayloadAction<User | null>) => {
      currentUser = action.payload;
    }),
    addPurchase: create.reducer(({currentUser}, action: PayloadAction<number>) => {
      if (currentUser?.purchases && !currentUser?.purchases.find((value) => value === action.payload)) {
        currentUser.purchases.push(action.payload);
      }
    })
  }),
  selectors: {
    currentUser: (login) => login.currentUser
  }
});

export const {changeCurrentUser, addPurchase} = loginSlice.actions;
export const {currentUser} = loginSlice.selectors;
