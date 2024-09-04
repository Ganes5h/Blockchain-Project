// components/PendingVerification.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from "@mui/icons-material";
import { toast } from "sonner"; // Assuming you are using Sonner for notifications

const PendingVerification = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/users/verification/pending"
        );
        setUsers(response.data.users);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      await axios.post("http://localhost:4000/api/admin/verify", {
        userId,
        action,
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success(`User ${action}ed successfully`);
    } catch (error) {
      toast.error("Failed to perform action");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.organization}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleAction(user._id, "approve")}>
                  <ApproveIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleAction(user._id, "reject")}>
                  <RejectIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingVerification;
