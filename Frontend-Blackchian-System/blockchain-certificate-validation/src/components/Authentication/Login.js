// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/authSlice";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   IconButton,
//   InputAdornment,
//   Link,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(formData)).then((result) => {
//       if (result.type === "auth/login/fulfilled") {
//         toast.success("Login successful!");
//         navigate("/");
//       } else if (result.type === "auth/login/rejected") {
//         toast.error("Login failed. Please try again.");
//       }
//     });
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             value={formData.password}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={isLoading}
//           >
//             Login
//           </Button>
//           {error && (
//             <Typography color="error" align="center">
//               {error}
//             </Typography>
//           )}
//           <Box textAlign="center">
//             <Link href="/signup" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmailForOtp(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((result) => {
      if (result.type === "auth/login/fulfilled") {
        toast.success("Login successful!");
        navigate("/");
      } else if (result.type === "auth/login/rejected") {
        toast.error("Login failed. Please try again.");
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleForgotPasswordClick = () => {
    setOpenForgotPasswordModal(true);
  };

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:4000/api/users/forgotPassword", {
        email: emailForOtp,
      });
      setOtpSent(true);
      startOtpCountdown(120); // Start 2-minute countdown
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:4000/api/users/resetPassword", {
        otp,
        newPassword,
      });
      toast.success("Password reset successfully!");
      setOpenForgotPasswordModal(false);
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const startOtpCountdown = (duration) => {
    setOtpCountdown(duration);
    const countdownInterval = setInterval(() => {
      setOtpCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!openForgotPasswordModal) {
      setOtp("");
      setNewPassword("");
      setOtpSent(false);
      setOtpCountdown(0);
    }
  }, [openForgotPasswordModal]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Box textAlign="center">
            <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
              {"Forgot password?"}
            </Link>
          </Box>
          <Box textAlign="center">
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>

      <Modal
        open={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
        aria-labelledby="forgot-password-modal"
        aria-describedby="forgot-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="forgot-password-modal" variant="h6" component="h2">
            Reset Your Password
          </Typography>
          {!otpSent ? (
            <>
              <TextField
                margin="normal"
                fullWidth
                id="emailForOtp"
                label="Email Address"
                value={emailForOtp}
                onChange={handleEmailChange}
              />
              <Button
                onClick={handleSendOtp}
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!emailForOtp}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                fullWidth
                id="otp"
                label={`OTP (${otpCountdown}s)`}
                value={otp}
                onChange={handleOtpChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleSendOtp}
                        disabled={otpCountdown > 0}
                      >
                        {otpCountdown > 0 ? `${otpCountdown}s` : "Resend OTP"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <Button
                onClick={handleResetPassword}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!otp || !newPassword || otpCountdown === 0}
              >
                Change Password
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;
