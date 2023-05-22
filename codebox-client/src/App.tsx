import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Homepage } from "./pages/Homepage";
import { CustomerPage } from "./pages/CustomerPage";
import { PageNotFound } from "./pages/PageNotFound";

const App = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Router>
            <Routes>
                <Route 
                    path="/"
                    element={
                        <Homepage />
                    }
                />
                <Route
                    path="/:id"
                    element={
                        <CustomerPage />
                    }
                />
                <Route
                    path="*"
                    element={
                        <PageNotFound />
                    }
                />
            </Routes>
        </Router>
        </ThemeProvider>
    );
};

export default App;