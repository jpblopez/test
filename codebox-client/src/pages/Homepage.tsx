import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, useGridApiRef } from '@mui/x-data-grid';
import { Customer } from "../models/customer";
import { fetchCustomers } from "../helpers/helpers";
import dayjs from "dayjs";

const Homepage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<GridRowId[]>([]);
    const gridApiRef = useGridApiRef();
    const navigate = useNavigate();
  
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers<Customer[]>('http://localhost:5000/api/v1/customers');
        if (data) {
          setCustomers(data);
        }
      } catch (error) {
        throw ("Error fetching customers!");
      }
    };

    const deleteCustomer = async (id: string) => {
      if (!id) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/v1/customers/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("CUSTOMER DELETED SUCCESSFULLY!");
          getCustomers();
        }
      } catch (error) {
        throw ("DELETE CUSTOMER ERROR");
      }
    }

    const viewCustomerDetails = (id: string) => {
      if (!id) {
        return;
      }
        
      navigate(`/${id}`);
    }

    const addCustomer = () => {
      navigate(`/add`);
    }

    const editCustomer = (id: string) => {
      if (!id) {
        return;
      }

      navigate(`/${id}/edit`);
    }
  
    useEffect(() => {
      getCustomers();
    }, [customers]);

    const handleSelectionChange = (selection: GridRowId[]) => {
      if (selection.length > 1){
        const selectionSet = new Set(selectedCustomer);
        const result = selection.filter((s) => !selectionSet.has(s))
        setSelectedCustomer(result);
      } else {
        setSelectedCustomer(selection);
      }
    };

    const columns: GridColDef[] = [
      { field: '_id', headerName: 'Id', flex: 1 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'createdAt', headerName: 'Created At', flex: 1, valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY HH:mm') },
      { field: 'updatedAt', headerName: 'Updated At', flex: 1, valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY HH:mm') },
      {
        field: 'Action',
        renderCell: (params) => {
          const customerId = params.row._id;
          return (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  viewCustomerDetails(customerId);
                }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteCustomer(customerId);
                }}
              >
                Delete
              </Button>
            </Stack>
          );
        },
        flex: 1
      }
    ];

    const isEditButtonVisible = selectedCustomer.length > 0;

    return (
    <Layout pageTitle="Home Page">
      <Box height={400} mt={15}>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid 
              sx={{
                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                  display: "none"
                }
              }}
              getRowId={(customers) => customers._id}
              rows={customers} 
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleSelectionChange}
              rowSelectionModel={selectedCustomer}
              apiRef={gridApiRef} 
              />
        </div>
      </Box>
      <Stack mt={15} direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addCustomer();
          }}
          >
            Add
        </Button>
        {isEditButtonVisible && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              editCustomer(selectedCustomer.toString());
            }}
          >
            Edit
          </Button>
        )}
      </Stack>
    </Layout>
    );
  };
  
  export { Homepage };
  