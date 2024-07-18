// import React from "react";
// import "./NewLogin.css";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import {
//   FormControl,
//   Radio,
//   RadioGroup,
//   Box,
//   Typography,
//   Button,
//   FormControlLabel,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useRef, useState, useEffect } from "react";
// import HomeIcon from "@mui/icons-material/Home";
// const LoginForm = () => {
//   const [isVerified, setIsVerified] = useState(false);
//   const recaptchaRef = React.useRef();
//   const navigate = useNavigate();
//   const handleRecaptchaChange = (value) => {
//     if (value) {
//       setIsVerified(true);
//     }
//   };
//   return (
//     <>
//       <div>
//         <Box display="flex" justifyContent="flex-end">
//           <Box
//             width="100%"
//             height="50px"
//             //   border="1px solid red"
//             // borderRadius="50px"
//             display="flex"
//             alignItems="center"
//             justifyContent="end"
//             padding="10px"
//             position="absolute"
//             zIndex={100}
//             top="10px"
//             left="0"
//           >
//             {/* Rounded Button using MUI */}
//             <Link to="/landing">
//               <Button
//                 variant="contained"
//                 //   color="success"
//                 sx={{
//                   borderRadius: "50px",
//                   // marginRight: "80px",
//                   marginTop: "15px",
//                   backgroundColor: "white",
//                   color: "black",
//                   borderRadius: "40px",
//                   "&:hover": {
//                     color: "white", // Change text color to white on hover
//                   },
//                 }}
//               >
//                 <HomeIcon />
//               </Button>
//             </Link>
//             <Link to="/register">
//               <Button
//                 variant="contained"
//                 //   color="success"
//                 sx={{
//                   borderRadius: "50px",
//                   marginTop: "15px",
//                   marginLeft: "8px",
//                   backgroundColor: "white",
//                   color: "black",
//                   borderRadius: "40px",
//                   "&:hover": {
//                     color: "white", // Change text color to white on hover
//                   },
//                 }}
//               >
//                 Register
//               </Button>
//             </Link>
//           </Box>
//         </Box>
//       </div>

//       <section>
//         <div className="login-box" style={{ width: "600px", padding: "20px" }}>
//           <form>
//             <h2>Login</h2>
//             <div className="input-box">
//               <span className="icon">
//                 <EmailIcon style={{ color: "#fff" }} />
//               </span>
//               <input type="email" required />
//               <label>Email</label>
//             </div>
//             <div className="input-box">
//               <span className="icon">
//                 <LockIcon style={{ color: "#fff" }} />
//               </span>
//               <input type="password" required />
//               <label>Password</label>
//             </div>
//             {/* <div className="remember-forget">
//             <label>
//               <input type="checkbox" />
//               Remember Me
//             </label>
//             <a href="#">Forget Password</a>
//           </div> */}
//             <FormControl component="fieldset" margin="normal" fullWidth>
//               <RadioGroup
//                 name="user_type"
//                 // value={formData.user_type}
//                 // onChange={handleInputChange}
//                 row
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FormControlLabel
//                   value="government"
//                   control={<Radio style={{ color: "white" }} />}
//                   label={
//                     <Typography style={{ color: "white" }}>
//                       Government
//                     </Typography>
//                   }
//                 />
//                 <FormControlLabel
//                   value="student"
//                   control={<Radio style={{ color: "white" }} />}
//                   label={
//                     <Typography style={{ color: "white" }}>Students</Typography>
//                   }
//                 />
//                 <FormControlLabel
//                   value="industry"
//                   control={<Radio style={{ color: "white" }} />}
//                   label={
//                     <Typography style={{ color: "white" }}>Industry</Typography>
//                   }
//                 />
//                 <FormControlLabel
//                   value="institute"
//                   control={<Radio style={{ color: "white" }} />}
//                   label={
//                     <Typography style={{ color: "white" }}>
//                       Institute
//                     </Typography>
//                   }
//                 />
//               </RadioGroup>
//             </FormControl>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ReCAPTCHA
//                 ref={recaptchaRef}
//                 sitekey="6LedhYQpAAAAAPjssU5QXcYcacOWUWgN36HAW4iy"
//                 onChange={handleRecaptchaChange}
//               />
//             </div>
//             <button type="submit" style={{ marginTop: "10px" }}>
//               Login
//             </button>

//             <div className="register-link">
//               <p>
//                 Don't have an account? <a href="#">Register</a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LoginForm;


import React, { useState, useRef } from "react";
import "./NewLogin.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
  FormControl,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Button,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const recaptchaRef = useRef();
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isVerified) {
      toast.error("Please verify that you are a human.");
      return;
    }

    const loginData = {
      email: email,
      password: password,
      user_type: userType,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        loginData
      );
      if (response.status === 200) {
        // Handle successful login
        console.log("Login successful:", response.data);
        const { message, user_id } = response.data;
        toast.success(message);

        // Save user data in localStorage
        const userData = {
          email: email,
          user_type: userType,
          user_id: user_id
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Navigate to appropriate page based on user type
        switch (userType) {
          case 'student':
            navigate('/student');
            break;
          case 'institute':
            navigate('/institute_dashboard');
            break;
          case 'industry':
            navigate('/industry_dashboard');
            break;
          default:
            // Default action
            break;
        }
      } else {
        // Handle error response
        console.error("Login failed:", response.data);
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again later.");
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
            <Link to="/register">
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
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </div>

      <section>
        <div className="login-box" style={{ width: "600px", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-box">
              <span className="icon">
                <EmailIcon style={{ color: "#fff" }} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <LockIcon style={{ color: "#fff" }} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <label>Password</label>
            </div>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <RadioGroup
                name="user_type"
                value={userType}
                onChange={handleUserTypeChange}
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
                    <Typography style={{ color: "white" }}>
                      Government
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="student"
                  control={<Radio style={{ color: "white" }} />}
                  label={
                    <Typography style={{ color: "white" }}>Student</Typography>
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
                    <Typography style={{ color: "white" }}>
                      Institute
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
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
            <button type="submit" style={{ marginTop: "10px" }}>
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginForm;

