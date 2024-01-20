import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./user.types";

const initialState: User = {
  currentUser: null
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeActiveUser: (state, action: PayloadAction<null | string>) => {
      state.currentUser = action.payload;
    }
  }
});

export const {changeActiveUser} = user.actions;

export default user.reducer;
