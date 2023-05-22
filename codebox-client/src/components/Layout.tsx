import React, { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { Header } from "./Header";
import { HeaderProps } from "../types/props";

const Layout: FC<PropsWithChildren<HeaderProps>> = ({
    pageTitle,
    children
}) => {
    return (
        <main>
            <Header pageTitle={pageTitle} />

            <Container component="main" maxWidth="lg">
                {children}
            </Container>
        </main>
    );
};

export { Layout };