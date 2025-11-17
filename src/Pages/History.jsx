import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import { Box, Button, Typography } from "@mui/material";
import { deleteClient, getClient, updateClient } from "../services/allApi";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdSave } from "react-icons/md"; 
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const History = () => {
  const [clientData, setClientData] = useState([]);
  const [editClientData, setEditClientData] = useState({
    id: "",
    name: "",
    age: "",
    plan: "",
    address: "",
    doj: "",
    exp: ""
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    let apiresponse = await getClient();
    console.log(apiresponse);
    if (apiresponse.status == 200) {
      setClientData(apiresponse.data);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong accessing data",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const onDeleteClick = async (id) => {
    let apiResponse = await deleteClient(id);
    if (apiResponse.status == 200) {
      Swal.fire({
        title: "Success",
        text: "Successfully Deleted",
        icon: "success",
        confirmButtonText: "Ok",
      });
      loadClient();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong accessing data",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };


  const handleEditClick = (client) => {
    setEditClientData({
      id: client.id,
      name: client.gym.name,
      age: client.gym.age,
      plan: client.gym.plan,
      address: client.gym.address,
      doj: client.gym.doj,
      exp: client.gym.exp
    });
    handleOpen();
  };

 
const handleSaveClick = async () => {
  try {
    
    const payload = {
      gym: {
        name: editClientData.name,
        age: editClientData.age,
        plan: editClientData.plan,
        address: editClientData.address,
        doj: editClientData.doj,
        exp: editClientData.exp
      }
    };

    let apiResponse = await updateClient(editClientData.id, payload);

    if (apiResponse.status === 200) {
      Swal.fire({
        title: "Success!",
        text: "Client data updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
      loadClient(); 
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to update client data",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong while updating data",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

  return (
    <div className="history-bg">
      <Container>
        <Typography className="text-center p-5 fw-bold " variant="h4">
          History
        </Typography>
        <TableContainer className="mt-5 bg-secondary" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Plan</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Doj</TableCell>
                <TableCell align="center">Exp</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientData.length > 0 ? (
                <>
                  {clientData.map((eachData, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{eachData.gym?.name}</TableCell>
                      <TableCell align="center">{eachData.gym?.age}</TableCell>
                      <TableCell align="center">{eachData.gym?.plan}</TableCell>
                      <TableCell align="center">
                        {eachData.gym?.address}
                      </TableCell>
                      <TableCell align="center">{eachData.gym?.doj}</TableCell>
                      <TableCell align="center">{eachData.gym?.exp}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleEditClick(eachData)} className="fs-5">
                          <MdEdit style={{ color: 'yellow' }} />
                        </Button>
                        <Button onClick={() => onDeleteClick(eachData.id)} className="fs-5">
                          <MdDelete style={{ color: "red" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
               <TableRow>
  <TableCell colSpan={8} align="center">
    <Typography variant="subtitle1" className="text-light">
      No data added
    </Typography>
  </TableCell>
</TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

     
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center mb-4">
              Edit Client Data
            </Typography>
            <div className="row">
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, name: e.target.value })} 
                  value={editClientData.name} 
                  className='w-100' 
                  id="name" 
                  label="Name" 
                  variant="standard" 
                />
              </div>
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, age: e.target.value })} 
                  value={editClientData.age} 
                  className='w-100' 
                  id="age" 
                  label="Age" 
                  variant="standard" 
                  type="number"
                />
              </div>
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, plan: e.target.value })} 
                  value={editClientData.plan} 
                  className='w-100' 
                  id="plan" 
                  label="Plan" 
                  variant="standard" 
                />
              </div>
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, address: e.target.value })} 
                  value={editClientData.address} 
                  className='w-100' 
                  id="address" 
                  label="Address" 
                  variant="standard" 
                />
              </div>
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, doj: e.target.value })} 
                  value={editClientData.doj} 
                  className='w-100' 
                  id="doj" 
                  label="Date of Joining" 
                  variant="standard" 
                />
              </div>
              <div className="col-6 mb-3">
                <TextField 
                  onChange={(e) => setEditClientData({ ...editClientData, exp: e.target.value })} 
                  value={editClientData.exp} 
                  className='w-100' 
                  id="exp" 
                  label="Expiry Date" 
                  variant="standard" 
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <Button 
                onClick={handleSaveClick} 
                variant="contained" 
                color="primary" 
                startIcon={<MdSave />}
                className="me-3"
              >
                Save Changes
              </Button>
              <Button 
                onClick={handleClose} 
                variant="outlined" 
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default History;