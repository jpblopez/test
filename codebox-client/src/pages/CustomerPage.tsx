import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import { styled } from '@mui/system';
import { Layout } from "../components/Layout";
import { Customer } from "../models/customer";
import { fetchCustomer } from "../helpers/helpers";
import dayjs from "dayjs";

const CardContainer = styled(Card)(
    ({ theme }) => ({
      maxWidth: 400,
      margin: '0 auto',
      marginTop: 20,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 300
      }
    })
  );
  
const CardMediaStyled = styled(CardMedia)(
    ({ theme }) => ({
      height: 300,
      [theme.breakpoints.down('sm')]: {
        height: 200
      }
    })
  );
  
const CardContentStyled = styled(CardContent)(
    () => ({
      textAlign: 'center'
    })
  );
  
const TitleTypography = styled(Typography)(
    () => ({
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10
    })
  );
  
const PropertyTypography = styled(Typography)(
    () => ({
      fontSize: 16,
      marginBottom: 5
    })
  );

const CustomerPage = () => {
    const [customer, setCustomer] = useState<Customer|null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const backToHome = () => navigate('/');

    const customerId = location.pathname.split('/')[1];

    const getCustomer = async () => {
        try {
        const data = await fetchCustomer<Customer>(
            `http://localhost:5000/api/v1/customers/${customerId}`
        );
        if (data) {
            setCustomer(data);
        }
        } catch (error) {
          throw ("Failed fetching customer");
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);

    const customerImage = `http://localhost:5000${customer?.imagePath}`;
    const createdAtFormatted = dayjs(customer?.createdAt).format('DD/MM/YYYY HH:mm');
    const updatedAtFormatted = dayjs(customer?.updatedAt).format('DD/MM/YYYY HH:mm');

    return (
        <Layout pageTitle="Customer Page">
            <Box mt={15}>
                {customer && (
                <CardContainer>
                <CardMediaStyled
                    image={customerImage}
                />
                <CardContentStyled>
                    <TitleTypography variant="h5">
                    {customer.name}
                    </TitleTypography>
        
                    <PropertyTypography color="textSecondary">
                    ID: {customer._id}
                    </PropertyTypography>
        
                    <PropertyTypography color="textSecondary">
                    Created At: {createdAtFormatted}
                    </PropertyTypography>
        
                    <PropertyTypography color="textSecondary">
                    Updated At: {updatedAtFormatted}
                    </PropertyTypography>
                </CardContentStyled>
                </CardContainer>
                )}
            </Box>
            <Box>
                <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    backToHome();
                }}
                >
                Back
                </Button>
            </Box>
        </Layout>
    );
};

export { CustomerPage };
