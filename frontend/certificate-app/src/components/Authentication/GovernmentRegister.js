import React, { useState } from "react";
import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function NgoRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "government", // Default value set here
    name: "",
    address: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (photo) {
      data.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Registration Successful");
        navigate("/login"); // Navigate to the login page after successful registration
      }
    } catch (error) {
      toast.error(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <>
      <div>
        <Box display="flex" justifyContent="flex-end">
          <Box
            width="100%"
            height="50px"
            display="flex"
            alignItems="center"
            justifyContent="end"
            padding="10px"
            position="absolute"
            zIndex={100}
            top="10px"
            left="0"
          >
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  marginTop: "15px",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <HomeIcon />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  marginTop: "15px",
                  marginLeft: "8px",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </div>

      <section>
        <form
          style={{
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography style={{ color: "white" }}>
            Government Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                placeholder="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <PersonIcon />,
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                placeholder="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <EmailIcon />,
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <LockIcon />,
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                placeholder="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <LocationOnIcon />,
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                placeholder="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <PhoneIcon />,
                  sx: { borderRadius: "20px", backgroundColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <lable style={{ color: "white", padding: "10px" }}>
                Choose Profile Picture
              </lable>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, height: "50px", borderRadius: "20px" }}
          >
            Register
          </Button>
        </form>
      </section>
    </>
  );
}

export default NgoRegister;
