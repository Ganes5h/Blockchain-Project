import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "sonner";
import logo from "../../Images/Logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = React.useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please complete the CAPTCHA");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        formData
      );
      if (response.status === 200) {
        toast.success("Login Successful");
        navigate("/");
        // Handle redirection to appropriate page based on user type
      }
    } catch (error) {
      toast.error(
        `Login failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(34 102 153)",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Box
          width="100%"
          height="50px"
          borderRadius="50px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding="10px"
        >
          <Link to="/register">
            <Button variant="contained" sx={{ borderRadius: "50px" }}>
              Register
            </Button>
          </Link>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} width={70} alt="logo" />
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              paddingLeft: "40px",
              fontFamily: "Dancing Script",
              fontOpticalSizing: "auto",
            }}
          >
            GovPramaan
          </h1>
        </div>
        <form
          style={{
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
            background: "transparent",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 10px rgba(0 , 0,0 , 0.2)",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            placeholder="Enter your Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ color: "black", marginRight: "10px" }} />
              ),
              sx: { borderRadius: "20px", backgroundColor: "white" },
            }}
          />
          <TextField
            name="password"
            placeholder="Enter your Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <LockIcon sx={{ color: "black", marginRight: "10px" }} />
              ),
              sx: { borderRadius: "20px", backgroundColor: "white" },
            }}
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <RadioGroup
              name="user_type"
              value={formData.user_type}
              onChange={handleInputChange}
              row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                value="government"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Government</Typography>
                }
              />
              <FormControlLabel
                value="student"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Students</Typography>
                }
              />
              <FormControlLabel
                value="industry"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Industry</Typography>
                }
              />
              <FormControlLabel
                value="institute"
                control={<Radio style={{ color: "white" }} />}
                label={
                  <Typography style={{ color: "white" }}>Institute</Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <p
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
              fontSize: "12px",
              padding: "10px",
            }}
          >
            By signing in to GovPramaan, you agree to our Terms and Privacy
            Policy.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LedhYQpAAAAAPjssU5QXcYcacOWUWgN36HAW4iy"
              onChange={handleRecaptchaChange}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, height: "50px", borderRadius: "20px" }}
          >
            Login
          </Button>
          <div style={{ marginTop: "40px" }}>
            <p
              style={{
                color: "white",
                alignItems: "center",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              This site is protected by reCAPTCHA Enterprise and the Google
              Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
