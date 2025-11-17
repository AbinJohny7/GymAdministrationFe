import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getClient } from '../services/allApi';


const MembersList = () => {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    let apiresponse = await getClient();
    setClientData(apiresponse.data);
  };

  return (
    <div className="members-bg d-flex flex-column align-items-center p-5">
      <h1 className="text-center mb-4">Members List</h1>

      <TableContainer component={Paper} className="shadow" style={{ width: "50%" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#202d40ff" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>No</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clientData.map((eachData, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
               <TableCell>{eachData.gym?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MembersList;
