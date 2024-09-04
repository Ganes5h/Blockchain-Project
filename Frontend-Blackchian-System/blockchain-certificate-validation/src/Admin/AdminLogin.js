import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/secure/certify/admin/status"); // Navigate to the status options
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        mt={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
      <Toaster position="top-right" />
    </Container>
  );
};

export default Login;
