import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { HeaderProps } from "../types/props";


const Header = ( { pageTitle } : HeaderProps ) => {
    return (
        <AppBar
            position="absolute"
            color="default">
            <Toolbar>
                <Typography variant="h4" color="inherit">
                    {pageTitle}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export { Header };