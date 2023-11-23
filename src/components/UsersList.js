import React, { useEffect, useState } from "react";
import { Button, Container, List, ListItem, Typography } from "@mui/material";
import  {DataGrid}  from '@mui/x-data-grid';
// const url = '    ';
let dataForLoad = {
  skip: 0,
  limit: 8,
};
const apiUrl = 'https://dummyjson.com/users';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];


export default function UsersList() {
  const [users, setUsers] = useState([]);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Transform users into rows with specific fields
    const transformedRows = users.map((user) => ({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
    }));

    // Set the transformed rows in the state
    setRows(transformedRows);
    console.log(transformedRows);
  }, [users]);


 

  const loadUsers = () => {
    let url = `${apiUrl}?limit=${dataForLoad.limit}&skip=${dataForLoad.skip}`;
    dataForLoad.skip += dataForLoad.limit;

    fetch(url)
      .then((res) => res.json())
      .then((dataUsers) => {
        console.log(dataUsers.users);
        setUsers([...users, ...dataUsers.users]);
      })
      .catch((err) => {
        console.warn(err);
      });
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <div style={{ height: "80vh", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 30]}
        checkboxSelection
      />
    </div>
      <Button variant="contained" onClick={loadUsers}>
        Load Users
      </Button>
    </Container>
  );
}
