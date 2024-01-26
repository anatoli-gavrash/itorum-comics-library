import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import "./main.css";
import App from "./App";
import Error404 from './components/error404';
import Library from "./components/library";
import Comic from './components/comic';
import Favorites from "./components/favorites";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error404 />}>
      <Route index element={<Library />} />
      <Route path='page/:idLibrary?' element={<Library />} />
      <Route path='comic/:idComic' element={<Comic />} />
      <Route path='favorites' element={<Favorites />} />
      <Route path='favorites/page/:idFavorite' element={<Favorites />} />
      <Route path='purchases' element={<Comic />} />
      <Route path='purchases/page/:idPurchase' element={<Comic />} />
    </Route>
  )
);

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} /> 
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
