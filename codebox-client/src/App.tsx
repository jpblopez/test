import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Homepage } from "./pages/Homepage";
import { CustomerPage } from "./pages/CustomerPage";
import { AddCustomerPage } from "./pages/AddCustomerPage";
import { EditCustomerPage } from "./pages/EditCustomerPage";
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
                    path="/:customerId"
                    element={
                        <CustomerPage />
                    }
                />
                <Route
                    path="/add"
                    element={
                        <AddCustomerPage />
                    }
                />
                <Route
                    path="/:customerId/edit"
                    element={
                        <EditCustomerPage />
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