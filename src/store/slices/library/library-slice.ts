import { createAppSlice } from "../createAppSlice";
import type { Library } from "./library.types";
import { fetchComics } from "./library-service";

const initialState: Library = {
  data: null,
  status: 'empty'
};

export const librarySlice = createAppSlice({
  name: 'library',
  initialState: initialState,
  reducers: (create) => ({
    getComics: create.asyncThunk(async () => {
      return await fetchComics();
    },
    {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        if (action.payload.data?.results) {
          state.data = action.payload.data.results;
          console.log(action.payload.data.results);
        }

        state.status = 'done';
      },
      rejected: (state) => {
        state.status = 'error';
      }
    })
  }),
  selectors: {
    libraryData: (library) => library.data
  }
});

export const {getComics} = librarySlice.actions;
export const {} = librarySlice.selectors;
