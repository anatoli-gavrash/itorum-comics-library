import { createAppSlice } from "../createAppSlice";
import type { Library, LibraryActionValues, ParamsComics } from "./library.types";
import { fetchComic, fetchComics, fetchComicsFromIdList } from "./library-service";

const initialState: Library = {
  response: null,
  status: 'empty'
};

export const librarySlice = createAppSlice({
  name: 'library',
  initialState: initialState,
  reducers: (create) => ({
    getComic: create.asyncThunk(async (id: number) => {
      return await fetchComic(id);
    },
    {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.response = action.payload;
        state.status = 'done';
      },
      rejected: (state) => {
        state.status = 'error';
      }
    }),
    getComics: create.asyncThunk(async (params: ParamsComics) => {
      return await fetchComics(params);
    },
    {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.response = action.payload;
        state.status = 'done';
      },
      rejected: (state) => {
        state.status = 'error';
      }
    }),
    getComicsFromIdList: create.asyncThunk(async (values: LibraryActionValues) => {
      return await fetchComicsFromIdList(values);
    },
    {
      pending: (state) => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.response = action.payload;
        state.status = 'done';
      },
      rejected: (state) => {
        state.status = 'error';
      }
    }),
    resetLibrary: create.reducer((state) => {
      state.response = null;
      state.status = 'empty';
    })
  }),
  selectors: {
    libraryResponse: (library) => library.response,
    libraryStatus: (library) => library.status,
    libraryData: (library) => library.response?.data,
  }
});

export const {getComic, getComics, getComicsFromIdList, resetLibrary} = librarySlice.actions;
export const {libraryResponse, libraryStatus, libraryData} = librarySlice.selectors;
