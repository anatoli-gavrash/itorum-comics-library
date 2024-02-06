import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import type { Login, User, UserStorage } from "./login.types";

const initialState: Login = {
  currentUser: undefined
};

export const loginSlice = createAppSlice({
  name: 'login',
  initialState: initialState,
  reducers: (create) => ({
    setCurrentUser: create.reducer((state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    }),
    toggleFavorite: create.reducer((state, action: PayloadAction<UserStorage>) => {
      if (state.currentUser?.favorites === null) {
        state.currentUser.favorites = [];
      }
      
      if (state.currentUser?.favorites) {
        if (!state.currentUser.favorites.find(({id}) => id === action.payload.id)) {
          state.currentUser.favorites.push(action.payload);
        } else {
          state.currentUser.favorites = state.currentUser.favorites.filter(({id}) => id !== action.payload.id);
        }
      }
    }),
    addPurchase: create.reducer((state, action: PayloadAction<UserStorage>) => {
      if (state.currentUser?.purchases === null) {
        state.currentUser.purchases = [];
      }
      
      if (
        state.currentUser?.purchases &&
        !state.currentUser?.purchases.find(({id}) => id === action.payload.id
      )) {
        state.currentUser.purchases.push(action.payload);
      }
    })
  }),
  selectors: {
    currentUser: (login) => login.currentUser
  }
});

export const {toggleFavorite, setCurrentUser, addPurchase} = loginSlice.actions;
export const {currentUser} = loginSlice.selectors;
