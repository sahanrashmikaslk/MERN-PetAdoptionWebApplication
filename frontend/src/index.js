import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById("root"));
const defaultTheme = createTheme();
root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>

    </React.StrictMode>
);

