import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";

const RejectedVerification = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/users/verification/rejected"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const approveUser = async (userId) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        // Proceed with the API request if confirmed
        await axios.post(`http://localhost:4000/api/admin/verify`, {
          userId: userId,
          action: "approve", // approve or reject
        });

        Swal.fire({
          title: "Success!",
          text: "User approved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Refresh the list of users
        const response = await axios.get(
          "http://localhost:4000/api/admin/users/verification/rejected"
        );
        setUsers(response.data.users);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to approve user.",
        icon: "error",
        confirmButtonText: "OK",
      });

      console.error("Failed to approve user", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No.</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleClickOpen(user)}
                    >
                      View Documents
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => approveUser(user._id)}
                      style={{ marginLeft: 8 }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          Documents
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h4>ID Proof</h4>
                <img
                  src={`http://localhost:4000/documents/${selectedUser.verificationDocs.idProof
                    .split("\\")
                    .pop()}`}
                  alt="ID Proof"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <h4>Authorization Letter</h4>
                <img
                  src={`http://localhost:4000/documents/${selectedUser.verificationDocs.authorizationLetter
                    .split("\\")
                    .pop()}`}
                  alt="Authorization Letter"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default RejectedVerification;
