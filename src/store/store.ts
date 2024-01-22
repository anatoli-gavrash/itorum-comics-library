import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './slices/login/login-slice';
import { librarySlice } from './slices/library/library-slice';

const rootReducer = combineSlices(loginSlice, librarySlice);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
