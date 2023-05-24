import React, { useState } from "react";
import { Box, Button, TextField, Alert, Typography } from "@mui/material";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router";

const AddCustomerPage = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const navigate = useNavigate();
    const backToHome = () => navigate('/');
    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (!fileList) return;

        setImage(fileList[0]);
    };

    const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formSubmissionResult;

        let addCustomerConfig: RequestInit = { 
            method: "POST",
            body: null
        };

        if (image)
        {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", image);
            addCustomerConfig.body = formData;
        }
        
        try {
            const response = await fetch("http://localhost:5000/api/v1/customers", addCustomerConfig);
            if (response.ok) {
                formSubmissionResult = true;
            }
            else {
                formSubmissionResult = false;
            }
        } catch (error) {
            throw("Fail adding new customer");
        }

        if (formSubmissionResult) {
            setSuccess(true);
            setError(false);
        } else {
            setSuccess(false);
            setError(true);
        }
    };

    return (
        <Layout pageTitle="Add Customer Page">
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" display="flex" maxWidth={500} flexDirection="column" sx={{ mx: 'auto', mt: 15}}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Add Customer Form
                </Typography>
                {/* Render success alert if success state is true */}
                {success && <Alert severity="success">Customer added successfully!</Alert>}
                {/* Render error alert if error state is true */}
                {error && <Alert severity="error">Failed to add customer.</Alert>}
                <TextField
                    required
                    id="name"
                    label="Customer Name"
                    variant="outlined"
                    margin="normal"
                    onChange={handleNameChange}
                />
                <input
                    required
                    name="file"
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={handleImageChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    type="submit"
                    disabled={!name || !image}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={backToHome}
                >
                    Back
                </Button>
            </Box>
        </Layout>
    );
};

export { AddCustomerPage };