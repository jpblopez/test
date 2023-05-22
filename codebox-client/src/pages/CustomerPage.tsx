import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router";
import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import { Layout } from "../components/Layout";
import { Customer } from "../models/customer";

const CustomerPage = () => {
    const [customer, setCustomer] = useState<Customer|null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    
    const backToHome = () => navigate("/"); 
    const customerId = location.pathname.split("/")[1];
    
    const getCustomer = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
                method: "GET"
            });
            const data = await response.json();
            console.log(data);
        } catch (error)
        {
            console.log("ERROR >>> ", error);
        }
    };

    useEffect(() => {
        getCustomer()
    }, []);
    

    return (
        <Layout pageTitle="Customer Page">
            <Box mt={10}>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        backToHome();
                    }}>
                    Back
                </Button>
            </Box>
        </Layout>
    );
};

export { CustomerPage };