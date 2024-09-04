// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../store/authSlice";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   IconButton,
//   InputAdornment,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//     fullName: "",
//     organization: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signUp(formData)).then((result) => {
//       if (!result.error) {
//         toast.success("Sign Up successful!");
//         navigate("/");
//       } else {
//         toast.error(result.error.message);
//       }
//     });
//   };

//   return (
//     <Container component="main" maxWidth="md">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
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
//             autoComplete="new-password"
//             value={formData.password}
//             onChange={handleChange}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <FormLabel component="legend" sx={{ mt: 2 }}>
//             Role
//           </FormLabel>
//           <RadioGroup
//             row
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <FormControlLabel
//               value="government"
//               control={<Radio />}
//               label="Government"
//             />
//             <FormControlLabel
//               value="student"
//               control={<Radio />}
//               label="Student"
//             />
//             <FormControlLabel
//               value="industry"
//               control={<Radio />}
//               label="Industry"
//             />
//             <FormControlLabel
//               value="institute"
//               control={<Radio />}
//               label="Institute"
//             />
//           </RadioGroup>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="fullName"
//             label="Full Name"
//             name="fullName"
//             autoComplete="name"
//             value={formData.fullName}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             id="organization"
//             label="Organization"
//             name="organization"
//             value={formData.organization}
//             onChange={handleChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={isLoading}
//           >
//             Sign Up
//           </Button>
//           {error && (
//             <Typography color="error" align="center">
//               {error}
//             </Typography>
//           )}
//         </Box>
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Already have an account?{" "}
//           <Button
//             onClick={() => navigate("/login")}
//             variant="text"
//             sx={{ textTransform: "none" }}
//           >
//             Login
//           </Button>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { toast } from "sonner";
import {
  Visibility,
  VisibilityOff,
  UploadFile,
  AccountCircle,
  Business,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    fullName: "",
    organization: "",
    idProof: null,
    authorizationLetter: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to handle the form data, including file uploads
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    fetch("http://localhost:4000/api/users/register/request", {
      method: "POST",
      body: formDataToSubmit,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registration request submitted successfully") {
          toast.success("Registration request submitted successfully");
        } else {
          toast.error("Registration Failed");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Role
          </FormLabel>
          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{ mb: 2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              value="government"
              control={<Radio />}
              label="Government"
            />
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="industry"
              control={<Radio />}
              label="Industry"
            />
            <FormControlLabel
              value="institute"
              control={<Radio />}
              label="Institute"
            />
          </RadioGroup>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="organization"
            label="Organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            {/* <Button
              variant="contained"
              component="label"
              fullWidth
              startIcon={<UploadFile />}
              sx={{ mb: 2 }}
            >
              Upload ID Proof
              <input
                type="file"
                hidden
                name="idProof"
                onChange={handleChange}
              />
            </Button> */}

            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="multiple_files"
            >
              Upload ID Proof
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none   dark:placeholder-gray-400"
              // id="multiple_files"
              type="file"
              // multiple
              name="idProof"
              onChange={handleChange}
            />

            <label
              className="block mb-2 mt-4 text-sm font-medium text-gray-900"
              htmlFor="multiple_files"
            >
              Upload Authorization Letter
            </label>
            <input
              className="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer   focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400"
              // id="multiple_files"
              type="file"
              // multiple
              name="authorizationLetter"
              onChange={handleChange}
            />
            {/* <Button
              variant="contained"
              component="label"
              fullWidth
              startIcon={<UploadFile />}
            >
              Upload Authorization Letter
              <input
                type="file"
                hidden
                name="authorizationLetter"
                onChange={handleChange}
              />
            </Button> */}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
