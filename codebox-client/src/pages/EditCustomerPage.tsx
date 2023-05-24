import React, { useState, useEffect, useCallback } from "react";
import { Button, Box, Typography, TextField, Alert, CardMedia } from "@mui/material";
import { styled } from '@mui/system';
import { useNavigate, useLocation } from "react-router";
import { Layout } from "../components/Layout";
import { Customer } from "../models/customer";
import { fetchCustomer } from "../helpers/helpers";

const CardMediaStyled = styled(CardMedia)(
    ({ theme }) => ({
      height: 300,
      [theme.breakpoints.down('sm')]: {
        height: 200
      }
    })
  );

const EditCustomerPage = () => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const backToHome = () => navigate('/');

    const customerId = location.pathname.split('/')[1];
    
    const handleNameChange =
        (key: keyof Customer) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setCustomer((prev) => ({
                ...prev,
                [key]: event.target.value,
            }));
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (!fileList) return;

        setImage(fileList[0]);
    };

    const getSelectedCustomer = useCallback(async () => {
        try {
            const data = await fetchCustomer<Customer>(`http://localhost:5000/api/v1/customers/${customerId}`);
            if (data) {
                setCustomer(data);
            }
        } catch (error) {
            throw ("Failed fetching customer");
        }
    }, [customerId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formSubmissionResult;

        let updateCustomerConfig: RequestInit = {
            method: "PATCH",
            body: null
        };

        if (customer?.name && image)
        {
            const formData = new FormData();
            formData.append("name", customer?.name);
            formData.append("file", image);
            updateCustomerConfig.body = formData;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/v1/customers/${customerId}`, updateCustomerConfig);
            if (response.ok) {
                formSubmissionResult = true;
            } else {
                formSubmissionResult = false;
            }

        } catch (error) {
            throw ("Fail updating customer!");
        }

        if (formSubmissionResult) {
            setSuccess(true);
            setError(false);
        } else {
            setSuccess(false);
            setError(true);
        }
    }

    useEffect(() => {
        getSelectedCustomer();
    }, []);

    const customerImage = `http://localhost:5000${customer?.imagePath}`;

    return (
        <Layout pageTitle="Edit Customer Page">
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" display="flex" maxWidth={500} flexDirection="column" sx={{ mx: 'auto', mt: 15}}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Edit Customer Form
                </Typography>
                {/* Render success alert if success state is true */}
                {success && <Alert severity="success">Customer details updated successfully!</Alert>}
                {/* Render error alert if error state is true */}
                {error && <Alert severity="error">Failed to update customer details.</Alert>}
                <CardMediaStyled 
                    image={customerImage}/>
                <TextField
                    required
                    id="name"
                    label="Customer Name"
                    variant="outlined"
                    value={customer?.name || ""}
                    onChange={handleNameChange("name")}
                    margin="normal"
                />
                <input
                    required
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple={false}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    type="submit"
                    disabled={!customer?.name || !image}
                >
                    Update
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

export { EditCustomerPage };