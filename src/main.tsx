import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./main.css";
import CustomRoute from "./CustomRoute";

const container = document.getElementById("root")!;
const root = createRoot(container);

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
        <CustomRoute />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
